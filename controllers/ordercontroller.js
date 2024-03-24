const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Module pour l'envoi de courriels
const Order = require('../models/oder')


// Fonction pour envoyer un courriel de confirmation
function sendConfirmationEmail(userId, order) {
    // Configurer le transporteur de courriel (SMTP)
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: 'user@example.com',
            pass: 'password'
        }
    });

    // Configurer le contenu du courriel
    const mailOptions = {
        from: 'Your Name <user@example.com>',
        to: 'user@example.com',
        subject: 'Confirmation de commande',
        text: `Votre commande a été passée avec succès. Voici les détails de votre commande : ${order}`,
        html: `<p>Votre commande a été passée avec succès. Voici les détails de votre commande : ${order}</p>`
    };

    // Envoyer le courriel
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Erreur lors de l\'envoi du courriel de confirmation : ', err);
        } else {
            console.log('Courriel de confirmation envoyé avec succès : ', info.response);
        }
    });
}

// Route pour passer une commande
exports.order = async (req, res) => {
    try {
        const { userId, products, shippingDetails, totalPrice } = req.body;

        // Créer une nouvelle commande
        const order = new Order({
            userId,
            products,
            shippingDetails,
            totalPrice
        });
        await order.save();

        // Envoyer un courriel de confirmation
        sendConfirmationEmail(userId, order);

        res.status(201).json({ message: "Commande passée avec succès", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};