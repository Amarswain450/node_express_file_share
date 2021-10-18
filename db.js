import mongoose from 'mongoose';

const connect = async () => {
    try{
        const response = await mongoose.connect('mongodb://localhost:27017/file-share');
        if(response){
            console.log('Database connected...!!!');
        }else{
            console.log('Database not connected...!!!');
        }
    }catch(err){
        console.log(err);
    }
}

export default connect;