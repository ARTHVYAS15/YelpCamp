const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: 'string',
        required: 'true',
        unique: 'true'
    }
});

userSchema.plugin(plm);
module.exports = mongoose.model('user', userSchema);