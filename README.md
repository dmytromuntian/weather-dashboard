# User Weather Dashboard 🌦️

A technical assessment project demonstrating advanced React patterns, asynchronous state management, and data merging from multiple APIs.

## 🚀 Live Demo
[Vercel link: https://weather-dashboard-sigma-inky.vercel.app/]

## 📋 Features

- **Data Merging:** Fetches users from *RandomUser API* and seamlessly merges them with real-time weather data from *Open-Meteo API* based on geolocation.
- **State Management (Redux Toolkit):** - Uses `createAsyncThunk` for parallel data fetching (`Promise.all`).
  - Implements a strictly typed store structure.
- **Persistence:** Custom local storage middleware ensures data persists through page refreshes (offline-ready UX).
- **Robust Error Handling:** User-friendly error UI for network failures and edge cases.
- **Routing:** SPA navigation with React Router (List View & Detailed Forecast View).
- **Responsive Design:** Fully responsive grid layout using Tailwind CSS.

## 🛠 Tech Stack

- **Core:** React 18, TypeScript, Vite
- **State:** Redux Toolkit, React-Redux
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Routing:** React Router DOM v6

## 🏗 Architecture Decisions

### 1. Data Fetching Strategy
To avoid the "N+1" request problem in components, data fetching is centralized in a Redux Thunk (`fetchUsersAndWeather`). It fetches users first, then immediately maps over coordinates to fetch weather data in parallel, dispatching a single merged payload to the store.

### 2. TypeScript & VerbatimModuleSyntax
The project adheres to strict TypeScript configurations, utilizing `import type` for better tree-shaking and compiler performance.

### 3. Store Persistence
Instead of forcing a re-fetch on every page reload (which would lose the specific random users generated), the application hydrates the Redux store from `localStorage`.

## 📦 Installation

1. Clone the repository:

   git clone <https://github.com/dmytromuntian/weather-dashboard>

2. Install dependencies:

   npm install

3. Run the development server:

   npm run dev