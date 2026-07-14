# PrepPilot AI

An AI-powered interview preparation platform that analyzes resumes against job descriptions to generate ATS match scores, identify skill gaps, personalized interview questions, learning roadmaps, and ATS-friendly resumes using Google Gemini AI.

## Live Demo

**Live:** https://preppilot-ai-mb.vercel.app

## Features

- AI-powered resume analysis using Google Gemini AI
- ATS compatibility score generation
- Personalized technical interview questions
- Behavioral interview question generation
- Skill gap identification
- 7-day personalized preparation roadmap
- ATS-friendly resume generation in PDF format
- Secure JWT authentication
- Google OAuth integration
- Resume upload and PDF parsing
- Report history management
- Responsive user interface
- Protected routes and role-based access

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google OAuth
- Multer
- Puppeteer

### AI Integration

- Google Gemini AI

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## Screenshots

<img width="950" height="414" alt="Screenshot 2026-07-15 024528" src="https://github.com/user-attachments/assets/34d327e1-03a0-477d-aa04-bce98bc242c4" />

<img width="959" height="413" alt="Screenshot 2026-07-15 024609" src="https://github.com/user-attachments/assets/091672f0-7b5d-4dfc-be0d-90b772b5f1a4" />

<img width="959" height="413" alt="Screenshot 2026-07-15 024622" src="https://github.com/user-attachments/assets/61f330ef-db1e-4d43-be1b-f6a655267036" />

<img width="959" height="414" alt="Screenshot 2026-07-15 024710" src="https://github.com/user-attachments/assets/baa57441-7d37-4756-8f5a-96f1527868c9" />

---

## Project Structure

```text
PrepPilot-AI
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── Backend
│   ├── src
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── models
│   ├── services
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Manthan-Bhegade7781/PrepPilot-AI.git

cd PrepPilot-AI
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

GOOGLE_CLIENT_ID=your_google_client_id

CLIENT_URL=http://localhost:5173
```

Run the backend.

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:3000

VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Run the frontend.

```bash
npm run dev
```

---

## Future Improvements

- AI mock interview simulation
- Company-specific interview preparation
- Resume version history
- Email notifications
- Docker deployment
- Custom domain support
- Analytics dashboard

---

## Known Limitation

This project currently uses HTTP-only cookie authentication.

Since the frontend and backend are deployed on different domains (Vercel and Render), browsers with strict third-party cookie policies (such as Safari on iOS or Chrome with third-party cookies disabled) may prevent authentication from persisting across requests.

In a production environment, this is typically addressed by deploying both services under the same custom domain (for example, `app.example.com` and `api.example.com`) or by adopting an alternative authentication architecture.

---

## Author

**Manthan Bhegade**

GitHub: https://github.com/Manthan-Bhegade7781

LinkedIn: https://www.linkedin.com/in/manthanbhegade

Portfolio: [https://manthan-bhegade7781.github.io/my-portfolio/](https://manthanbhegade-portfolio.vercel.app/)

---

## License

This project is licensed under the MIT License.
