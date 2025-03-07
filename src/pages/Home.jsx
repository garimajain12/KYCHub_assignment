import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Button, message, Grid, Drawer } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import Logo from "../assets/logos/logo";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { comparableProducts } = useContext(ProductsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    navigate("/productdetails");
  }, []);

  const handleNavigation = () => {
    if (comparableProducts?.length >= 2) {
      navigate("/compareProducts");
      setDrawerVisible(false); // Close drawer after navigation
    } else {
      messageApi.error("Please select at least 2 products for comparison.");
    }
  };

  const menuItems = [
    {
      key: "productdetails",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/productdetails">Product Details</Link>,
    },
    {
      key: "compareProducts",
      icon: <BarChartOutlined />,
      label: "Compare Products",
      onClick: handleNavigation,
    },
  ];

  return (
    <Layout className="min-h-screen">
      {contextHolder}

      {screens.lg ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
          className="shadow-lg border-r border-gray-200 min-h-screen"
        >
          <div className="h-12 m-4 flex items-center justify-center">
            <Logo />
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname.slice(1)]}
            items={menuItems}
            className="border-none"
          />
        </Sider>
      ) : (
        <Drawer
          title={<Logo />}
          placement="left"
          closable
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname.slice(1)]}
            items={menuItems}
            className="border-none"
          />
        </Drawer>
      )}

      <Layout>
        <Header
          style={{ backgroundColor: "white" }}
          className="p-0 flex items-center justify-between shadow-lg border-b border-gray-200"
        >
          <Button
            type="text"
            icon={screens.lg ? (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />) : <MenuUnfoldOutlined />}
            onClick={() => {
              if (screens.lg) {
                setCollapsed(!collapsed);
              } else {
                setDrawerVisible(true);
              }
            }}
            className="bg-gray-100 text-gray-600"
          />
          {!screens.xs && (
            <Button type="text" icon={<UserOutlined />} className="bg-gray-100 text-gray-600" />
          )}
        </Header>
        <Content className="flex-1 p-4 bg-white rounded-lg overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;