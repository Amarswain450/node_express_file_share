import File from '../models/file';
import { APP_URL } from '../config';

const showController = {
    async show(req, res){
        try{
            const fileData = await File.findOne({uuid: req.params.uuid});
            if(!fileData){
                return res.render('download', {error: 'file not found...'});
            }
            return res.render('download', {
                uuid: fileData.uuid,
                size: fileData.size,
                path: fileData.path,
                filename: fileData.filename,
                downloadLink: `${APP_URL}/api/files/download/${fileData.uuid}`
            });
        }catch(err){
            return res.render('download', {error: 'something went wrong'});
        }
    }
}

export default showController;