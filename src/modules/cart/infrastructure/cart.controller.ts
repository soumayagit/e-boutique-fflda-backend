import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, Request,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage }     from 'multer';
import { extname }         from 'path';
import {
  ApiTags, ApiOperation, ApiBearerAuth,
  ApiConsumes, ApiBody,
} from '@nestjs/swagger';
import { CartService }         from '../application/use-cases/cart.service';
import { AddCartItemDto, UpdateCartItemDto } from '../application/dto/cart.dto';
import { JwtAuthGuard }        from '../../auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère le panier' })
  getCart(@Request() req: any) {
    return this.cartService.getOrCreateCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Ajoute un article au panier' })
  addItem(@Request() req: any, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(req.user.id, dto);
  }

  // ── US338 : upload plan tapis ─────────────────────────────────
  @Post('items/upload-plan')
  @ApiOperation({ summary: 'Upload plan tapis + ajout au panier' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({                              // ← ajout
    schema: {
      type: 'object',
      required: ['productId', 'quantity', 'epaisseur', 'file'],
      properties: {
        productId: {
          type:        'string',
          example:     'uuid-du-produit-tapis',
          description: 'ID du produit tapis',
        },
        quantity: {
          type:        'integer',
          example:     1,
          description: 'Quantité',
        },
        epaisseur: {
          type:        'number',
          example:     4,
          description: 'Épaisseur en cm (toujours obligatoire)',
        },
        file: {
          type:        'string',
          format:      'binary',
          description: 'Plan de la salle (PDF, PNG, JPEG ou JPG)',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/plans',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `plan-${unique}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
      const ext = extname(file.originalname).toLowerCase();
      if (!allowed.includes(ext)) {
        return cb(
          new Error('Format non autorisé. PDF, PNG, JPEG ou JPG uniquement.'),
          false,
        );
      }
      cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  async addItemWithPlan(
    @Request()      req:  any,
    @UploadedFile() file: Express.Multer.File,
    @Body()         body: any,
  ) {
    if (!file) throw new Error('Fichier manquant ou vide');

    const dto: AddCartItemDto = {
      productId:   body.productId,
      quantity:    parseInt(body.quantity) || 1,
      epaisseur:   body.epaisseur ? parseFloat(body.epaisseur) : undefined,
      planFileUrl: `/uploads/plans/${file.filename}`,
    };

    return this.cartService.addItem(req.user.id, dto);
  }

  @Put('items/:id')
  @ApiOperation({ summary: 'Modifie la quantité d\'un article' })
  updateItem(
    @Request()   req: any,
    @Param('id') id:  string,
    @Body()      dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(req.user.id, id, dto);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Supprime un article du panier' })
  removeItem(@Request() req: any, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.id, id);
  }

  @Delete()
  @ApiOperation({ summary: 'Vide le panier' })
  clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}