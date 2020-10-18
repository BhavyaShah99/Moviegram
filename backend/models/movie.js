const mongoose = require('mongoose')

const Movies = mongoose.model('Movies', {
	_id: {
		type: Number,
		required: true,
    },
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    genres: {
		type: Object,
		required: true
	},
    director: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    description: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	imgsrc: {
		type: String,
		required: true
	},
	upvotes: {type: Number, default: 0},
	downvotes: {type: Number, default: 0},
	upvoters: [{type:String, required:true}],
	downvoters: [{type:String, required:true}],
    stars: [{
        type: String,
		required: true,
		minlength: 1
    }]
})

module.exports = { Movies }
