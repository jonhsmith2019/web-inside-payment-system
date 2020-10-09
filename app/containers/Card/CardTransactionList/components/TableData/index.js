import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '10%',
    },
    {
      title: 'Trans Id',
      dataIndex: 'myTransId',
      key: 'myTransId',
      width: '10%',
    },
    {
      title: 'Request Trans Id',
      dataIndex: 'requestTransId',
      key: 'requestTransId',
      width: '12%',
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '8%',
      render: amount => new Intl.NumberFormat().format(amount),
    },
    {
      title: 'Callback',
      render: row => (
        <div>
          <div>
            Real amount:{' '}
            {new Intl.NumberFormat().format(row.callbackRealAmount)}
          </div>
          <div>Message: {row.callbackMessage}</div>
        </div>
      ),
    },
    {
      title: 'Card',
      render: row => (
        <div>
          <div>Card number: {row.cardNumber}</div>
          <div>Serial number: {row.serialNumber}</div>
        </div>
      ),
    },
    {
      title: 'Provider TransId',
      dataIndex: 'providerTransId',
      key: 'providerTransId',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: status => (
        <span>
          {status === 1 ? (
            <span>
              <Badge status="success" />
              Thành công
            </span>
          ) : (
            <span>
              <Badge status="error" />
              Thất bại
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={props.pagination}
        onChange={props.onTableChange}
        className="table-responsive table-account-service"
      />
    </>
  );
}

TableData.propTypes = {
  pagination: PropTypes.object,
  onTableChange: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
};
