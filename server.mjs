import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import "dotenv/config";
import sendMessage from './utils/whatsappsendmessage.mjs'

const app = express();
const PORT = process.env.PORT || 3000;
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Server is running")
})


app.post("/twiliowebhook", (req, res) => {

    // console.log("req: ", JSON.stringify(req.body));

    console.log("message: ", req.body.Body);

   // TODO: ask dialogflow what to respond
   
   
    let twiml = new twilio.twiml.MessagingResponse()
    twiml.message('The Robots are coming! Head for the hills!');

    res.header('Content-Type', 'text/xml');
    res.send(twiml.toString());
})

//! Whatsapp webhook
app.post("/whatsappwebhook", (req, res) => {
    let message = req.body.Body;
    let senderID = req.body.From;

    console.log(`${message} --- ${senderID} --- ${process.env.TWILIO_NUMBER}`)

    sendMessage(twilioClient, "hello this is imran twilio", senderID, process.env.TWILIO_NUMBER)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});