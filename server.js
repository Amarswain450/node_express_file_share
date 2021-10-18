import express from 'express';
import { APP_PORT } from './config';
const app = express();
const PORT = APP_PORT || 5000;
import connect from './db';
import router from './routes/web';
import path from 'path';
import bodyParser from 'body-parser';

//config database
connect();

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config static files
app.use(express.static('public'))

//config template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//config router
app.use('/api', router);


app.listen(PORT, () => {
    console.log(`server running on port number: ${PORT}`);
});