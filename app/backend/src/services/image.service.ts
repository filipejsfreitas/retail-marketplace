import { Image } from '@interfaces/image.interface';
import { ImageModel } from '@models/image.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

export class ImageService{
    public images = ImageModel;

    public async createImages(path: Array<{path:string}>): Promise<Image []>{
        if (isEmpty(path) || (path.length==0)) throw new HttpException(400, "Invalid path");

        const createImage: Image []= await this.images.insertMany(path);

        return createImage;
    }

    public async deleteImages(id: string[]) {
        if (isEmpty(id) || (id.length==0)) throw new HttpException(400, "Invalid id");

        const image = await ImageModel.deleteMany({_id:{ $in: id}}) ;
        if (!image) throw new HttpException(404, "image not found");

        return image;
    }

    public async deleteImage(id: string): Promise<Image> {
        if (isEmpty(id) || (id.length==0)) throw new HttpException(400, "Invalid id");

        const image: Image = await ImageModel.findByIdAndDelete(id);
        if (!image) throw new HttpException(404, "image not found");

        return image;
    }

    public async getImageById(id:string): Promise<Image> {
        if (isEmpty(id) || (id.length==0)) throw new HttpException(400, "Invalid id");

        const image: Image = await ImageModel.findById(id);
        if (!image) throw new HttpException(404, "image not found");

        return image;
    }

}