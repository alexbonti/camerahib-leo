const nodemailer = require('nodemailer');
const config = require('./config.json');

let email = config.EMAIL_USER;
let pass = config.EMAIL_PASS;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

// ** Builds the content of the notification message
function messageBuilder (data) {
    let msg = '';

    if (data.policy1 == 'True') {
        msg += `No Hat Detected!\n`
    }
    if (data.policy2 == 'True') {
        msg += `No Vest Detected!\n`
    }
    if (data.policy3 == 'True') {
        msg += 'Intruder Detected!\n'
    }
    if (data.policy4 == 'True') {
        msg += 'Running Detected!\n'
    }

    return msg;
}

// ** Setup Mail
function setupMail (to, subject, content) {
    let mailOptions = {
        from: email,
        to: to,
        subject: subject,
        text: content
    }

    return mailOptions;
}

async function sendMail (mailOptions) {
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log(`Email sent sucessfully: ${info.response}`);
        }
    })
}

module.exports = { messageBuilder, setupMail, sendMail };



