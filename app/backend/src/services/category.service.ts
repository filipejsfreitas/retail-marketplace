import { Category, CategoryTree } from '@interfaces/category.interface';
import { CategoryModel } from '@models/category.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateCategoryDto } from '@dtos/category.dto';
import { isString } from 'class-validator';

export class CategoryService {
    public categories = CategoryModel;

    public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
        if (isEmpty(categoryData)) throw new HttpException(400, "You're not category");

        const findCategory: Category = await this.categories.findOne({ name: categoryData.name });
        if (findCategory) throw new HttpException(409, `You're category ${categoryData.name} already exists`);

        if(categoryData.parent_id != null){
            const findParent: Category = await this.categories.findOne({ parent_id: categoryData.parent_id });
            if (!findParent) throw new HttpException(409, `You're category parent does not exists`);
        }

        const createCategoryData: Category = await this.categories.create({ ...categoryData});

        return createCategoryData;
    }

    public async updateCategory(category_id: string, categoryData: CreateCategoryDto): Promise<Category> {
        if (isEmpty(categoryData)) throw new HttpException(400, "You're not category");

        const findCategory: Category = await this.categories.findOne({ name: categoryData.name });
        if (findCategory && findCategory._id != category_id) throw new HttpException(409, `You're category ${categoryData.name} already exists`);

        if(categoryData.parent_id != null){
            const findParent: Category = await this.categories.findOne({ parent_id: categoryData.parent_id });
            if (!findParent) throw new HttpException(409, `You're category parent does not exists`);
        }

        const createCategoryData: Category = await this.categories.findByIdAndUpdate({ ...categoryData});

        return createCategoryData;
    }

    public async deleteCategory(categoryId: string): Promise<Category>{
        const findCategory: Category = await this.categories.findOne({ _id: categoryId });
        if (!findCategory) throw new HttpException(409, "You're not category");

        const children: Category [] = await this.findCategoryChildrenById(categoryId);

        children.forEach( element => {
            this.deleteCategory(element._id);
        });
    
        const deleteCategoryById: Category = await this.categories.findByIdAndDelete(categoryId);
        if (!deleteCategoryById) throw new HttpException(409, "You're not category");

    return deleteCategoryById;
    }

    public async findCategoryById(categoryId: string): Promise<Category> {
        if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");
        console.log((categoryId))
        const findCategory: Category = await this.categories.findOne({ _id: categoryId });
        console.log(findCategory);
        if (!findCategory) throw new HttpException(409, "You're not category");
    
        return findCategory;
      }

    public async findCategoryChildrenById(categoryId: string): Promise<Category []> {
        if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");
    
        const findChildren: Category []= await this.categories.find({ parent_id: categoryId });
        if (!findChildren) throw new HttpException(409, "You're not category");

        return findChildren;
      }

    public async findCategorybyLevel(level: number): Promise<Category []> {
        if (isEmpty(level)) throw new HttpException(400, "You're not level");
    
        const findCategory: Category [] = await this.categories.find({ level: level });
        console.log(findCategory);
        if (!findCategory) throw new HttpException(409, "You're not level");

        return findCategory;
    }

    public async findCategoryTree(): Promise<Category []> {
    
        const findCategory: Category [] = await this.categories.find();
        console.log(findCategory);
        if (!findCategory) throw new HttpException(409, "You're not level");

        return findCategory;
    }

/*
    public async findCategoryTree(): Promise<CategoryTree> {
        const findCategory: Category []= await this.category.find();
        
        if (!findCategory) throw new HttpException(409, "No categories found");
        findCategory.sort((catA,catB) => catA.level -catB.level)

        return findCategory;
    }
*/
    public picChildren(catT: Category, possChildren: CategoryTree []) : CategoryTree {
        const children = possChildren.filter( elem => elem._id = catT._id);
        return { _id: catT._id, parent_id: catT.parent_id, name: catT.name, level: catT.level, children:children } ;
    }

    public createtree(cat : Category): CategoryTree {    
        return { _id:cat._id , name: cat.name , parent_id: cat.parent_id , level: cat.level, children: [] };
    }
}