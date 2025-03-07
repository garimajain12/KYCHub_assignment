import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getProductsDataService } from "../services/productsService";
import Loader from "../components/Loader";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router";
import ProductsHeader from "../components/products/ProductsHeader";
import ProductsTable from "../components/products/ProductsTable";

const PAGE_SIZE = 10;

const ProductsPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    comparableProducts,
    setComparableProducts,
    productsData,
    setProductsData,
  } = useContext(ProductsContext);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const getProductsData = async () => {
    setLoading(true);
    const res = await getProductsDataService();
    if (
      res?.isSuccess &&
      res.status === 200 &&
      res?.data?.products?.length > 0
    ) {
      setProductsData(res?.data?.products);
      setFilteredData(res?.data?.products);
    } else {
      messageApi.error("Error while fetching products, Please try again later");
    }
    setLoading(false);
  };

  const handleCompareProducts = (item) => {
    if (comparableProducts?.length < 4) {
      setComparableProducts((prevArray = []) => {
        const productExist = prevArray.find((obj) => obj?.id === item?.id);
        if (!productExist) {
          return [...prevArray, item];
        }
        return prevArray;
      });
      if (comparableProducts?.length >= 1) {
        navigate("/compareProducts");
      }
    } else {
      messageApi.error("You can only compare 4 products at a time");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = (searchText) => {
    const filteredProduct = productsData?.filter(
      (product) =>
        product?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        product?.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredProduct);
  };

  useEffect(() => {
    if (productsData?.length === 0) getProductsData();
  }, []);

  useEffect(() => {
    if (searchText === "") setFilteredData(productsData);
    else filteredProducts(searchText);
  }, [searchText]);

  return (
    <div className="p-4">
      {contextHolder}
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          <ProductsHeader
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            total={filteredData?.length}
            onPageChange={handlePageChange}
            onSearch={setSearchText}
          />
          <ProductsTable
            data={filteredData}
            comparableProducts={comparableProducts}
            onCompareProduct={handleCompareProducts}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
