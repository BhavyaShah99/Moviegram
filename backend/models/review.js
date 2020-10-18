const mongoose = require('mongoose')

const Reviews = mongoose.model('Reviews', {
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
		movie_title:{
			type: String,
			required: true,
			minlength: 1,
			trim: true
		},
    content: {
        type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    spoilers: {
        type: Boolean,
		required: true,
    },
    comments: [{username: {type: String,
                           required: true},
                date: {type:String, default: Date.now},
                content: {
                    type: String,
                    required: true,
                    minlength: 1,
                    trim: true
                }}],
		upvotes: {type: Number, required: true},
		downvotes: {type: Number, required: true},
		upvoters: [{type:String, required:true}],
		downvoters: [{type:String, required:true}],
		date: {type: String, required:true},
		movie_id: {type: Number, required: true},
})

module.exports = { Reviews }
