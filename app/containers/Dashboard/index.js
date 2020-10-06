import React from 'react';
import { Helmet } from 'react-helmet';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
export function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div style={{ marginTop: '10vh' }}>
        <Result icon={<SmileOutlined />} title="FInside 2020" />
      </div>
    </div>
  );
}

export default Dashboard;
