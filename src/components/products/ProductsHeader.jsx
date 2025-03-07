import React from "react";
import { Pagination } from "antd";
import SearchBar from "../SearchBar";

const ProductsHeader = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onSearch,
}) => {
  return (
    <div className="sticky top-0 bg-white z-10 p-4 flex flex-col items-center justify-center lg:flex-row lg:justify-between gap-4">
      <SearchBar onSearch={onSearch} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ProductsHeader; 