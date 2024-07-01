import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import store from "./store";
import { Provider } from "react-redux";
import AppRoutes from "./hocs/routes/Routes";

function App() {
  return (
    <HelmetProvider>

    <Helmet>
      <title>Dashboard</title>
      <meta name="description" content="Boomslag is a creative agency that specializes in branding, web design, and marketing." />
      <meta name="keywords" content="marketing, branding, web design, creative agency" />
      <meta name="author" content="Boomslag" />
      <meta name="publisher" content="Boomslag" /> 
      <meta name="robots" content="all" />
      <link rel="canonical" href="https://boomslag.com" />

      {/* Social Media Tags */}
      <meta property="og:title" content="Boomslag | Marketing Agency" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://boomslag.com" />
      <meta property="og:image" content="https://boomslag.com/images/boomslag-logo.png" />
      <meta property="og:description" content="Boomslag is a creative agency that specializes in branding, web design, and marketing." />
      <meta property="og:site_name" content="Boomslag" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@boomslag" />
      <meta name="twitter:title" content="Boomslag | Marketing Agency" />
      <meta name="twitter:description" content="Boomslag is a creative agency that specializes in branding, web design, and marketing." />
      <meta name="twitter:image" content="https://boomslag.com/images/boomslag-logo.png" />
    </Helmet>

    <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
    </Provider>
    </HelmetProvider>
  );
}

export default App;
