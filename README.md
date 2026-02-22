
<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=40&duration=3000&pause=1000&color=1A73E8&center=true&vCenter=true&width=600&height=80&lines=FAKE+MAILED;GOOGLE+SECURITY+SIMULATOR;PHISHING+TEST+TOOL" alt="Typing SVG" />
  
  <p align="center">
    <img src="https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge&logo=google&logoColor=white&color=1A73E8">
    <img src="https://img.shields.io/badge/node-18%2B-green?style=for-the-badge&logo=node.js&logoColor=white&color=34A853">
    <img src="https://img.shields.io/badge/license-MIT-red?style=for-the-badge&logo=opensource&logoColor=white&color=EA4335">
    <img src="https://img.shields.io/badge/PRs-welcome-orange?style=for-the-badge&logo=github&logoColor=white&color=FBBC04">
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/stars/Crazynotdev/fake-mailed?style=social">
    <img src="https://img.shields.io/github/forks/Crazynotdev/fake-mailed?style=social">
    <img src="https://img.shields.io/github/watchers/Crazynotdev/fake-mailed?style=social">
  </p>

  <br>
  
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br>

<p align="center">
  <img src="https://profile-counter.glitch.me/Crazynotdev-fake-mailed/count.svg" alt="Visitor Count">
</p>

# 📧 FAKE MAILED - Google Security Notification Simulator

<div align="center">
  <img src="https://media.giphy.com/media/3o7abB06u9bNzA8LC8/giphy.gif" width="200" style="border-radius: 20px;">
  <br>
  <strong>⚠️ PROJET ÉDUCATIF - PENTESTING ÉTHIQUE UNIQUEMENT ⚠️</strong>
</div>

<br>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=Crazynotdev&repo=fake-mailed&theme=gotham&show_owner=true&hide_border=true" width="49%">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Crazynotdev&repo=fake-mailed&layout=compact&theme=gotham&hide_border=true" width="49%">
</div>

## 🌟 **Aperçu Époustouflant**

> 🎯 **Créez des notifications de sécurité Google 100% authentiques pour vos tests de sensibilisation**

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://media.giphy.com/media/l0MYt5jH6gkTWm8qo/giphy.gif" width="300"><br>
        <sub>✨ Interface de notification</sub>
      </td>
      <td align="center">
        <img src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif" width="300"><br>
        <sub>📨 Email reçu</sub>
      </td>
    </tr>
  </table>
</div>

## ✨ **Caractéristiques Révolutionnaires**

<div align="center">
  
| 🚀 | Fonctionnalité | Description |
|:--:|:--:|:--|
| ✅ | **Design Pixel Perfect** | Copie conforme des notifications Google |
| 🎨 | **Templates Dynamiques** | Personnalisation en temps réel |
| 📧 | **Intégration Email** | Envoi via Gmail avec Nodemailer |
| 🛡️ | **Validation Express** | Sécurisation des entrées utilisateur |
| 🔒 | **Stockage JSON** | Sauvegarde locale des données |
| 🌐 | **Interface Web** | Page d'accueil stylisée |

</div>

## 🎯 **Démo en Direct**

<div align="center">
  <img src="https://github.com/ultralytics/ultralytics/assets/128020378/7d6b6a64-f5e6-4d9f-a601-5c2c3c2036d6" width="600">
</div>

## 🚀 **Installation Express**

### 📋 Prérequis
```bash
✔ Node.js ≥ 18.x
✔ npm ≥ 9.x
✔ Compte Gmail (avec App Password)
```

⚡ Installation 1-2-3

```bash
# 1. Clone le projet
git clone https://github.com/Crazynotdev/fake-mailed.git

# 2. Entre dans le dossier
cd fake-mailed

# 3. Installe les dépendances
npm install

# 4. Configure les variables
cp .env.example .env
```

🔧 Configuration

```env
# .env - Configure avec tes identifiants
EMAIL_USER=ton.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # App Password Gmail
PORT=3000
```

🎮 Lancement

<div align="center">
  <img src="https://media.giphy.com/media/3o7btXkbsV26UXU3Je/giphy.gif" width="200">
</div>```bash
# Mode développement
npm run dev

# Mode production
npm start
```

```
🎉 Serveur démarré sur http://localhost:3000
📧 Endpoint API: POST http://localhost:3000/send-notification
```

📬 Utilisation API

```bash
curl -X POST http://localhost:3000/send-notification \
  -H "Content-Type: application/json" \
  -d '{"toEmail": "cible@example.com"}'
```

📦 Réponse attendue

```json
{
  "success": true,
  "message": "Notification envoyée avec succès"
}
```

📂 Architecture du Projet

```
📦 fake-mailed
├── 📁 public/
│   ├── 📄 index.html          # Landing page
│   └── 📄 notification.html    # Template email
├── 📄 server.js                # Serveur principal
├── 📄 data.json                # Stockage utilisateurs
├── 📄 .env                     # Variables d'environnement
├── 📄 package.json             # Dépendances
└── 📄 README.md                # Documentation
```

🛠️ Stack Technique

<div align="center">https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white
https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=gmail&logoColor=white
https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

</div>📊 Statistiques du Projet

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=Crazynotdev&repo=fake-mailed&theme=github-compact&hide_border=true" width="100%">
</div>🤝 Comment Contribuer

<div align="center">
  <img src="https://media.giphy.com/media/Ll22OhMLAlVDb8UQWe/giphy.gif" width="200">
</div>1. Fork le projet
2. Crée ta branche (git checkout -b feature/AmazingFeature)
3. Commit tes changements (git commit -m 'Add some AmazingFeature')
4. Push (git push origin feature/AmazingFeature)
5. Ouvre une Pull Request

📈 Roadmap

· Version basique avec emails
· Templates HTML Google-like
· 📱 Version mobile responsive
· 🌍 Support multilingue
· 🔐 2FA simulation
· 📊 Dashboard admin

🏆 Crédits

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/Crazynotdev">
          <img src="https://files.catbox.moe/lt4kj6.jpg" width="100px;" style="border-radius: 50%;" alt="Avatar"/><br>
          <sub><b>CRAZY DEV</b></sub>
        </a><br>
        <sub>Créateur & Lead Developer</sub>
      </td>
    </tr>
  </table>
</div>📝 License

<div align="center">MIT License | Copyright © 2026 CRAZY DEV TECHIGW

</div>---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer&fontSize=20&animation=twinkling&desc=Made%20with%20❤️%20by%20CRAZY%20DEV%20TECHIGW" width="100%"><p>
    <a href="mailto:techigw@gmail.com">
      <img src="https://img.shields.io/badge/Contact%20Me-techigw%40gmail.com-blue?style=social&logo=gmail">
    </a>
    <a href="https://github.com/Crazynotdev/fake-mailed">
      <img src="https://img.shields.io/github/stars/Crazynotdev/fake-mailed?style=social">
    </a>
  </p><p>
    <img src="https://komarev.com/ghpvc/?username=Crazynotdev&repo=fake-mailed&color=blue&style=flat-square&label=PROJECT+VIEWS">
  </p><img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%"><sub>⚠️ Avertissement : Ce projet est uniquement destiné à des fins éducatives et de test de sécurité. L'utilisation abusive peut violer les lois sur la confidentialité et la sécurité informatique.</sub>

</div>
