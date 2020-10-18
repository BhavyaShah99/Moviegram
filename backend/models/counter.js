const mongoose = require('mongoose')

const Counters = mongoose.model('counters', {
	_id: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    count: {
        type: Number,
        required: true
    }
})

module.exports = { Counters }
