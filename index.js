const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const admin = require("firebase-admin");
const User = require('./models/user');

var serviceAccount = require("./kardashevonefirebase-firebase-adminsdk-jngdo-24c83b58a1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

app.use(cors());
app.use(bodyParser.json());

app.get('/pending', (req, res) => {
  console.log(req.query, req.params);
  res.send(
    {
      'pending':
        [
          {
            'name': 'one',
            'message': 'testmsg'
          },
          {
            'name': 'two',
            'message': 'msg2'
          }
        ]
    });
})

app.post('/initshipment', (req, res) => {
  console.log(req.body);
  let shipment = req.body;


  let db = admin.firestore();
  let users = db.collection('UserData');
  users.where('phoneNumber', '==', req.body.recipient).get().then( result => {
    result.forEach(user => {
      let pendingShipments = Array.from(user.get('pendingShipments'));
      pendingShipments.push(shipment);
      users.doc(user.id).update({
        pendingShipments: pendingShipments
      }).then(() =>{
        res.sendStatus(200);
      }).catch(err => {
        res.sendStatus(500);
      })
    })
  }).catch(err =>{
    res.sendStatus(500);
  })
})

app.post('/login', (req, res) => {
  let user = new User(req.body.data);

  console.log(user.email + ' just logged in with token ' + user.fcmToken)

  res.sendStatus(200);
})


app.post('/fcmtoken', (req, res) => {
  console.log(req.body.token);

  // This registration token comes from the client FCM SDKs.
  let registrationToken = req.body.token;

  // See the "Defining the message payload" section below for details
  // on how to define a message payload.
  let payload = {
    data: {
      test1: "hello",
      test2: "world"
    }
  };

  // // Send a message to the device corresponding to the provided
  // // registration token.
  // admin.messaging().sendToDevice(registrationToken, payload)
  //   .then(function (response) {
  //     // See the MessagingDevicesResponse reference documentation for
  //     // the contents of response.
  //     console.log("Successfully sent message:", response);
  //   })
  //   .catch(function (error) {
  //     console.log("Error sending message:", error);
  //   });


  res.sendStatus(200);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))