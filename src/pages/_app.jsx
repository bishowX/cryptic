import { AuthProvider } from "../context/AuthContext";
import { PortfolioProvider } from "context/PortfolioContext";
import { CoinProvider } from "context/CoinContext";
import Navbar from "./../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Navbar />
        <CoinProvider>
          <Component {...pageProps} />
        </CoinProvider>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default MyApp;
