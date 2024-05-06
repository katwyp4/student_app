import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Log from "./pages/Log/Log";
import Register from "./pages/Register/Register";
import Menu from "./pages/Menu/Menu";
import Calendar from "./pages/Calendar/Calendar";
import Schedule from "./pages/Schedule/Schedule";
import Chat from "./pages/Chat/Chat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};