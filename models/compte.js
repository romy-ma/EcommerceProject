const mongoose = require('mongoose')

const compteSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const Compte = mongoose.model('Compte', compteSchema);

module.exports = Compte

