import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import moment from 'moment';
import { PageHeader } from 'antd';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import FilterData from './components/FilterData';
import Stats from './components/Stats';

import { SOCKET_GET_MATCH_HISTORY, SOCKET_GET_ROOM_LIST } from './constants';

const dateFormat = 'DD/MM/YYYY HH:mm:ss';
const defaultFilter = {
  keyword: '',
  roomKind: '0',
  fromDate: moment()
    .subtract(7, 'd')
    .format(dateFormat),
  toDate: moment().format(dateFormat),
  page: 0,
  size: 20,
};

export function MatchHistory() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [rooms, setDataRoom] = useState([]);
  const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    // fetchData(filter);
    fetchRoomList();
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_MATCH_HISTORY, { data: fiterData });
    await socket.on(SOCKET_GET_MATCH_HISTORY, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_MATCH_HISTORY', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  const fetchRoomList = async () => {
    await socket.emit(SOCKET_GET_ROOM_LIST, { data: {} });
    await socket.on(SOCKET_GET_ROOM_LIST, res => {
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        setDataRoom(resParsed.data);
      }
    });
  };

  const onSubmitFilter = values => {
    setLoading(true);
    const newFilter = {
      keyword: values?.keyword || '',
      roomKind: values?.roomKind,
      fromDate: values?.dateRange
        ? values.dateRange[0].startOf('day').format(dateFormat)
        : null,
      toDate: values?.dateRange
        ? values.dateRange[1].endOf('day').format(dateFormat)
        : null,
      page: 0,
      size: 20,
    };
    console.log('query:', newFilter);
    setFilterData(newFilter);
    fetchData(newFilter);
  };

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
        <title>Match History</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Match History"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <FilterData rooms={rooms} onSubmitFilter={onSubmitFilter} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <Stats
          trietTieu={data.trietTieu}
          tongVao={data.tongVao}
          tongRa={data.tongRa}
        />
      </div>

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
        />
      </div>
    </div>
  );
}

export default MatchHistory;
