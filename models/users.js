var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({  
    _id: Number,
    password: { type: String, required: true },  
    people_id: {type: Number, ref: 'peoples'},
    type_user_id: {type: Number, ref: 'types_users'}
    //people_id: [{type: Schema.Types.ObjectId, ref: 'peoples'}],
    //type_id: [{type: Schema.Types.ObjectId, ref: 'types_users'}]
});

Users = mongoose.model('users', usersSchema);

module.exports = Users;