import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// Finnhub key → .env at project root
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export default function App() {
  const [symbol, setSymbol]   = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [rows, setRows]       = useState([]);
  const timerRef              = useRef(null);

  // ----------- Fetch helper (replace or append) ------------
  const fetchQuote = async (sym, { silent = false, replace = false } = {}) => {
    if (!sym || !API_KEY) {
      if (!silent) alert("API key missing or symbol empty");
      return;
    }
    try {
      const url  = `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`;
      const res  = await fetch(url);
      const data = await res.json();
      if (!data || !data.c) {
        if (!silent) alert("Symbol not found – check the ticker");
        return;
      }

            // Use the *moment of fetch* for the timestamp so each row reflects when you polled
      const ts    = new Date();
      const entry = {
        time:      ts.toLocaleString(),
        open:      data.o,
        high:      data.h,
        low:       data.l,
        current:   data.c,
        prevClose: data.pc,
      };

      if (replace) {
        setRows([entry]);
      } else {
        setRows((prev) => [...prev, entry]);
      }
    } catch (err) {
      console.error(err);
      if (!silent) alert("Network error – open console for details");
    }
  };

  const clearTimer = () => timerRef.current && clearInterval(timerRef.current);

  // ---------------- START handler ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const sym = symbol.trim().toUpperCase();
    if (!sym) return;

    clearTimer();
    fetchQuote(sym); // append so the list grows

    const intervalMs = (Number(minutes) * 60 + Number(seconds)) * 1000;
    if (intervalMs > 0) timerRef.current = setInterval(() => fetchQuote(sym, { silent: true }), intervalMs);
  };

  // ---------------- REFRESH = clear + single row ----------------
  const handleRefresh = () => {
    // stop any running interval and wipe the table — no new fetch
    clearTimer();
    setRows([]);
  };

  useEffect(() => () => clearTimer(), []);

  // ---------------- UI ----------------
  return (
    <div className="container light-theme">
      <h1 className="title">Stock Tracker (Finnhub)</h1>
      <form onSubmit={handleSubmit} className="controls">
        <input type="number" placeholder="Min" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        <input type="number" placeholder="Sec" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
        <input className="symbol-input" placeholder="Symbol (e.g. AAPL)" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
        <button className="btn" type="submit">START</button>
        <button type="button" className="btn secondary" onClick={handleRefresh}>REFRESH</button>
      </form>

      {rows.length > 0 && (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Open Price</th><th>High Price</th><th>Low Price</th><th>Current Price</th><th>Previous Close</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>${r.open.toFixed(2)}</td>
                <td>${r.high.toFixed(2)}</td>
                <td>${r.low.toFixed(2)}</td>
                <td>${r.current.toFixed(2)}</td>
                <td>${r.prevClose.toFixed(2)}</td>
                <td>{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}