# Beyond Vision

## A Proctored Quiz Platform for Visually Impaired Users

Beyond Vision is an accessible web-based proctored quiz platform specially designed for visually impaired users. The platform enables users to independently attempt online quizzes using Text-to-Speech (TTS) and Speech-to-Text (STT) technologies while maintaining examination integrity through browser-based proctoring.

The project combines accessibility-first design, adaptive testing, and secure authentication to provide an inclusive online examination environment.

---

# Technology Stack and Tools Used

## Frontend
- Next.js 14
- React.js
- JavaScript
- Tailwind CSS

## Backend
- Next.js API Routes
- Node.js
- REST APIs

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT Authentication
- HTTP-only Cookies

## Accessibility APIs
- Web Speech API
  - SpeechSynthesis (TTS)
  - SpeechRecognition (STT)

## Additional Tools
- SWR (Data Fetching)

---

# Features and Functionalities Implemented

## Accessibility Features
- Text-to-Speech support for reading questions aloud
- Speech-to-Text support for answering questions via voice
- Keyboard-accessible navigation
- Screen-reader friendly interface
- High-contrast dark mode UI

## Quiz Features
- Role-based authentication (Admin/User)
- Quiz creation and management
- Adaptive difficulty progression system
- Real-time countdown timer
- Automatic quiz submission

## Adaptive Difficulty Engine
- Questions divided into:
  - Easy
  - Medium
  - Hard
- Correct answers increase difficulty level
- Incorrect answers decrease difficulty level

## Proctoring Features
- Fullscreen enforcement
- Tab switch detection
- Window blur detection
- Auto-submit after 3 violations

## Admin Functionalities
- Create and schedule quizzes
- Add questions with difficulty levels
- Monitor participant scores
- Share unique Admin ID

## User Functionalities
- Search quizzes using Admin ID
- Attempt quizzes using voice or clicks
- Receive instant score breakdown

---

# Installation / Execution Steps

## Step 1: Clone the Repository

```bash
git clone <repository-url>
```

## Step 2: Navigate to Project Directory

```bash
cd beyond-vision
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Configure Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 5: Run Development Server

```bash
npm run dev
```

## Step 6: Open Application

Visit:

```bash
http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

# Folder Structure

```bash
beyond-vision/
│
├── app/
│   ├── api/
│   ├── login/
│   ├── register/
│   └── dashboard/
│
├── components/
├── models/
├── public/
├── lib/
├── styles/
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

# Team Members

| Name | Enrollment Number |
|------|-------------------|
| Atharv Khede | EN23CS301219 |
| Atul Raghuwanshi | EN23CS301230 |
| Aviral Pratap Singh | EN23CS301235 |

---
# Project Screenshots / Output

## Login Page
<img width="100%" alt="Login Page" src="C:\Users\athar\OneDrive\Pictures\Screenshots 1\Screenshot 2026-04-19 110334.png" />

## Register Page
<img width="100%" alt="Register Page" src="C:\Users\athar\OneDrive\Pictures\Screenshots 1\Screenshot 2026-05-27 180605.png" />

## Admin Dashboard
<img width="100%" alt="Admin Dashboard" src="C:\Users\athar\OneDrive\Pictures\Screenshots 1\Screenshot 2026-04-19 110403.png" />

## Quiz Interface
<img width="100%" alt="Quiz Interface" src="C:\Users\athar\OneDrive\Pictures\Screenshots 1\Screenshot 2026-04-19 110448.png" />

## Results Page
<img width="100%" alt="Results Page" src="C:\Users\athar\OneDrive\Pictures\Screenshots 1\Screenshot 2026-05-27 182208.png" />

---

# Future Scope

- Multi-language voice support
- Braille display integration
- AI-powered question generation
- Mobile application support
- Advanced AI-based proctoring
- Analytics dashboard

---

# License

This project is developed for academic and educational purposes.
