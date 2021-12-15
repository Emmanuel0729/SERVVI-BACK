const express = require('express');
const router = express.Router();



var admin = require('firebase-admin');
var serviceAccount = require('../servvi-e0eaf-firebase-adminsdk-v5lhd-acc5c358c2.json');

router.post('/sendMessage',(req, res)=>{
    const {token,message} = req.body;
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://fcm.googleapis.com/fcm/send"
        });
    }
    var newToken = token;
    var newMessage = {
        notification: {
            title: "Nuevo mensaje",
            body: message,
            sound: "default"
        },
        data: {
            message: message
        }
    }
    admin.messaging().sendToDevice(newToken, newMessage).catch(console.error);
    res.json({mensaje:'Success'});
});


router.post('/sendNoti',(req, res)=>{
    const {token} = req.body;
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://fcm.googleapis.com/fcm/send"
        });
    }
    var newToken = token;
    var newMessage = {
        notification: {
            title: "Nuevo mensaje",
            body: "Ya llegue",
            sound: "default"
        }
    }
    admin.messaging().sendToDevice(newToken, newMessage).catch(console.error);
    res.json({mensaje:'Success'});
});


module.exports = router;
