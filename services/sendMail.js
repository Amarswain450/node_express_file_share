import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASSWORD } from '../config/index';

async function sendMail({ from, to, subject, text, html}){

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD
        }
    });

    let mailDetails = {
        from: `inShare <${from}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

export default sendMail;