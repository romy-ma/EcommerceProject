const jwt = require('jsonwebtoken')
const Product = require('../models/product')
const Cart = require('../models/cart') 
const express = require('express')




exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Ajouter un produit au panier
exports.addcart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Produit non trouvé" });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        // Vérifier si le produit existe déjà dans le panier
        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Produit ajouté au panier avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Afficher le panier de l'utilisateur
exports.display = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: "Panier non trouvé" });
        res.json(cart.items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour la quantité d'un produit dans le panier
exports.maj = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: "Panier non trouvé" });

        const item = cart.items.find(item => item.productId === productId);
        if (!item) return res.status(404).json({ message: "Produit non trouvé dans le panier" });

        item.quantity = quantity;
        await cart.save();
        res.json({ message: "Quantité du produit mise à jour avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer un produit du panier
exports.delete =  async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: "Panier non trouvé" });

        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();
        res.json({ message: "Produit supprimé du panier avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};