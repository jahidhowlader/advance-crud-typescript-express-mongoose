import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string,) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "jahid.h@devsnest.llc",
            pass: "jeov ptya syom jhpu",
        },
    });

    await transporter.sendMail({
        from: 'jahid.h@devsnest.llc', // sender address
        to, // list of receivers
        subject: "forget password within 10 mints", // Subject line
        text: "Hello world?", // plain text body
        html, // html body
    });

}