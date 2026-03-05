# 🎮 Gamers' Hub

A personal game backlog tracker built with React. Search for games, track your progress, discover new titles, and manage your gaming library — all in one place.

---

## 🔗 Live Demo

https://game-backlog-mocha.vercel.app/

---

## 📸 Preview

<img width="1918" height="925" alt="image" src="https://github.com/user-attachments/assets/e9534877-99c9-4e5f-9b4b-60c5230bf3fe" />
<img width="1918" height="917" alt="image" src="https://github.com/user-attachments/assets/df082869-5c43-4ba7-afb9-f8f63e0137b2" />
<img width="1917" height="923" alt="image" src="https://github.com/user-attachments/assets/acdac2f0-f901-4b75-a28c-135f388bf2b0" />

---

## ✨ Features

- **Search & Add Games** — Search the RAWG API and auto-fill game details into your backlog
- **Track Your Backlog** — Organize games by status: Playing, Completed, Paused, Dropped, or Wishlist
- **Edit & Delete** — Update any game's details or remove it with a confirmation modal
- **Filter & Sort** — Filter by status and sort by title or rating
- **Backlog Stats** — See a live summary of your collection including total games, hours played, and average rating
- **Hours Played** — Track how many hours you've spent on each game
- **Star Ratings** — Rate your games from 1 to 5 stars
- **Game of the Day** — A featured game shown daily on the backlog page
- **Discover Page** — Browse popular, highest rated, recently released, upcoming, and indie games
- **Game Details Page** — View full game info and add it directly to your wishlist
- **Persistent Storage** — Your backlog is saved to localStorage and persists across sessions
- **Smooth Animations** — Framer Motion powered transitions and list animations
- **Toast Notifications** — Clean feedback for all user actions
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

- **React** — UI framework
- **React Router** — Client-side routing
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **React Hot Toast** — Toast notifications
- **React Icons** — Icon library
- **RAWG API** — Game data
- **localStorage** — Data persistence
- **Vite** — Build tool

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- A free [RAWG API key](https://rawg.io/apidocs)

### Installation

1. Clone the repository
```bash
git clone https://github.com/mousa897/game-backlog.git
cd gamers-hub
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root of the project and add your RAWG API key
```
VITE_RAWG_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BacklogStats.jsx
│   ├── DisplayContent.jsx
│   ├── GameForm.jsx
│   ├── GameOfTheDay.jsx
│   ├── GameSection.jsx
│   ├── Header.jsx
│   └── SearchBar.jsx
├── context/
│   └── GameContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── pages/
│   ├── Backlog.jsx
│   ├── Discover.jsx
│   └── GameDetails.jsx
└── main.jsx
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_RAWG_API_KEY` | Your RAWG API key from [rawg.io](https://rawg.io/apidocs) |

---

## 🙏 Acknowledgements

- [RAWG API](https://rawg.io) for the game data
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [React Hot Toast](https://react-hot-toast.com)
