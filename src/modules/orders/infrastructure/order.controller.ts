import {
  Controller, Get, Post, Put,
  Param, Body, UseGuards, Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '../application/use-cases/order.service';
import { CreateOrderDto } from '../application/dto/order.dto';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande depuis le panier' })
  createOrder(@Request() req: any, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste mes commandes' })
  getUserOrders(@Request() req: any) {
    return this.orderService.getUserOrders(req.user.id);
  }

  @Get('admin/all')
  @ApiOperation({ summary: 'Admin — toutes les commandes' })
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une commande' })
  getOrderById(@Request() req: any, @Param('id') id: string) {
    return this.orderService.getOrderById(req.user.id, id);
  }

  @Put('admin/:id/status')
  @ApiOperation({ summary: 'Admin — modifier le statut' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatus(id, status);
  }

  // ── Admin : valide et chiffre une commande sur-mesure (tapis) ──
  @Put('admin/:id/validate')
  @ApiOperation({ summary: 'Admin — valide et chiffre une commande sur-mesure' })
  validateOrder(
    @Request()   req:  any,
    @Param('id') id:   string,
    @Body()      body: { total?: number },
  ) {
    return this.orderService.validateOrder(id, req.user.id, body.total);
  }
}