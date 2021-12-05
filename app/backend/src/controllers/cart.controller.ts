import { CartItem } from '../interfaces/cartItem.interface';
import { CartItemService } from '../services/cartItem.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { ConcludePurchaseDto, CreateCartItemDto, UpdateCartItemDto } from '../dtos/cartItem.dto';

@Controller('/cart')
export class CartController {
  public cartItemService = new CartItemService();

  @Get('/')
  @OpenAPI({ summary: 'returns the users cart items' })
  async getCart() {
    const userId = '123456';
    const item: CartItem[] = await this.cartItemService.getClientCartItems(userId);
    return { data: item, message: 'Cart items retrived' };
  }

  @Post('/lock')
  @OpenAPI({ summary: 'fazer lock cart items' })
  async lockCart() {
    const userId = '123456';
    await this.cartItemService.lockClientItems(userId);

    return { message: 'Items locked' };
  }

  @Post('/buy')
  @UseBefore(validationMiddleware(ConcludePurchaseDto, 'body'))
  async purchase(@Body() data: ConcludePurchaseDto) {
    const userId = '123456';
    const addressId = data.address_id;
    await this.cartItemService.concludePurchase(userId, addressId);
    return { message: 'Items purchsed' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'returns information on the cart item' })
  async getCartItem(@Param('id') cartItemId: string) {
    const userId = '123456';
    const item: CartItem = await this.cartItemService.getCartItem(userId, cartItemId);
    return { data: item, message: 'Cart item retrived' };
  }

  @Post('/')
  @UseBefore(validationMiddleware(CreateCartItemDto, 'body'))
  @OpenAPI({ summary: 'create cart item' })
  async createCartItem(@Body() itemData: CreateCartItemDto) {
    console.log(itemData);
    const userId = '123456';
    const item: CartItem = await this.cartItemService.addItem(itemData, userId);
    return { data: item, message: 'Item added to cart' };
  }

  @Put('/:id')
  @UseBefore(validationMiddleware(UpdateCartItemDto, 'body'))
  @OpenAPI({ summary: 'update cart item' })
  async updateCartItem(@Param('id') cartItemId: string, @Body() itemData: UpdateCartItemDto) {
    const userId = '123456';
    const item: CartItem = await this.cartItemService.updateItem(itemData, userId, cartItemId);
    return { data: item, message: 'Item added to cart' };
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'delete cart item' })
  async deleteCartItem(@Param('id') cartItemId: string) {
    const userId = '123456';
    const item: CartItem = await this.cartItemService.deleteCartItem(userId, cartItemId);
    return { data: item, message: 'Item deleted' };
  }
}
