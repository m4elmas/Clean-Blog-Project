const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Bir Şema oluştur
const PostSchema = new Schema({
    title: String,
    description:String,
    DateCreated: {
        type: Date,
        default:Date.now
    }
});


const Post = mongoose.model('Post',PostSchema);


module.exports = {Post};