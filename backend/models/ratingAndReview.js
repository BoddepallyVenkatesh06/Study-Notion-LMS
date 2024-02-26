const mongoose = require('mongoose')

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: String,
        reqired: true
    },
    review: {
        type: String,
        required: true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},

});

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);