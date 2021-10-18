import express from 'express';
const router = express.Router();
import fileController from '../controllers/fileController';
import showController from '../controllers/showController';
import downloadController from '../controllers/downloadController';
import sendController from '../controllers/sendController';

router.post('/file', fileController.fileUpload);
router.get('/show/:uuid', showController.show);
router.get('/files/download/:uuid', downloadController.download);
router.post('/send', sendController.send);

export default router;