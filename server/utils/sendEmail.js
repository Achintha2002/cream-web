import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Create a transporter
    // For development/testing, we can use a mock service like Mailtrap if gmail is not properly configured.
    // However, if EMAIL_USER and EMAIL_PASS are provided in .env, we'll try to use them.
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const message = {
        from: `${process.env.FROM_NAME || 'Raani Cream'} <${process.env.FROM_EMAIL || 'noreply@raanicream.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
    } catch (err) {
        // Log the error but don't crash, allowing the app to fall back to console logging the URL
        console.error('Email sending failed. Please check credentials:', err.message);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
