import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';
import { PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import { SOCKET_GET_CARD2MOMO_RATE_LIST } from './constants';

const defaultFilter = {
  page: 0,
  size: 20,
};
export function Card2MomoRateList() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    getData(filter);
  }, []);

  const getData = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_CARD2MOMO_RATE_LIST, { data: fiterData });
    await socket
      .off(SOCKET_GET_CARD2MOMO_RATE_LIST)
      .on(SOCKET_GET_CARD2MOMO_RATE_LIST, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          console.log('SOCKET_GET_CARD2MOMO_RATE_LIST', resParsed.data);
          setData(resParsed.data);
        } else {
          setData([]);
        }
      });
  };

  const handleTableChange = pagination => {
    setLoading(true);
    const newFilter = filter;
    newFilter.page = pagination.current - 1;
    newFilter.size = pagination.pageSize;
    setFilterData(newFilter);
    getData(newFilter);
  };

  return (
    <div>
      <Helmet>
        <title>Card2Momo Rate List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Card2Momo Rate List"
          extra={[
            <Link
              key="1"
              to="/card2momo-rate/add"
              className="ant-btn ant-btn-primary ant-btn-background-ghost"
            >
              <PlusOutlined style={{ verticalAlign: '1px' }} /> Tạo mới
            </Link>,
          ]}
        />
      </div>

      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data.content}
          pagination={{
            current: _get(filter, 'page', 1) + 1,
            pageSize: _get(filter, 'size', 20),
            total: data?.totalElements || 0,
          }}
          onTableChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default Card2MomoRateList;
