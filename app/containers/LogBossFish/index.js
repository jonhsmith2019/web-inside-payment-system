import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import _get from 'lodash/get';
import { PageHeader } from 'antd';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import FilterData from './components/FilterData';
import { SOCKET_GET_BOSS_LOG } from './constants';
const dateFormat = 'DD/MM/YYYY HH:mm:ss';
const defaultFilter = {
  username: '',
  type: '0',
  // fromDate: moment()
  //   .subtract(30, 'd')
  //   .format(dateFormat),
  fromDate: moment().format(dateFormat),
  toDate: moment().format(dateFormat),
  page: 0,
  size: 20,
};

export function LogBossFish() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    // fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_BOSS_LOG, { data: fiterData });
    await socket.on(SOCKET_GET_BOSS_LOG, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_BOSS_LOG', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  const onSubmitFilter = values => {
    setLoading(true);
    const newFilter = {
      ...values,
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
    delete newFilter.dateRange;
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
        <title>Log Cá Boss</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Log Cá Boss"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <FilterData onSubmitFilter={onSubmitFilter} />
      </div>

      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data}
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

export default LogBossFish;
