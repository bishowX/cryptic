import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import PortfolioProvider from "context/PortfolioContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Component {...pageProps} />
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default MyApp;
