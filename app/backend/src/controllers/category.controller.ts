import { CategoryService } from "@/services/category.service";
import { Controller, Get , Param} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

@Controller()
export class CategoryController {
    public categoryService = new CategoryService();

    @Get('/category/:id')
    @OpenAPI({summary:'returns information on the category' })
    async getCategory(@Param('id') id: string){
        const categoryData = await this.categoryService.findCategoryById(id);
        return { data: categoryData, message: 'findOne' };
    }

    @Get('/category/:id/children')
    @OpenAPI({summary: 'returns information on the category below'})
    async getCategoryChildren(@Param('id') categoryId: string){
        const categoryData = await this.categoryService.findCategoryChildrenById(categoryId);
        return { data: categoryData, message: 'findChildren' };
    }

    @Get('/category/level/:level')
    @OpenAPI({summary: 'returns categories of that level'})
    async getCategorybyLevel(@Param('level') level: number){
        const categoryData = await this.categoryService.findCategorybyLevel(level);
        console.log(categoryData);
        return { data: categoryData, message: 'findCategory' };
    }

    
}