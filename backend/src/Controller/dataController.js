const dataService = require('../Service/dataService')

module.exports.getAllDatas = async (req,res) =>{
  
    const datas = await dataService.getDataFromDBService();
    res.send({"status":true,"data":datas})
}

module.exports. createData = (req, res) => {
  console.log('requestbody:',req.body);
  const dataDetails = {
    label: req.body.label, 
    startTime: req.body.startTime, 
    endTime: req.body.endTime,
  };

  dataService.createDataDBService(dataDetails)
    .then((result) => {
      res.status(201).json(result); 
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while creating data', message: error.message });
    });
};

module.exports.updateData = async(req,res) =>
{

}

module.exports.deleteData = async(req,res) =>
{

    console.log(req.params.id);

       try {
        console.log(req.params.id);
        const status = await dataService.deleteDataDBService(req.params.id);
        console.log(status);
    
        if (status) {
          res.send({ "status": true, "message": "Data deleted successfully" });
        } else {
          
          res.send({ "status": false, "message": "error deleting data" });
        }
      } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
      }
}
