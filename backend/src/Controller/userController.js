const userService = require('../Service/userService')

module.exports.createUser = async (req,res) =>{
console.log(req,res)
    const status = await userService.createUserDBService(req.body);
    console.log(status)
if(status){
    res.send({"status":true,"message":"User created successfully"});
}
else{
    res.send({"status":false,"message":"error creating User "});
}

}

module.exports.loginUser = async (req, res) => {
    try {
      console.log(req, res);
      const status = await userService.loginUserDBService(req.body);
      console.log(status);
  
      if (status) {
        res.send({ "status": true, "message": "User found successfully" });
      } else {
        console.log('error login user');
        res.send({ "status": false, "message": "error login user" });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
  }

  module.exports.getAllUsers = async (req,res) =>{
  
    const users = await userService.getUsersFromDBService();
    res.send({"status":true,"data":users})
}