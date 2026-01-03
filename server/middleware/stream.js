import cloudinary from "../config/cloudinary.js";
import streamifier from 'streamifier'

// export const uploadFile = (file, folder) => {
//     console.log(file);
//     const isImage = file.mimetype.startsWith('image/');
//     const resourceType = isImage ? 'image' : 'raw';
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream({ folder, resource_type: resourceType, use_filename: true }, (err, result) => {
//             if (err) console.log(err);
//             if (err) reject(err);
//             else resolve(result.secure_url);
//         })
//         streamifier.createReadStream(file.buffer).pipe(stream);
//     })
// }


export const uploadFile = (file, folder) => {

    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new Error("File buffer missing"));
        }

        const isImage = file.mimetype.startsWith("image/");
        const resourceType = isImage ? "image" : "raw";

        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType, use_filename: true },
            (err, result) => {
                if (err) return reject(err);
                resolve(result.secure_url);
            }
        );

        stream.on("error", reject);
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};
