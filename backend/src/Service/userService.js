const userModel = require('../Model/userModel');
const key = '1234567encripttry';
const encryptor = require('simple-encryptor')(key);


module.exports.createUserDBService = (userDetails) =>{

    return new Promise(function checkUrl(resolve,reject){

        const userModelData = new userModel();

        userModelData.firstname = userDetails.firstname;
        userModelData.secondname = userDetails.secondname;
        userModelData.email = userDetails.email;
        // userModelData.password = userDetails.password;
        const encrypted = encryptor.encrypt(userDetails.password);
        userModelData.password = encrypted;
  
        userModelData.save()
        .then((result) => {
          console.log('User saved:', result);
          resolve(result);
        })
        .catch((error) => {
          console.error('Error saving user:', error);
          reject(error); 
        });
     })

}

module.exports.loginUserDBService = async (userLogDetails) => {
    try {
        const result = await userModel.findOne({ email: userLogDetails.email });

        if (result !== null) {
            const decrypted = encryptor.decrypt(result.password);
            if (decrypted === userLogDetails.password) {
                return {  status: true, message: "User validated successfully"};
            } else {
                throw { status: false, message: "User validation failed" };
            }
        } else {
            throw { status: false, message: "Invalid user details" };
        }
    } catch (error) {
        throw { status: false, message: "Invalid data" };
    }
};

module.exports.getUsersFromDBService = () => {
    return new Promise((resolve, reject) => {
        userModel.find({})
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }