const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Pole tytul jest wymagane']
    },
    description: {
        type: String,
        required: [true, 'Pole opis jest wymagane']
    },
    created: {
        type: Date,
        default: Date.now("<Y-m-dTH:M:s>")
    },
});

module.exports = mongoose.model('News', newsSchema);