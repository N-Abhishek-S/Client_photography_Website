import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Route,Routes } from 'react-router'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './components/HomePage.jsx'
import CourseSalesPage from './components/CourseSalesPage.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Services from './components/Services.jsx'
import Owner3DPortfolio from './components/Owner3DPortfolio.jsx'


createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Root route that renders App; child routes are RELATIVE (no leading slash) */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />           {/* renders at / */}
          <Route path="header" element={<Header />} />    {/* renders at /header */}
          <Route path="footer" element={<Footer />} />    {/* renders at /footer */}
          <Route path="coursespage" element={<CourseSalesPage />} /> {/* /coursespage */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
                    <Route path="owner3DPortfolio" element={<Owner3DPortfolio />} />


        </Route>
        {/* optional: catch-all 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
