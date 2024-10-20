// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
    // service: "Zoho",
    host: "smtp.zoho.com",
    por: 465,
    secure: true,
    auth: {
        user: "farizrachman91@gmail.com",
        pass: "azhar354?"
    },
    requireTLS: true,
});

const send = async ({
    to, subject, content,
}: {
    to: string | string[];
    subject: string;
    content: string;
}) => {
    const result = await transporter.sendMail({
        from: "farizrachman91@gmail.com",
        to,
        subject,
        html: content,
    });

    console.log("Send mail to", to);

    return result;
};

const render = async (template: string, data: any) => {
    const content = await ejs.renderFile(
        path.join(__dirname, `../mail/templates/${template}`),
        data
    );

    return content as string;
};

export default {
    send,
    render,
};

