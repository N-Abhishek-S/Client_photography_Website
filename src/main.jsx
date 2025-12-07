// src/main.jsx
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// Lazy load components
const App = lazy(() => import("./App.jsx"));
const HomePage = lazy(() => import("./components/HomePage.jsx"));
const CourseSalesPage = lazy(() => import("./components/CourseSalesPage.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Services = lazy(() => import("./components/Services.jsx"));
const Owner3DPortfolio = lazy(() =>
  import("./components/Owner3DPortfolio.jsx")
);
const BookNow = lazy(() => import("./components/BookNow.jsx"));
const PSDFilesPage = lazy(() => import("./components/PSDFilesPage.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CourseSalesPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
            <Route path="portfolio" element={<Owner3DPortfolio />} />
            <Route path="booknow" element={<BookNow />} />
            <Route path="psdfile" element={<PSDFilesPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Suspense>
  </StrictMode>
);
