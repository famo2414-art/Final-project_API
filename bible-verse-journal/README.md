## 📖 Bible Verse Journal — Final Full-Stack Project

### 🧩 Overview  
This project is a full-stack web application that allows users to **fetch, save, and manage Bible verses**, with support for personal reflections and search history.  
It demonstrates **frontend–backend integration**, **CRUD operations**, and a **modern responsive UI** built with React and TailwindCSS.

---

### ⚙️ Features
✅ Fetch random or specific Bible verses using the NET Bible API  
✅ Search and view verses dynamically  
✅ Save verses with personal notes  
✅ Edit or delete saved reflections (CRUD)  
✅ View search history with timestamps  
✅ Mobile-friendly dark mode interface  

---

### 🛠️ Tech Stack
**Frontend:** React (Vite), Tailwind CSS  
**Backend:** Node.js, Express.js  
**Storage:** JSON files (`verses.json`, `history.json`)  
**API:** NET Bible API  

---

### 🧾 Directory Structure
\`\`\`
bible-verse-journal/
├── server/
│   ├── server.js
│   ├── verses.json
│   ├── history.json
├── src/
│   ├── components/
│   │   ├── VerseCard.jsx
│   │   ├── VerseForm.jsx
│   │   ├── SearchHistory.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── api.js
│   ├── index.css
├── public/
│   ├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
\`\`\`

---

### 🧠 How to Run Locally

#### 🖥️ Backend (Express API)
\`\`\`bash
cd server
npm install
node server.js
\`\`\`
The backend runs on:  
👉 http://localhost:3000

#### 💻 Frontend (React)
Open a new terminal:
\`\`\`bash
cd ..
npm install
npm run dev
\`\`\`
The frontend runs on:  
👉 http://localhost:5173

---

### 🔄 CRUD Demonstration
| Action | Endpoint | Description |
|--------|-----------|-------------|
| **Create** | \`POST /api/verses\` | Save a new verse and note |
| **Read** | \`GET /api/verses\` | View all saved verses |
| **Update** | \`PUT /api/verses/:id\` | Update a verse note |
| **Delete** | \`DELETE /api/verses/:id\` | Remove a verse from storage |

---

### 🧪 Testing Notes
- Ensure both servers are running (backend and frontend).  
- All data persists locally in JSON files (\`verses.json\`, \`history.json\`).  
- Try fetching a verse (e.g., John 3:16), saving it, editing the note, deleting, and viewing search history.

---

### 👤 Author
**Mohammed Faiz**  
📍 Concordia University Wisconsin — *CSC 6210 Final Project (Full Stack Development)*  
GitHub: [famo2414-art](https://github.com/famo2414-art)
