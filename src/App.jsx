// src/App.jsx
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Create a mini loading component for nested routes
const NestedLoading = () => (
  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-3 text-gray-400">Loading content...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<NestedLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;