import { set, connect } from 'mongoose';

set("strictQuery", true);

async function startDB(){
    await connect('mongodb+srv://admin:admin@cluster0.kkagsd2.mongodb.net/?retryWrites=true&w=majority');
}

export default startDB;