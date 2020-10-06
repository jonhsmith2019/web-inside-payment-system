/**
 *
 * Statistics system
 *
 */

import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Card } from 'antd';
// import moment from 'moment';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import ChartData from './components/ChartData';
import FilterData from './components/FilterData';
import { SOCKET_GET_STATISTICS_SYSTEM } from './constants';

// const dateFormat = 'DD/MM/YYYY';
// const defaultFilter = {
//   fromDate: '',
//   toDate: '',
// };
// const defaultFilter = {
//   fromDate: moment()
//     .subtract(7, 'd')
//     .format(dateFormat),
//   toDate: moment().format(dateFormat),
// };

const eData = {
  tongNap: 0,
  luotNap: 0,
  tongRut: 0,
  luotRut: 0,
  tongHoan: 0,
  luotHoan: 0,
  doanhThu: 0,
  tongTon: 0,
};

export function StatisticsSystem() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(eData);
  // const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    // fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    console.log('query:', fiterData);
    await socket.emit(SOCKET_GET_STATISTICS_SYSTEM, { data: fiterData });
    await socket.on(SOCKET_GET_STATISTICS_SYSTEM, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_STATISTICS_SYSTEM', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  const onSubmitFilter = values => {
    setLoading(true);
    // setFilterData(values);
    fetchData(values);
  };

  return (
    <div>
      <Helmet>
        <title>Statistics System</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Statistics System"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <FilterData onSubmitFilter={onSubmitFilter} />
      </div>

      <div style={{ margin: '20px auto' }}>
        <Card title="Biểu đồ">
          <ChartData data={data} />
        </Card>
      </div>

      <div style={{ margin: '20px auto' }}>
        <Card title="Thống kê">
          <TableData loading={loading} data={data} />
        </Card>
      </div>
    </div>
  );
}

export default StatisticsSystem;
