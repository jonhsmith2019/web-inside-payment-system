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
      width: '10%',
    },
    {
      title: 'Trans Id',
      dataIndex: 'appTransactionId',
      key: 'appTransactionId',
      width: '30%',
    },
    {
      title: 'User Id',
      dataIndex: 'appUserId',
      key: 'appUserId',
      width: '25%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '25%',
      render: amount => <div>{new Intl.NumberFormat().format(amount)}</div>,
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
