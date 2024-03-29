const express = require('express')
const User = require('../models/compte')
const jwt = require('jsonwebtoken');
const Order = require('../routes/orderroutes');
const Compte = require('../models/compte');
const { compare } = require('bcrypt');




// Middleware d'authentification JWT
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;// on met les info dans req.user
        next();
    });
}
// err, user) => { ... } : C'est une fonction de rappel qui sera appelée une 
//fois que la vérification du jeton sera terminée. Si une erreur se produit pendant
// la vérification, err contiendra l'erreur, sinon user contiendra les données utilisateur extraites du jeton JWT.



// Obtenir les informations du profil utilisateur 
//////////////////////////////////////////////////here we have get with ( authentucatetoken , fct )
exports.getInfo=  async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Compte.findById(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
 
// Mettre à jour les informations du profil utilisateur 
/////////////////////////////////////////////////// we have put ( path . auth. fct)
exports.majInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;
        const user = await Compte.findByIdAndUpdate(userId, { username, email }, { new: true });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json({ message: "Informations du profil mises à jour avec succès", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Changer le mot de passe de l'utilisateur
///////////////////// with put ( path aut , fct)
exports.changePwd =async (req, res) => {
    try {
        const userId = req.user.id;
        const { newPassword } = req.body;
        const user = await Compte.findById(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        
        user.password = newPassword;
        await user.save();

        res.json({ message: "Mot de passe changé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir l'historique des commandes de l'utilisateur
//////////////// with get aut fct
exports.history = async (req, res) => {
    try {
        const userId = req.user.id;
        // Supposons qu'il existe un modèle 'Order' pour les commandes avec une propriété 'userId' pour l'identifiant de l'utilisateur
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Suivre le statut d'une commande
///////////////////////// with get aut fct
exports.status = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.orderId;
        // Supposons qu'il existe un modèle 'Order' pour les commandes avec une propriété 'userId' pour l'identifiant de l'utilisateur
        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) return res.status(404).json({ message: "Commande non trouvée" });
        res.json({ status: order.status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
