# 🧙‍♂️ SpicyChat - AI Character Creation Wizard

Create compelling AI characters effortlessly with this full-stack character creation wizard, powered by LLMs, content crawling, and AI-generated avatars.

---

## 🚀 Live Demo

🌐 Not Public For Now

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript
- **AI Services:**
  - [Groq](https://console.groq.com/) (Character Generation)
  - [Exa](https://docs.exa.ai/) (Content Crawling)
  - [Runway](https://runware.ai/) (Avatar Image Generation)
- **Deployment:**
  - Vercel (Frontend)
  - Render (Backend)

---

## ✨ Features

- 🧠 Generate full character profiles from a simple prompt
- 🔍 Optional URL scraping to enhance character depth
- 🎨 Generate AI avatars from character data
- ⚙️ Tailwind-powered UI with responsive design and animated skeleton loaders

---

## 🧪 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/spicychat-character-wizard.git
cd spicychat-character-wizard
```
---

### === Backend Environment Variables ===

#### Groq API key for character generation

GROQ_API_KEY=your_groq_key_here

#### Exa API key for URL content crawling

EXA_API_KEY=your_exa_key_here

#### Runway API key for image generation

RUNWAY_API_KEY=your_runway_key_here

#### MongoDB connection string

MONGO_URI=your_mongodb_uri_here

### === Frontend Environment Variables ===

#### URL of your backend API

VITE_API_URL=your_backend_host_here
