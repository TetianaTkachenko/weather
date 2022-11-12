import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes'
import Header from './components/Header/Header';
import { CurrentCityProvider } from './components/context';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  )
}
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CurrentCityProvider>
      <App />
    </CurrentCityProvider>
  </StrictMode>
);
