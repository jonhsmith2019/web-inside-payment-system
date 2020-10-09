import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';
import { PageHeader, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import FilterData from './components/FilterData';
import {
  SOCKET_GET_ACCOUNT_SERVICE_LIST,
  SOCKET_GET_ACCOUNT_LIST,
} from './constants';

const defaultFilter = {
  accountId: null,
  page: 0,
  size: 20,
};
export function AccountServiceList(props) {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilterData] = useState(defaultFilter);
  const [accounts, setDataAccounts] = useState([]);

  useEffect(() => {
    const {
      location: { search },
    } = props;
    const querySearch = new URLSearchParams(search);
    const accountId = querySearch.get('accountId');
    getAccounts({
      page: 0,
      size: 100,
    });
    if (accountId) getData({ accountId });
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

    await socket.emit(SOCKET_GET_ACCOUNT_SERVICE_LIST, { data: fiterData });
    await socket
      .off(SOCKET_GET_ACCOUNT_SERVICE_LIST)
      .on(SOCKET_GET_ACCOUNT_SERVICE_LIST, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          console.log('SOCKET_GET_ACCOUNT_SERVICE_LIST', resParsed.data);
          setData(resParsed.data);
        } else {
          setData([]);
        }
      });
  };

  const handleSubmitFilter = values => {
    setLoading(true);
    const newFilter = {
      ...values,
    };
    console.log('query:', newFilter);
    getData(newFilter);
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
        <title>Account Service List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Account Service List"
          extra={[
            <Link
              key="1"
              to="/account-service/add"
              className="ant-btn ant-btn-primary ant-btn-background-ghost"
            >
              <PlusOutlined style={{ verticalAlign: '1px' }} /> Tạo mới
            </Link>,
          ]}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <Row>
          <Col xs={24} md={12} xl={18}>
            <FilterData
              {...props}
              accounts={accounts}
              onSubmitFilter={handleSubmitFilter}
            />
          </Col>
          {/* <Col xs={24} md={12} xl={6}>
            <div style={{ textAlign: 'right' }}>
              <Link
                key="1"
                to="/account-service/add"
                className="ant-btn ant-btn-primary ant-btn-background-ghost"
              >
                <PlusOutlined style={{ verticalAlign: '1px' }} /> Tạo mới
              </Link>
            </div>
          </Col> */}
        </Row>
      </div>

      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data}
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

export default AccountServiceList;
