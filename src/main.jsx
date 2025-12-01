import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
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
          {/* App component should contain Header, Footer and Outlet */}
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CourseSalesPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
<Route path="portfolio" element={<Owner3DPortfolio />} /> 
<Route path="booknow" element={<BookNow />} /> 
            {/* Remove header and footer routes - they're part of App layout */}
          </Route>
          {/* Optional: catch-all 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </HashRouter>
  </StrictMode>
);