const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const fgpass = async(email,otp)=>{
    try{
        await resend.emails.send({
            from: "QUICK TASK <onboarding@resend.dev>",
            to: email,
            subject: "Forget Password OTP - QUICK TASK",
            html: `
                <h2>Forget Password Request</h2>
                <p>Your One-Time Password (OTP) is:</p>
                <h1 style="color: blue;">${otp}</h1>
                <p>This OTP is valid for <b>10 minutes</b>.</p>
                <p>If you didn’t request this, please ignore this email.</p>
            `,
        });
        console.log("OTP email sent to :",email);
    }
    catch (err) {
        console.error("email err in fgpass : ", err);
        throw err;
    }
};

module.exports = fgpass;