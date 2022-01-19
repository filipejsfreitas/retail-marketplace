import { CartItem } from '../interfaces/cartItem.interface';
import { CartItemService } from '../services/cartItem.service';
import { Authorized, Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { ConcludePurchaseDto, CreateCartItemDto, UpdateCartItemDto } from '../dtos/cartItem.dto';
import { RequestWithUser } from 'interfaces/auth.interface';

@Controller('/cart')
export class CartController {
  public cartItemService = new CartItemService();

  @Get('/')
  @Authorized('Client')
  @OpenAPI({ summary: 'returns the users cart items' })
  async getCart(@Req() req: RequestWithUser) {
    const userId = req.token._id;
    const item: CartItem[] = await this.cartItemService.getClientCartItems(userId);
    return { data: item, message: 'Cart items retrived' };
  }

  @Post('/lock')
  @Authorized('Client')
  @OpenAPI({ summary: 'fazer lock cart items' })
  async lockCart(@Req() req: RequestWithUser) {
    const userId = req.token._id;
    await this.cartItemService.lockClientItems(userId);

    return { message: 'Items locked' };
  }

  @Post('/unlock')
  @OpenAPI({ summary: 'fazer lock cart items' })
  async unlockCart() {
    const userId = '123456';
    await this.cartItemService.unlockItems(userId);

    return { message: 'Items locked' };
  }

  @Post('/buy')
  @Authorized('Client')
  @UseBefore(validationMiddleware(ConcludePurchaseDto, 'body'))
  async purchase(@Body() data: ConcludePurchaseDto,@Req() req: RequestWithUser) {
    const userId = req.token._id;
    const addressId = data.address_id;
    await this.cartItemService.concludePurchase(userId, addressId);
    return { message: 'Items purchsed' };
  }

  @Get('/:id')
  @Authorized('Client')
  @OpenAPI({ summary: 'returns information on the cart item' })
  async getCartItem(@Param('id') cartItemId: string,@Req() req: RequestWithUser) {
    const userId = req.token._id;
    const item: CartItem = await this.cartItemService.getCartItem(userId, cartItemId);
    return { data: item, message: 'Cart item retrived' };
  }

  @Post('/')
  @Authorized('Client')
  @UseBefore(validationMiddleware(CreateCartItemDto, 'body'))
  @OpenAPI({ summary: 'create cart item' })
  async createCartItem(@Body() itemData: CreateCartItemDto,@Req() req: RequestWithUser) {
    console.log(itemData);
    const userId = req.token._id;
    const item: CartItem = await this.cartItemService.addItem(itemData, userId);
    return { data: item, message: 'Item added to cart' };
  }

  @Put('/:id')
  @Authorized('Client')
  @UseBefore(validationMiddleware(UpdateCartItemDto, 'body'))
  @OpenAPI({ summary: 'update cart item' })
  async updateCartItem(@Param('id') cartItemId: string, @Body() itemData: UpdateCartItemDto,@Req() req: RequestWithUser) {
    const userId = req.token._id;
    const item: CartItem = await this.cartItemService.updateItem(itemData, userId, cartItemId);
    return { data: item, message: 'Item added to cart' };
  }

  @Delete('/:id')
  @Authorized('Client')
  @OpenAPI({ summary: 'delete cart item' })
  async deleteCartItem(@Param('id') cartItemId: string,@Req() req: RequestWithUser) {
    const userId = req.token._id;
    const item: CartItem = await this.cartItemService.deleteCartItem(userId, cartItemId);
    return { data: item, message: 'Item deleted' };
  }
}
