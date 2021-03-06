import { ProductModel } from '../models/product.model';
import { CommentChecker, CommentProduct, Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dtos/product.dto';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import { QueryParameters } from 'dtos/query.dto';
import { CategoryModel } from 'models/category.model';
import { Category } from 'interfaces/category.interface';
import { ProposalModel } from 'models/proposal.model';
import { Proposal } from 'interfaces/proposal.interface';
import fetch from 'node-fetch';

export class ProductService {
  public products = ProductModel;
  public categories = CategoryModel;
  public proposals = ProposalModel;

  public async getProducts(): Promise<Product[]> {
    const prodList: Product[] = await this.products.find();

    return prodList;
  }

  public async findLowers(category_id: string) {
    const ids = [];
    let tempIds = [];
    let children = await this.categories.find({ parent_id: category_id });

    while (children.length > 0) {
      children.forEach(element => {
        tempIds.push(element._id);
        ids.push(element._id);
      });

      children = await this.categories.find({ parent_id: { $in: tempIds } });
      tempIds = [];
      console.log(ids);
    }

    return ids;
  }

  public async getProductByCategoryName(category_name: string) {
    const ids = [];
    const category: Category = await this.categories.findOne({ name: category_name });

    if (!category) {
      throw new HttpException(400, 'Category not found');
    }

    const categories_ids = await this.findLowers(category._id);

    categories_ids.push(category._id);

    const cat_products = await this.products.find({ category_id: { $in: categories_ids } });

    return cat_products;
  }

  public listProducts(parameters: QueryParameters) {
    if (parameters.category_id) {
      if (parameters.sort_by && parameters.order_by) {
        if (parameters.order_by === 'desc') {
          if (parameters.sort_by === 'price') {
            return this.products
              .find({
                category_id: parameters.category_id,
                best_offer: { $gte: parameters.min_price, $lt: parameters.max_price },
                score: { $gte: parameters.min_rating },
              })
              .sort({ best_offer: -1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          } else if (parameters.sort_by === 'rating') {
            return this.products
              .find({
                category_id: parameters.category_id,
                best_offer: { $gte: parameters.min_price, $lt: parameters.max_price },
                score: { $gte: parameters.min_rating },
              })
              .sort({ score: -1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          }
        } else {
          if (parameters.sort_by === 'price') {
            return this.products
              .find({
                category_id: parameters.category_id,
                best_offer: { $gte: parameters.min_price, $lt: parameters.max_price },
                score: { $gte: parameters.min_rating },
              })
              .sort({ best_offer: 1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          } else if (parameters.sort_by === 'rating') {
            return this.products
              .find({
                category_id: parameters.category_id,
                best_offer: { $gte: parameters.min_price, $lt: parameters.max_price },
                score: { $gte: parameters.min_rating },
              })
              .sort({ score: 1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          }
        }
      } else {
        return this.products
          .find({
            category_id: parameters.category_id,
            best_offer: { $gte: parameters.min_price, $lt: parameters.max_price },
            score: { $gte: parameters.min_rating },
          })
          .skip(parameters.limit * parameters.page)
          .limit(parameters.limit);
      }
    } else {
      if (parameters.sort_by && parameters.order_by) {
        if (parameters.order_by === 'desc') {
          if (parameters.sort_by === 'price') {
            return this.products
              .find({ best_offer: { $gte: parameters.min_price, $lt: parameters.max_price }, score: { $gte: parameters.min_rating } })
              .sort({ best_offer: -1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          } else if (parameters.sort_by === 'rating') {
            return this.products
              .find({ best_offer: { $gte: parameters.min_price, $lt: parameters.max_price }, score: { $gte: parameters.min_rating } })
              .sort({ score: -1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          }
        } else {
          if (parameters.sort_by === 'price') {
            return this.products
              .find({ best_offer: { $gte: parameters.min_price, $lt: parameters.max_price }, score: { $gte: parameters.min_rating } })
              .sort({ best_offer: 1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          } else if (parameters.sort_by === 'rating') {
            return this.products
              .find({ best_offer: { $gte: parameters.min_price, $lt: parameters.max_price }, score: { $gte: parameters.min_rating } })
              .sort({ score: 1 })
              .skip(parameters.limit * parameters.page)
              .limit(parameters.limit);
          }
        }
      } else {
        return this.products
          .find({ best_offer: { $gte: parameters.min_price, $lt: parameters.max_price }, score: { $gte: parameters.min_rating } })
          .skip(parameters.limit * parameters.page)
          .limit(parameters.limit);
      }
    }
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not product");

    const createProductData: Product = await this.products.create({
      ...productData,
      number_scores: 0,
      score: 0,
      number_views: 0,
      comments: [],
      best_offer: 0,
    });

    return createProductData;
  }

  public async updateProduct(productData: CreateProductDto, prodId: string): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not product");

    const product: Product = await this.products.findOne({ _id: prodId });
    if (!product) throw new HttpException(409, `You're product does not exists`);
    const updateProductData: Product = await this.products.findOneAndUpdate({ _id: prodId }, { ...productData }, { new: true });

    return updateProductData;
  }

  public async findProductById(prodId: string): Promise<ProductModel> {
    if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");

    const findProduct = await this.products.findOne({ _id: prodId });

    if (!findProduct) throw new HttpException(409, "You're not product");

    return findProduct;
  }

  public async commentProduct(prodId: string, comment: CommentChecker): Promise<ProductModel> {
    if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findOne({ _id: prodId });

    if (!findProduct) throw new HttpException(409, "You're not product");

    const newNumberScores = findProduct.number_scores + 1;

    const newScore = (findProduct.score * findProduct.number_scores + comment.score) / newNumberScores;

    const updateProductData = await this.products.findOneAndUpdate(
      { _id: prodId },
      { score: newScore, number_scores: newNumberScores, $addToSet: { comments: comment } },
      { new: true },
    );

    const aiComment = { productId: prodId, review: comment.comment };

    await fetch(process.env.FLASK_URL + '/add_review_classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aiComment),
    });

    return updateProductData;
  }

  public async getOneImageId(prodId: string): Promise<string> {
    const prod: Product = await this.findProductById(prodId);

    return prod.images[0];
  }

  public async updateComment(prodId: string, commentId: string, comment: CommentChecker): Promise<ProductModel> {
    if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");

    const findProduct = await this.products.findById(prodId);

    let newScore = 0;

    findProduct.comments.forEach(element => {
      if (element._id.toString() === commentId) {
        console.log('encontrou coment??rio');
        if (!(element.client_id.toString() === comment.client_id)) {
          throw new HttpException(400, "You're not authorized");
        }

        newScore = (findProduct.score * findProduct.number_scores + comment.score - element.score) / findProduct.number_scores;

        element.comment = comment.comment;
        element.title = comment.title;
        element.date = new Date();
        element.score = comment.score;
      }
    });

    /*
        //findProduct.comments.id(commentId)


        const parent1 : Product = await this.products.findOneAndUpdate({_id: prodId, "comments._id": commentId},{ $set:{"comments.$.title":comment.title} });
        //const parent : Product = await this.products.findOneAndUpdate({_id: prodId},{ score:newScore},{ new: true });
        */
    const result = await findProduct.save();

    const aiComment = { productId: prodId, review: comment.comment };

    await fetch(process.env.FLASK_URL + '/add_review_classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aiComment),
    });

    return result;
  }

  public async deleteComment(prodId: string, commentId: string, clientId: string): Promise<ProductModel> {
    if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");

    const findProduct: Product = await this.products.findById(prodId);

    console.log(findProduct);

    const oldComment: CommentProduct = findProduct.comments.find(element => element._id.toString() === commentId);

    console.log(oldComment);

    if (oldComment.client_id.toString() === clientId) {
    } else {
      throw new HttpException(400, "You're not authorized");
    }

    const newNumberScores = findProduct.number_scores - 1;

    let newScore = 0;

    if (newNumberScores > 0) {
      newScore = (findProduct.score * findProduct.number_scores - oldComment.score) / newNumberScores;
    }

    const parent = await this.products.findOneAndUpdate(
      { _id: prodId },
      { score: newScore, number_scores: newNumberScores, $pull: { comments: { _id: commentId } } },
      { new: true },
    );
    return parent;
  }

  public async getAllPriceStats(sellerId: string) {
    const seller_proposals = await this.proposals.find({ seller_id: sellerId });

    const product_proposal_search = [];
    const product_search = [];

    seller_proposals.forEach(element => {
      product_proposal_search.push(this.proposals.find({ product_id: element.product_id }));
      product_search.push(this.products.findOne({ _id: element.product_id }));
    });

    const requests = [];
    return Promise.all(product_search)
      .then(productsArray => {
        return Promise.all(product_proposal_search)
          .then(proposalsArray => {
            for (let i = 0; i < seller_proposals.length; i++) {
              const proposal = seller_proposals[i];
              const newFormatProps = [];
              let seller_Index = -1;

              const productProposals = proposalsArray[i];

              for (let index = 0; index < productProposals.length; index++) {
                if (productProposals[index].seller_id === sellerId) {
                  seller_Index = index;
                }

                newFormatProps.push({
                  id: productProposals[index]._id,
                  sellerId: productProposals[index].seller_id,
                  productId: productProposals[index].product_id,
                  price: productProposals[index].price,
                  shipping_price: productProposals[index].shipping,
                  stock: productProposals[index].stock,
                });
              }
              if (seller_Index === -1) {
                throw new HttpException(400, 'You do not have a proposal on this product');
              }

              const info = {
                sellerID: sellerId,
                productId: proposal.product_id,
                product_name: productsArray[i].name,
                proposals: newFormatProps,
              };

              requests.push(
                fetch(process.env.FLASK_URL + '/seller_optimization', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(info),
                }),
              );
            }

            return Promise.all(requests)
              .then(async price_optimmized => {
                return Promise.all(price_optimmized.map(req => req.json())).then(reps => {
                  return reps;
                });
              })
              .catch(function (err) {
                throw new HttpException(500, err.message); // some coding error in handling happened
              });
          })
          .catch(function (err) {
            throw new HttpException(500, err.message); // some coding error in handling happened
          });
      })
      .catch(function (err) {
        throw new HttpException(500, err.message); // some coding error in handling happened
      });
  }

  public async getPriceStats(prodId: string, sellerId: string) {
    const props: Proposal[] = await this.proposals.find({ product_id: prodId });
    const product: Product = await this.products.findOne({ _id: prodId });
    let seller_proposal: Proposal;
    let seller_Index = -1;

    const newFormatProps = [];

    for (let index = 0; index < props.length; index++) {
      if (props[index].seller_id === sellerId) {
        seller_Index = index;
      }

      newFormatProps.push({
        id: props[index]._id,
        sellerId: props[index].seller_id,
        productId: props[index].product_id,
        price: props[index].price,
        shipping_price: props[index].shipping,
        stock: props[index].stock,
      });
    }
    if (seller_Index === -1) {
      throw new HttpException(400, 'You do not have a proposal on this product');
    }

    const info = {
      sellerID: sellerId,
      productId: prodId,
      product_name: product.name,
      proposals: newFormatProps,
    };

    const response = await fetch(process.env.FLASK_URL + '/seller_optimization', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      throw new HttpException(500, await response.json());
    }

    return await response.json();
  }

  public async getEvaluation(prodId: string) {
    const response = await fetch(process.env.FLASK_URL + `/product_evaluation/${prodId}`, { method: 'GET' });

    if (!response.ok) {
      throw new HttpException(500, await response.json());
    }

    return await response.json();
  }

  public async getSuggestions(clientId: string, prodId: String) {
    const response = await fetch(process.env.FLASK_URL + `/products_recommendation/${prodId}`, { method: 'GET' });

    if (!response.ok) {
      throw new HttpException(500, await response.json());
    }

    const prod_list = await response.json();

    if (prod_list['recommendations'].length === 0) {
      const prod = await this.products.findById(prodId);
      const similar = await this.products.find({ category_id: prod.category_id }).limit(5);

      return similar;
    }

    return prod_list['recommendations'];
  }
}
