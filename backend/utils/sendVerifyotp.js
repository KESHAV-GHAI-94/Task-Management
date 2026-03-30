// const nodemailer = require("nodemailer");
// const sendEmailotp = async(email,otp)=>{
//     try{
//         const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
//     });
//     const mailOptions = {
//     from: `"QUICK TASK" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Registration OTP - QUICK TASK",
//     html: `
//         <h2>Registration  Request</h2>
//         <p>Your One-Time Password (OTP) is:</p>
//         <h1 style="color: blue;">${otp}</h1>
//         <p>This OTP is valid for <b>10 minutes</b>.</p>
//         <p>If you didn’t request this, please ignore this email.</p>
//         `,
//     };
//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent to :",email);
//     }
//     catch(err){
//         console.error("email err : ",err);
//         throw err;
//     }
// };
// module.exports = {sendEmailotp};

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailotp = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "keshavghai94@gmail.com", // ONLY this works in test mode
      subject: "Your OTP",
      html: `<h2>Your OTP is ${otp}</h2>`
    });

    console.log("✅ Email sent:", response);

  } catch (err) {
    console.error("❌ Error:", err);
  }
};

module.exports = { sendEmailotp };