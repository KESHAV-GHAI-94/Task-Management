const nodemailer = require("nodemailer");
const dns = require("dns").promises;

const fgpass = async (email, otp) => {
    console.log(`[fgpass] Attempting to send Forget Password OTP to: ${email}`);
    try {
        let transportConfig = {
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        };

        try {
            console.log("[fgpass] Resolving smtp.gmail.com DNS (IPv4)...");
            const addresses = await dns.resolve4("smtp.gmail.com");
            console.log(`[fgpass] Resolved smtp.gmail.com IPv4 addresses:`, addresses);
            if (addresses && addresses.length > 0) {
                transportConfig = {
                    host: addresses[0],
                    port: 465,
                    secure: true,
                    tls: {
                        servername: "smtp.gmail.com"
                    },
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                };
                console.log(`[fgpass] Configured nodemailer to use host: ${addresses[0]} (port 465)`);
            } else {
                console.log("[fgpass] No IPv4 addresses found, using fallback service: 'gmail'");
            }
        } catch (dnsErr) {
            console.warn("[fgpass] DNS resolution failed, falling back to service: 'gmail'", dnsErr);
        }

        console.log("[fgpass] Creating nodemailer transport...");
        const transporter = nodemailer.createTransport(transportConfig);

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

        console.log("[fgpass] Sending email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("Forget Password OTP email sent successfully to :", email);
        console.log("Nodemailer response info:", info);
    }
    catch (err) {
        console.error("email err in fgpass : ", err);
        throw err;
    }
};

module.exports = fgpass;