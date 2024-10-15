const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        
    },
    name: {
        type: String,
        
    },
    surname: {
        type: String,
        
    },
    tel: {
        type: String,
        
    },
    about: {
        type: String,
        
    },
    email: {
        type: String,
        
    },

})

module.exports = mongoose.model('UserInfo', userInfoSchema)
 