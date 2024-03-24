const User = require('../models/user')
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//||||||||||first method |||||||||

exports.signup = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
}

  //||||||| second method ||||||||
  exports.login =  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }
      const token = jwt.sign({ username: user.username }, 'secret');
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  }

  //||||||| third method |||||||
  exports.authentification = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'Token non fourni' });
  
    jwt.verify(token, 'secret', (err, user) => {
      if (err) return res.status(403).json({ error: 'Token invalide' });
      req.user = user;
      next();
    });
  }

  exports.withauthentif = (req, res) => {
    res.json({ message: 'Route protégée' });
  }