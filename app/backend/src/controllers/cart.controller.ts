import { CartItem } from "@/interfaces/cartItem.interface";
import { CartItemService } from "@/services/cartItem.service";
import { Controller, Get , JsonController, Param, Post, UseBefore,Body, Put, Delete} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreateCartItemDto, UpdateCartItemDto } from "@/dtos/cartItem.dto";

@Controller('/cart')
export class CartController{
    public cartItemService = new CartItemService();

    @Get('/')
    @OpenAPI({summary: 'returns the users cart items'})
    async getCart() {
        const userId = "123456";
        const item: CartItem [] = await this.cartItemService.getClientCartItems(userId);
        return { data: item, message: 'Cart items retrived' };
    }

    @Get('/:id')
    @OpenAPI({summary: 'returns information on the cart item'})
    async getCartItem(@Param('id') cartItemId: string) {
        const userId = "123456";
        const item: CartItem = await this.cartItemService.getCartItem(userId, cartItemId);
        return { data: item, message: 'Cart item retrived' };
    }

    @Post('/')
    @UseBefore(validationMiddleware(CreateCartItemDto, 'body'))
    @OpenAPI({summary: 'create cart item'})
    async createCartItem(@Body() itemData: CreateCartItemDto) {
        const userId = "123456";
        const item : CartItem = await this.cartItemService.addItem(itemData, userId);
        return {data: item, message: 'Item added to cart'}
    }


    @Put('/:id')
    @UseBefore(validationMiddleware(UpdateCartItemDto, 'body'))
    @OpenAPI({summary: 'update cart item'})
    async updateCartItem(@Param('id') cartItemId: string,@Body() itemData: UpdateCartItemDto) {
        const userId = "123456";
        const item : CartItem = await this.cartItemService.updateItem(itemData, userId,cartItemId);
        return {data: item, message: 'Item added to cart'}
    }

    @Delete('/:id')
    @OpenAPI({summary: 'delete cart item'})
    async deleteCartItem(@Param('id') cartItemId: string) {
        const userId = "123456";
        const item : CartItem = await this.cartItemService.deleteCartItem( userId,cartItemId);
        return {data: item, message: 'Item deleted'}
    }


}