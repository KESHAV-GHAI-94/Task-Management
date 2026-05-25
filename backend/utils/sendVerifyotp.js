const nodemailer = require("nodemailer");
const dns = require("dns").promises;

const sendEmailotp = async (email, otp) => {
    console.log(`[sendEmailotp] Attempting to send OTP to: ${email}`);
    try {
        let transportConfig = {
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        };

        try {
            console.log("[sendEmailotp] Resolving smtp.gmail.com DNS (IPv4)...");
            const addresses = await dns.resolve4("smtp.gmail.com");
            console.log(`[sendEmailotp] Resolved smtp.gmail.com IPv4 addresses:`, addresses);
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
                console.log(`[sendEmailotp] Configured nodemailer to use host: ${addresses[0]} (port 465)`);
            } else {
                console.log("[sendEmailotp] No IPv4 addresses found, using fallback service: 'gmail'");
            }
        } catch (dnsErr) {
            console.warn("[sendEmailotp] DNS resolution failed, falling back to service: 'gmail'", dnsErr);
        }

        console.log("[sendEmailotp] Creating nodemailer transport...");
        const transporter = nodemailer.createTransport(transportConfig);

        const mailOptions = {
            from: `"QUICK TASK" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Registration OTP - QUICK TASK",
            html: `
        <h2>Registration  Request</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: blue;">${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        `,
        };

        console.log("[sendEmailotp] Sending email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully to :", email);
        console.log("Nodemailer response info:", info);
    }
    catch (err) {
        console.error("email err in sendEmailotp : ", err);
        throw err;
    }
};

module.exports = { sendEmailotp };
