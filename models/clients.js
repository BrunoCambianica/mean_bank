const mongoose = require('mongoose');

const ClientShema = mongoose.Schema(
{
    nom:
    {
        type: String,
        required: true
    },
    prenom:
    {
        type: String,
        required: true
    },
    solde:
    {
        type: Number,
        required: true
    },
    mouvements: [Number]
});

const Client = module.exports = mongoose.model('Client', ClientShema);

 