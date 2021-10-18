import File from '../models/file';

const downloadController = {
    async download(req, res){
        try{
            const file = await File.findOne({uuid: req.params.uuid});
            if(!file){
                return res.status(500).json({error: "file not found"});
            }
            const filePath = `${__dirname}/../${file.path}`;
            res.download(filePath);
        }catch(err){
            return res.status(500).json({error: "something went wrong"});
        }
    }
}

export default downloadController;