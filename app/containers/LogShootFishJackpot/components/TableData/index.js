import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.css';
export default function TableData(props) {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },

    {
      title: 'Fish Id',
      dataIndex: 'fishId',
      key: 'fishId',
    },
    {
      title: 'Game Kind Id',
      dataIndex: 'gameKindId',
      key: 'gameKindId',
    },
    {
      title: 'Room Id',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: 'Bullet Value',
      dataIndex: 'bulletValue',
      key: 'bulletValue',
    },
    {
      title: 'Coin Server Pay',
      dataIndex: 'coinServerPay',
      key: 'coinServerPay',
    },
    {
      title: 'Coin Win',
      dataIndex: 'coinWin',
      key: 'coinWin',
      render: coinWin => <span>{new Intl.NumberFormat().format(coinWin)}</span>,
    },
    {
      title: 'Jackpot Coin First',
      dataIndex: 'jackpostCoinFirst',
      key: 'jackpostCoinFirst',
      render: jackpostCoinFirst => (
        <span>{new Intl.NumberFormat().format(jackpostCoinFirst)}</span>
      ),
    },
    {
      title: 'Jackpot Coin Current',
      dataIndex: 'jockpostCoinCurrent',
      key: 'jockpostCoinCurrent',
      render: jockpostCoinCurrent => (
        <span>{new Intl.NumberFormat().format(jockpostCoinCurrent)}</span>
      ),
    },
    {
      title: 'Percent Money',
      dataIndex: 'percentMoney',
      key: 'percentMoney',
    },
    {
      title: 'User Coin Current',
      dataIndex: 'userCoinCurrent',
      key: 'userCoinCurrent',
      render: userCoinCurrent => (
        <span>{new Intl.NumberFormat().format(userCoinCurrent)}</span>
      ),
    },
    {
      title: 'User Coin First',
      dataIndex: 'userCoinFirst',
      key: 'userCoinFirst',
      render: userCoinFirst => (
        <span>{new Intl.NumberFormat().format(userCoinFirst)}</span>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'timeRec',
      key: 'timeRec',
      render: timeRec => <span>{timeRec}</span>,
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
        className="table-responsive table-logshoot"
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
