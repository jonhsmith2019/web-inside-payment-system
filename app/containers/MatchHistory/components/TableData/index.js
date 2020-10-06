import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'UserID',
      dataIndex: 'userId',
      key: 'userId',
      width: '100px',
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'userName',
      key: 'userName',
      width: '150px',
    },
    {
      title: 'Tiền vào phòng',
      dataIndex: 'moneyIn',
      key: 'moneyIn',
      render: moneyIn => <span>{new Intl.NumberFormat().format(moneyIn)}</span>,
    },
    {
      title: 'Tiền rời phòng',
      dataIndex: 'moneyOut',
      key: 'moneyOut',
      render: moneyOut => (
        <span>{new Intl.NumberFormat().format(moneyOut)}</span>
      ),
    },
    {
      title: 'Triệt tiêu',
      dataIndex: 'moneyGet',
      key: 'moneyGet',
      render: moneyGet => (
        <span>{new Intl.NumberFormat().format(moneyGet)}</span>
      ),
    },
    {
      title: 'Tổng đạn bắn',
      dataIndex: 'totalBulletMultiple',
      key: 'totalBulletMultiple',
      render: totalBulletMultiple => (
        <span>{new Intl.NumberFormat().format(totalBulletMultiple)}</span>
      ),
    },
    {
      title: 'Tổng tiền nhận về',
      dataIndex: 'totalGoldReward',
      key: 'totalGoldReward',
      render: totalGoldReward => (
        <span>{new Intl.NumberFormat().format(totalGoldReward)}</span>
      ),
    },
    {
      title: 'Thời gian vào',
      dataIndex: 'timeIn',
      key: 'timeIn',
    },
    {
      title: 'Thời gian ra',
      dataIndex: 'timeOut',
      key: 'timeOut',
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
        className="table-responsive"
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
