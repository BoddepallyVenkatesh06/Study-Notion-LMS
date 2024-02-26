const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60, // The document will be automatically deleted after 3 minutes of its creation time
    }

});

//  function to send email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = mailSender(email, 'Verification Email from StudyNotion', otp);
        console.log('Email sent successfully to - ', email);

    }
    catch (error) {
        console.log('Error while sending an email to ', email);
        throw new error;
    }
}

// pre middleware
OTPSchema.pre('save', async (next) => {
    // console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})



module.exports = mongoose.model('OTP', OTPSchema);