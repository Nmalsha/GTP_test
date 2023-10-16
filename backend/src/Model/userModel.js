const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required:true,        
    },

    secondname: {
        type: String,
        required:true,        
    },

    email: {
        type: String,
        required:true,        
    },

    password: {
        type: String,
        required:true,        
    },

});

const User = mongoose.model('Users', userSchema);

module.exports = User;

// module.export = mongoose.model('User',userSchema);
