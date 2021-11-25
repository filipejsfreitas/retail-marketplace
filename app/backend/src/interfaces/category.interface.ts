export interface Category {
  _id: string;
  name: string;
  parent_id: string;
  level: number;
}

export interface CategoryTree {
  _id: string;
  name: string;
  parent_id: string;
  level: number;
  children: CategoryTree [];
}
