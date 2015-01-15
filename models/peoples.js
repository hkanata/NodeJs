var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var peoplesSchema = new Schema({  
    _id: Number,
    name: { type: String, required: true },  
    email: { type: String, required: true },
    users: [{type: Schema.Types.ObjectId, ref: 'users'}]
});

Peoples = mongoose.model('peoples', peoplesSchema);

module.exports = Peoples;