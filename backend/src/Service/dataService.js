const datas = require('../Model/dataModel')
const moment = require('moment-timezone');

module.exports.getDataFromDBService = () => {
   return new Promise((resolve, reject) => {
     datas.find({})
       .then((result) => {
         resolve(result);
       })
       .catch((error) => {
         reject(error);
       });
   });
 }

module.exports.createDataDBService = (dataDetails) => {
  return new Promise((resolve, reject) => {
    console.log("dataDetails:",dataDetails)
const datamodelData = new datas();

datamodelData.label = dataDetails.label;

 console.log("starttimeis:",dataDetails.startTime)
console.log("endtimeis:",dataDetails.endTime)

const formatString = 'YYYY-MM-DDTHH:mm';
const localTimeZone = 'Europe/Paris'

datamodelData.startTime = moment.utc(dataDetails.startTime,formatString).tz(localTimeZone).toDate();
datamodelData.endTime = moment.utc(dataDetails.endTime,formatString).tz(localTimeZone).toDate();
console.log("datamodelData.startTime:" , datamodelData.startTime)
console.log("datamodelData.endTime:",datamodelData.endTime)
datamodelData.save()
         .then((result) => {
           console.log('Data saved:', result);
           resolve(result);
         })
         .catch((error) => {
           console.error('Error saving data:', error);
           reject(error);
         });
  
   });
  
 };

   module.exports.deleteDataDBService = (id) => {
      return new Promise((resolve, reject) => {
        console.log(id)
        datas.findOneAndDelete(id)
          .then((result) => {
            if (result) {
              resolve(result);
            } else {
              reject(false);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
