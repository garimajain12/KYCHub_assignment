import React from 'react';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ onSearch }) => {
  return (
      <Input
        placeholder="Search products..."
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 200 }}
      />
  );
};

export default SearchBar;