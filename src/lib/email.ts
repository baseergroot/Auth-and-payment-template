import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Port 587 uses STARTTLS
  auth: {
    // This MUST be the Brevo Login ID (a09695001@smtp-brevo.com)
    user: process.env.EMAIL_USER, 
    // This MUST be the SMTP Key (xsmtpsib-...)
    pass: process.env.EMAIL_PASS, 
  },
});

export const sendEmail = async ({ to, subject, html }: {
  to: string, subject: string, html: string
}) => {
  const mailOptions = {
    // This shows as the sender in the user's inbox
    from: `"Better Auth Template" <${process.env.EMAIL_ADDRESS}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw error;
  }
};