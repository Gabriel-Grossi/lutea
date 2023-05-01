const mongoose = require('mongoose')

mongoose.set("strictQuery", true);

async function startDB(){
    await mongoose.connect(`mongodb+srv://admin:admin@cluster0.kkagsd2.mongodb.net/?retryWrites=true&w=majority`);
}

module.exports = startDB;