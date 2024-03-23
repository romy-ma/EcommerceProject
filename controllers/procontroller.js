const Product = require('../models/product')
const jwt = require('jsonwebtoken')
const express = require('express')

// ajouter un produit 
//1er arg
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

//2eme arg
exports.add =async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const product = new Product({ name, description, price, image });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

