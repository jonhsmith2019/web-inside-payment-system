import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { WebSocketContext } from 'containers/WebSocket';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';
import { PageHeader, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableData from './components/TableData';
// import FilterData from './components/FilterData';

import {
  SOCKET_GET_BROADCAST_LIST,
  SOCKET_DELETE_BROADCAST,
} from './constants';

const defaultFilter = {
  keyword: '',
  chanelId: '',
  page: 0,
  size: 20,
};

export function Broadcast() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_BROADCAST_LIST, { data: fiterData });
    await socket.on(SOCKET_GET_BROADCAST_LIST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_BROADCAST_LIST', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  const handleDeleteBroadcast = async id => {
    await socket.emit(SOCKET_DELETE_BROADCAST, { data: { id } });
    await socket.on(SOCKET_DELETE_BROADCAST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        message.success('Xoá broadcast thành công');
        fetchData(filter);
      } else {
        message.error('Có lỗi xin vui lòng thử lại');
      }
    });
  };

  // const onSubmitFilter = values => {
  //   setLoading(true);
  //   const newFilter = {
  //     keyword: values?.keyword || null,
  //     chanelId: values?.chanelId,
  //     page: 0,
  //     size: 20,
  //   };
  //   setFilterData(newFilter);
  //   fetchData(newFilter);
  // };

  const handleTableChange = pagination => {
    setLoading(true);
    const newFilter = filter;
    newFilter.page = pagination.current - 1;
    newFilter.size = pagination.pageSize;
    setFilterData(newFilter);
    fetchData(newFilter);
  };

  return (
    <div>
      <Helmet>
        <title>Broadcast List</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Broadcast List"
          extra={[
            <Link
              key="1"
              to="/broadcast/add"
              className="ant-btn ant-btn-primary ant-btn-background-ghost"
            >
              <PlusOutlined style={{ verticalAlign: '1px' }} /> Tạo mới
            </Link>,
          ]}
        />
      </div>
      {/* <div style={{ marginTop: '20px' }}>
        <FilterData onSubmitFilter={onSubmitFilter} />
      </div> */}
      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data.content}
          pagination={{
            current: _get(filter, 'page', 1) + 1,
            pageSize: _get(filter, 'size', 20),
            total: data.totalElements,
          }}
          onTableChange={handleTableChange}
          onDeleteBroadcast={handleDeleteBroadcast}
        />
      </div>
    </div>
  );
}

export default Broadcast;
