import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {

    // cloudinary.config({
    //     cloud_name: process.env.CLOUDINARY_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_SECRET_KEY
    // });
    cloudinary.config({
        cloud_name: 'hanhnttu',
        api_key: '438659875729145',
        api_secret: 'CE7vHqhFkA9FtkBk705gu34R5tY'
    });
    
}

export default connectCloudinary;