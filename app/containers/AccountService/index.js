import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import { SOCKET_GET_ACCOUNT_SERVICE_LIST } from './constants';

export function AccountServiceList(props) {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const {
      match: {
        params: { id = 16 },
      },
    } = props;
    fetchData({ accountId: id });
  }, []);

  const fetchData = async fiterData => {
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
        />
      </div>

      {/* <div style={{ marginTop: '20px' }}>
        <FilterData group={group} onSubmitFilter={onSubmitFilter} />
      </div> */}

      <div style={{ margin: '20px auto' }}>
        <TableData loading={loading} data={data} />
      </div>
    </div>
  );
}

export default AccountServiceList;
