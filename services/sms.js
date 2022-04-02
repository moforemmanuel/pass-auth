const AWS = require('aws-sdk');
const res = require('express/lib/response');


module.exports.sendSMS = () => {

    //setting params for sms

    const params = {
        Message: phone_message,
        PhoneNumber: phone_number
    };

    //send the params to aws sns using aws-sdk
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-32'}).publish(params).promise();

    //send response back to client if d msg is sent
    publishTextPromise.then( data => {
        return res.send({"status": "Success", "data": data});
    }).catch( err => {
        return res.send({"status":"Failure", "Err": err});
    })
}