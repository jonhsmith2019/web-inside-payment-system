import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.css';
export default function TableData(props) {
  const columns = [
    {
      title: 'Transaction Id',
      dataIndex: 'tranId',
      key: 'tranId',
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Current Coin',
      dataIndex: 'currentCoin',
      key: 'currentCoin',
      render: currentCoin => (
        <span>{new Intl.NumberFormat().format(currentCoin)}</span>
      ),
    },
    {
      title: 'Coin Change',
      dataIndex: 'coinChange',
      key: 'coinChange',
      render: coinChange => (
        <span>{new Intl.NumberFormat().format(coinChange)}</span>
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'statusId',
      key: 'statusId',
      render: status => {
        if (status === 1) return <span>Chuyển tiền thành công</span>;
        if (status === 2) return <span>Thất bại đã hoàn tiền</span>;
        if (status === 3) return <span>Thất bại chưa hoàn tiền</span>;
        return ' ';
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey="tranId"
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={props.pagination}
        onChange={props.onTableChange}
        className="table-responsive table-logcoin"
      />
    </>
  );
}

TableData.propTypes = {
  onTableChange: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};
