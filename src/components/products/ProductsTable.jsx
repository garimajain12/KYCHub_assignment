import { Button, Table, Grid } from "antd";
import React from "react";

const { useBreakpoint } = Grid;

const ProductsTable = ({
  data,
  comparableProducts,
  onCompareProduct,
  currentPage,
  pageSize,
}) => {
  const screens = useBreakpoint();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 500,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      width: 130,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => (
        <img
          src={text}
          alt="product_image"
          className="w-[50px] h-[50px] object-contain rounded"
        />
      ),
    },
    {
      title: "Compare",
      key: "compareProducts",
      render: (text, record) => (
        <Button
          disabled={comparableProducts?.find((item) => item?.id === record?.id)}
          type="primary"
          onClick={() => onCompareProduct(record)}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto mt-2">
      <Table
        bordered
        columns={columns}
        dataSource={data?.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={false}
        scroll={{ x: screens.lg ? 500 : "max-content", y: !screens.lg ? 600 : "max-content" }}
      />
    </div>
  );
};

export default ProductsTable; 