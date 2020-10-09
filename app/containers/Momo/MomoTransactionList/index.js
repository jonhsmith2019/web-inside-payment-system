import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { PageHeader } from 'antd';
import _get from 'lodash/get';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import FilterData from './components/FilterData';
import {
  SOCKET_GET_MOMO_TRANSACTION_LIST,
  SOCKET_GET_ACCOUNT_LIST,
} from './constants';
const dateFormat = 'DD/MM/YYYY HH:mm:ss';

const defaultFilter = {
  accountId: null,
  keyword: '',
  // fromDate: '13/09/2020 00:00:00',
  // toDate: '13/12/2020 23:59:59',
  fromDate: moment()
    .subtract(7, 'd')
    .startOf('day')
    .format(dateFormat),
  toDate: moment()
    .endOf('day')
    .format(dateFormat),
  page: 0,
  size: 20,
};

export function MomoTransactionList() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);
  const [filter, setFilterData] = useState(defaultFilter);
  const [data, setData] = useState({});
  const [accounts, setDataAccounts] = useState([]);

  useEffect(() => {
    getAccounts({
      page: 0,
      size: 100,
    });
    getData(filter);
  }, []);

  const getAccounts = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_ACCOUNT_LIST, { data: fiterData });
    await socket.on(SOCKET_GET_ACCOUNT_LIST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        setDataAccounts(resParsed.data?.content);
      } else {
        setDataAccounts([]);
      }
    });
  };

  const getData = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_MOMO_TRANSACTION_LIST, { data: fiterData });
    await socket
      .off(SOCKET_GET_MOMO_TRANSACTION_LIST)
      .on(SOCKET_GET_MOMO_TRANSACTION_LIST, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          console.log('SOCKET_GET_MOMO_TRANSACTION_LIST', resParsed.data);
          setData(resParsed.data || []);
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

  const handleSubmitFilter = values => {
    setLoading(true);
    const newFilter = {
      ...filter,
      ...values,
      fromDate: values?.dateRange
        ? values.dateRange[0].startOf('day').format(dateFormat)
        : null,
      toDate: values?.dateRange
        ? values.dateRange[1].endOf('day').format(dateFormat)
        : null,
    };
    // console.log('query:', newFilter);
    getData(newFilter);
  };

  return (
    <div>
      <Helmet>
        <title>Momo Transaction List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Momo Transaction List"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <FilterData accounts={accounts} onSubmitFilter={handleSubmitFilter} />
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

export default MomoTransactionList;
