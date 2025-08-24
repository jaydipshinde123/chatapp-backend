import twilio from "twilio";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Twilio client init
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-sms", async (req, res) => {
  try {
    const { to, message } = req.body;

    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to,
    });

    res.json({ success: true, sid: sms.sid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
