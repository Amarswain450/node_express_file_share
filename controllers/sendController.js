import File from '../models/file';
import sendMail from '../services/sendMail';
import emailTemplate from '../services/emailTemplate';
import { APP_URL } from '../config';

const sendController = {
    async send(req, res){
        try{
            const {uuid, emailFrom, emailTo} = req.body;
            if(!uuid || !emailFrom || !emailTo){
                return res.status(422).send({error: 'all fields are required'});
            }
            const file = await File.findOne({uuid: uuid});
            file.sender = emailFrom;
            file.receiver = emailTo;
            await file.save();

            //send mail
            sendMail({
                from: emailFrom,
                to: emailTo,
                subject: 'inShare file sharing',
                text: `${emailFrom} shared a file with you.`,
                html: emailTemplate({
                    emailFrom, 
                    downloadLink: `${APP_URL}/api/show/${file.uuid}` ,
                    size: parseInt(file.size/1000) + ' KB',
                    expires: '24 hours'
                })
            })
            res.send("ok");
        }catch(err){
            return res.status(500).send({error: 'something went wrong'});
        }
    }
}

export default sendController;