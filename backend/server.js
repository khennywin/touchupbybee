require('dotenv').config({ override: true });
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/book', async (req, res) => {
  const { fullName, email, eventDate, eventTime, service, locationType } = req.body;

  if (!fullName || !email || !eventDate || !eventTime || !service || !locationType) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"Touchupbybe Booking" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    subject: `New Booking Request from ${fullName}`,
    text: `
      You have received a new booking request!
      
      Client Name: ${fullName}
      Client Email: ${email}
      Event Date: ${eventDate}
      Event Time: ${eventTime}
      Required Service: ${service}
      Location Preference: ${locationType}
      
      Please contact the client to confirm availability.
    `,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Client Name:</strong> ${fullName}</p>
      <p><strong>Client Email:</strong> ${email}</p>
      <p><strong>Event Date:</strong> ${eventDate}</p>
      <p><strong>Event Time:</strong> ${eventTime}</p>
      <p><strong>Required Service:</strong> ${service}</p>
      <p><strong>Location Preference:</strong> ${locationType}</p>
      <br>
      <p>Please contact the client to confirm availability.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send booking request. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
