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

    @Get('/category/children/:id')
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

    @Get('/category')
    @OpenAPI({summary: 'returns categories of that level'})
    async getCategoryTree(){
        const categoryData = await this.categoryService.findCategoryTree();
        var root = 1;
        var r = [], o = {};
        categoryData.forEach(function (b) {
            const a = { _id:b._id, name:b.name,parent_id: b.parent_id, level:b.level, children: []}
            if (o[a._id] && o[a._id].children) {
                a.children = o[a._id] && o[a._id].children;
            }
            o[a._id] = a;
            if (a.level === root) {
                r.push(a);
            } else {
                o[a.parent_id] = o[a.parent_id] || {};
                o[a.parent_id].children = o[a.parent_id].children || [];
                o[a.parent_id].children.push(a);
            }
        });
        console.log(r);
        return { data: r, message: 'findCategory' };
    }

    
}