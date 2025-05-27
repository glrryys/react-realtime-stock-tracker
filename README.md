<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# react-realtime-stock-tracker
"Single-page React app that polls Finnhub’s API to display live stock quotes with start/refresh button, built with hooks and vanilla CSS." - simple definition 
# React Realtime Stock Tracker

---

## What it does

- You enter a stock symbol (like AAPL) and a refresh interval (minutes + seconds).  
- Click **START** to begin polling Finnhub every interval and append new rows to the table.  
- Click **REFRESH** to clear the table and fetch one fresh quote.

---

## How it’s built

- **React + Vite** for super-fast dev setup  
- **Hooks** (`useState`, `useEffect`, `useRef`) for state and timers  
- **Fetch API** to get data from `https://finnhub.io/api/v1/quote`  
- **.env** file for storing your private Finnhub API key  
- Simple **CSS** (no frameworks) for styling the inputs, buttons, and table

---

## Getting started

1. Clone this repo  
   ```bash
   git clone https://github.com/glrryys/react-realtime-stock-tracker.git
   cd react-realtime-stock-tracker
>>>>>>> e54b7048cd80c4b45a2c410479bf8a6b089ea581
