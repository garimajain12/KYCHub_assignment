import "antd/dist/reset.css";
import "./App.css";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage";
import CompareProducts from "./pages/CompareProducts";
import { ProductsContextProvider } from "./context/ProductsContext";
import PageNotFound from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <div>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/productdetails" element={<ProductsPage />} />
            <Route path="/compareProducts" element={<CompareProducts />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
