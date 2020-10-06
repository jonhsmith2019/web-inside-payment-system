import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Button, Popconfirm, message } from 'antd';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import {
  SOCKET_GET_MAINTAIN_LIST,
  SOCKET_UPDATE_MAINTAIN,
  SOCKET_UPDATE_MAINTAIN_ALL,
} from './constants';

const defaultFilter = {
  page: 0,
  size: 20,
};

export function MaintainList() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter] = useState(defaultFilter);

  useEffect(() => {
    fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_MAINTAIN_LIST, { data: fiterData });
    await socket.on(SOCKET_GET_MAINTAIN_LIST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_MAINTAIN_LIST', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  const updateData = async newData => {
    setLoading(true);
    await socket.emit(SOCKET_UPDATE_MAINTAIN, { data: newData });
    await socket.on(SOCKET_UPDATE_MAINTAIN, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        message.success('Cập nhật thành công');
        fetchData(filter);
      } else {
        message.error('Có lỗi xảy ra, xin vui lòng thử lại');
      }
    });
  };

  const handleRowClick = record => {
    const req = {
      roomId: record.roomId,
      roomKind: record.roomKind,
      enable: record.enable === 1 ? 0 : 1,
    };
    updateData(req);
  };

  const handleMaintainAll = async () => {
    await socket.emit(SOCKET_UPDATE_MAINTAIN_ALL, { data: {} });
    await socket.on(SOCKET_UPDATE_MAINTAIN_ALL, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        message.success('Cập nhật thành công');
        fetchData(filter);
      } else {
        message.error('Có lỗi xảy ra, xin vui lòng thử lại');
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Maintain List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Maintain List"
          extra={[
            <Popconfirm
              key="1"
              title="Bạn chắc muốn maintain all?"
              onConfirm={() => handleMaintainAll()}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Maintain All
              </Button>
            </Popconfirm>,
          ]}
        />
      </div>

      <div style={{ margin: '20px auto' }}>
        <TableData loading={loading} data={data} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}

export default MaintainList;
