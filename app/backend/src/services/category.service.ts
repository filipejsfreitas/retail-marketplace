import { Category, CategoryTree } from '@interfaces/category.interface';
import { CategoryModel } from '@models/category.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateCategoryDto } from '@dtos/category.dto';

export class CategoryService {
    public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
        if (isEmpty(categoryData)) throw new HttpException(400, "You're not category");

        let category: Category = await CategoryModel.findOne({ name: categoryData.name });
        if (category) throw new HttpException(409, `You're category ${categoryData.name} already exists`);

        if(categoryData.parent_id != null){
            const parent: Category = await CategoryModel.findOne({ parent_id: categoryData.parent_id });
            if (!parent) throw new HttpException(409, `You're category parent does not exists`);
        }

        category = await CategoryModel.create({ ...categoryData});

        return category;
    }

    public async updateCategory(category_id: string, categoryData: CreateCategoryDto): Promise<Category> {
        if (isEmpty(categoryData)) throw new HttpException(400, "You're not category");

        let category: Category = await CategoryModel.findOne({ name: categoryData.name });
        if (category && category._id != category_id) throw new HttpException(409, `You're category ${categoryData.name} already exists`);

        if(categoryData.parent_id != null){
            const findParent: Category = await CategoryModel.findOne({ parent_id: categoryData.parent_id });
            if (!findParent) throw new HttpException(409, `You're category parent does not exists`);
        }

        category = await CategoryModel.findByIdAndUpdate({ ...categoryData});

        return category as Category;
    }

    public async deleteCategory(categoryId: string): Promise<Category>{
        const findCategory: Category = await CategoryModel.findOne({ _id: categoryId });
        if (!findCategory) throw new HttpException(409, "You're not category");

        const children: Category [] = await this.findCategoryChildrenById(categoryId);

        children.forEach( element => {
            this.deleteCategory(element._id);
        });
    
        const category: Category = await CategoryModel.findByIdAndDelete(categoryId);
        if (!category) throw new HttpException(409, "You're not category");

        return category as Category;
    }

    public async findCategoryById(categoryId: string): Promise<Category> {
        if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");
    
        const category: Category = await CategoryModel.findOne({ _id: categoryId });
        console.log(category);
        if (!category) throw new HttpException(409, "You're not category");
    
        return category as Category;
      }

    public async findCategoryChildrenById(categoryId: string): Promise<Category[]> {
        if (isEmpty(categoryId)) throw new HttpException(400, "You're not categoryId");
    
        const children: Category[] = await CategoryModel.find({ parent_id: categoryId });
        if (!children) throw new HttpException(409, "You're not category");

        return children as Category[];
      }

    public async findCategoriesInLevel(level: number): Promise<Category[]> {
        if (isEmpty(level)) throw new HttpException(400, "You're not level");
    
        const categories = await CategoryModel.find({ level: level });
        if (!categories) throw new HttpException(409, "You're not level");

        return categories as Category[];
    }

    public async findCategoryTree(): Promise<Category []> {
    
        const category: Category [] = await CategoryModel.find();
        if (!category) throw new HttpException(409, "You're not level");

        return category;
    }

/*
    public async findCategoryTree(): Promise<CategoryTree> {
        const findCategory: Category []= await CategoryModel.find();
        
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
