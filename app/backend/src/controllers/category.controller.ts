import { CreateCategoryDto } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';
import { Body, Delete, Get, JsonController, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '../middlewares/express/validation.middleware';

@JsonController('/category')
export class CategoryController {
  public categoryService = new CategoryService();

  @Get('/:id/children')
  @OpenAPI({ summary: 'returns information on the category below' })
  async getCategoryChildren(@Param('id') categoryId: string) {
    const categoryData = await this.categoryService.findCategoryChildrenById(categoryId);
    return { data: categoryData, message: 'findChildren' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'returns information on the category' })
  async getCategory(@Param('id') id: string) {
    const categoryData = await this.categoryService.findCategoryById(id);
    return { data: categoryData, message: 'findOne' };
  }

  @Get('/level/:level')
  @OpenAPI({ summary: 'returns categories of that level' })
  async getCategoryByLevel(@Param('level') level: number) {
    const categoryData = await this.categoryService.findCategoriesInLevel(level);
    console.log(categoryData);
    return { data: categoryData, message: 'findCategory' };
  }

  @Get('/above/:id')
  @OpenAPI({summary: 'get all category ancestors'})
  async getAbove(@Param('id') id: string){
    const categoryData = await this.categoryService.findUppers(id);
    return { data: categoryData, message: 'find ancestors' };
  }

  @Get('/')
  @OpenAPI({ summary: 'returns categories of that level' })
  async getCategoryTree() {
    const categoryData = await this.categoryService.findCategoryTree();
    const root = 0;
    const r = [],
      o = {};
    categoryData.forEach(function (b) {
      const a = { _id: b._id, name: b.name, parent_id: b.parent_id, level: b.level, children: [] };
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

  

  @Post('/')
  @UseBefore(validationMiddleware(CreateCategoryDto, 'body'))
  @OpenAPI({ summary: 'create category' })
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    const category = await this.categoryService.createCategory(categoryData);
    return { data: category, message: 'Category created' };
  }

  @Put('/:id')
  @UseBefore(validationMiddleware(CreateCategoryDto, 'body'))
  @OpenAPI({ summary: 'update category' })
  async updateCategory(@Param('id') catId: string, @Body() categoryData: CreateCategoryDto) {
    const category = await this.categoryService.updateCategory(catId, categoryData);
    return { data: category, message: 'Category updated' };
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'delete category and all its children' })
  async deleteCategory(@Param('id') catId: string) {
    const category = await this.categoryService.deleteCategory(catId);
    return { data: category, message: 'Category deleted' };
  }
}
