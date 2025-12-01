// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import CourseSalesPage from "./components/CourseSalesPage.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Services from "./components/Services.jsx";
import Owner3DPortfolio from "./components/Owner3DPortfolio.jsx";
import BookNow from "./components/BookNow.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        {/* App is the main layout (Header, Footer, Outlet) */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CourseSalesPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Owner3DPortfolio />} />
          <Route path="booknow" element={<BookNow />} />
        </Route>

        {/* Optional: 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </HashRouter>
  </StrictMode>
);
