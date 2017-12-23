const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const admin = require("firebase-admin");
const User = require('./models/user');
const serviceAccount = require("./kardashevonefirebase-firebase-adminsdk-jngdo-24c83b58a1.json");
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('hello world');
})

app.post('/initshipment', (req, res) => {
  let shipment = req.body;
  let users = db.collection('UserData');
  users.where('phoneNumber', '==', req.body.recipient).get().then(result => {
    result.forEach(user => {
      let data = {
        message: `You have a new shipment pending from ${shipment.sender}.`
      }
      users.doc(user.id).collection('pendingShipments').add(shipment).then(() => {
        admin.messaging().sendToDevice(user.get('fcmToken'), { data }).catch(err => console.error(err))
        res.sendStatus(200)
      }).catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
    })
  }).catch(err => {
    console.error(err)
    res.sendStatus(500);
  })
})

app.listen(port, () => console.log('Example app listening on port 3000!'))