import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaypalService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private isSimulated: boolean;

  constructor(private configService: ConfigService) {
    this.clientId     = this.configService.get<string>('PAYPAL_CLIENT_ID') ?? '';
    this.clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET') ?? '';
    this.baseUrl      = 'https://api-m.sandbox.paypal.com';

    this.isSimulated =
      !this.clientId ||
      this.clientId === 'SIMULATED' ||
      this.clientId === 'PAYPAL_SANDBOX_CLIENT_ID';

    console.log('🔶 PayPal isSimulated:', this.isSimulated);
  }

  private async getAccessToken(): Promise<string> {
    const credentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64');

    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type':  'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json() as { access_token: string };
    return data.access_token;
  }

  async createOrder(amount: number, currency: string, orderId: string) {
    // ── Mode simulé ── en premier avant tout appel réseau
    if (this.isSimulated) {
      console.log('🔶 PayPal createOrder simulé');
      return {
        orderId:     `SIMULATED_PAYPAL_${Date.now()}`,
        approvalUrl: null,
        simulated:   true,
        message:     'PayPal Sandbox non configuré — intégration prévue en V2',
      };
    }

    // ── Mode réel ──
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: orderId,
            amount: {
              currency_code: currency.toUpperCase(),
              value:         amount.toFixed(2),
            },
            description: `Commande FFLDA #${orderId}`,
          },
        ],
        application_context: {
          brand_name:  'FFLDA',
          landing_page: 'BILLING',
          user_action:  'PAY_NOW',
          return_url:  'http://localhost:60888/#/payment-success',
          cancel_url:  'http://localhost:60888/#/payment-cancel',
        },
      }),
    });

    const data = await response.json() as {
      id: string;
      links: { href: string; rel: string }[];
    };

    const approvalUrl = data.links?.find(
      (link) => link.rel === 'approve'
    )?.href;

    return {
      orderId:     data.id,
      approvalUrl,
      simulated:   false,
    };
  }

  async captureOrder(paypalOrderId: string, internalOrderId?: string) {
    // ── Mode simulé ──
    if (this.isSimulated || paypalOrderId.startsWith('SIMULATED_')) {
      return {
        paypalOrderId,
        status:    'COMPLETED',
        captureId: `SIMULATED_CAPTURE_${Date.now()}`,
        internalOrderId,
        simulated: true,
      };
    }

    // ── Mode réel ──
    const accessToken = await this.getAccessToken();

    const response = await fetch(
      `${this.baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type':  'application/json',
        },
      }
    );

    const data = await response.json() as {
      id: string;
      status: string;
      purchase_units: {
        reference_id?: string;
        payments: {
          captures: { id: string; status: string }[];
        };
      }[];
    };

    return {
      paypalOrderId:    data.id,
      status:           data.status,
      captureId:        data.purchase_units[0]?.payments?.captures[0]?.id,
      internalOrderId:  data.purchase_units[0]?.reference_id,
      simulated:        false,
    };
  }
}