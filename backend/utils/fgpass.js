const nodemailer = require("nodemailer");
const fgpass = async(email,otp)=>{
    try{
        const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });
    const mailOptions = {
    from: `"QUICK TASK" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Forget Password OTP - QUICK TASK",
    html: `
        <h2>Forget Password Request</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: blue;">${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        `,
    };
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to :",email);
    }
    catch(err){
        console.error("email err : ",err);
        throw err;
    }
};
module.exports = fgpass;