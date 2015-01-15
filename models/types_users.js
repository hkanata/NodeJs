var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var typesUsersSchema = new Schema({  
    _id: Number,
    name: { type: String, required: true },
    users: [{type: Schema.Types.ObjectId, ref: 'users'}]
});

TypesUsers = mongoose.model('types_users', typesUsersSchema);

module.exports = TypesUsers;