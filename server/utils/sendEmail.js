import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
    try {
        let transporter;
        const isPlaceholder = !process.env.EMAIL_USER || 
                              process.env.EMAIL_USER.includes('your-email') || 
                              !process.env.EMAIL_PASS || 
                              process.env.EMAIL_PASS.includes('your-gmail');

        if (isPlaceholder) {
            console.log('⚠️ No email credentials found in .env. Creating temporary Ethereal test email account...');
            // Create a test account on Ethereal Email automatically
            const testAccount = await nodemailer.createTestAccount();
            
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            
            const mailOptions = {
                from: '"RAANI Skincare Test" <no-reply@raani.lk>',
                to,
                subject,
                html,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('✉️ Test Email Sent! Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return info;
        } else {
            // Use real SMTP credentials from .env
            transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: `"RAANI Skincare" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('✉️ Real Email sent successfully! MessageID: %s', info.messageId);
            return info;
        }
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};

