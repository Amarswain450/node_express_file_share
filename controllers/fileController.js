import multer from 'multer';
import path from 'path';
import File from '../models/file';
import { v4 as uuidv4 } from 'uuid';
import { APP_URL } from '../config';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
}).single('fileShare');

const fileController = {
    async fileUpload(req, res){
        try{
            upload(req, res, async(err) => {
                if(err){
                    return res.status(500).send({error: err.message});
                }

                //validation
                if(!req.file){
                    return res.status(422).json({error: 'All fields are required'});
                }

                //store in databse
                const fileData = new File({
                    filename: req.file.filename,
                    path: req.file.path,
                    size: req.file.size,
                    uuid: uuidv4()
                });
                const response = await fileData.save();
                return res.status(201).json({file: `${APP_URL}/files/${response.uuid}`});
            })
        }catch(err){
            console.log(err);
        }
    }
}

export default fileController;