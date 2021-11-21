import { Category } from '@interfaces/category.interface';
import { CategoryModel } from '@models/category.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

export class CategoryService {
    public category = CategoryModel;

    public async findCategoryById(categoryId: string): Promise<Category> {
        if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");
    
        const findCategory: Category = await this.category.findOne({ _id: categoryId });
        if (!findCategory) throw new HttpException(409, "You're not category");
    
        return findCategory;
      }

    public async findCategoryChildrenById(categoryId: string): Promise<Category []> {
        if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");
    
        const findChildren: Category []= await this.category.find({ parent_id: categoryId });
        if (!findChildren) throw new HttpException(409, "You're not category");

        return findChildren;
      }

    public async findCategorybyLevel(level: number): Promise<Category []> {
        if (isEmpty(level)) throw new HttpException(400, "You're not level");
    
        const findCategory: Category []= await this.category.find({ level: level });
        if (!findCategory) throw new HttpException(409, "You're not level");

        return findCategory;
    }
/*/
    public async findCategoryTree(): Promise<Category []> {
        const findCategory: Category []= await this.category.find();
        if (!findCategory) throw new HttpException(409, "No categories found");


        return findCategory;
    }/*/
}