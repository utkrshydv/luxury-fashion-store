import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartDrawer from "./components/Cart/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/Home";
import Collection from "./pages/Collection/Collection";
import Product from "./pages/Product/Product";
import SearchPage from "./pages/SearchPage/SearchPage";
import CartPage from "./pages/CartPage/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/NotFound/NotFound";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/"                     element={<Home />} />
          <Route path="/collection"           element={<Collection />} />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/product/:id"          element={<Product />} />
          <Route path="/search"               element={<SearchPage />} />
          <Route path="/cart"                 element={<CartPage />} />
          <Route path="/checkout"             element={<Checkout />} />
          <Route path="/orders"               element={<Orders />} />
          <Route path="*"                     element={<NotFound />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
