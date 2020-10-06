import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.css';
export default function TableData(props) {
  const columns = [
    {
      title: 'Boss Id',
      dataIndex: 'bossId',
      key: 'bossId',
    },

    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'DMG',
      dataIndex: 'dmg',
      key: 'dmg',
      render: dmg => <span>{new Intl.NumberFormat().format(dmg)}</span>,
    },
    {
      title: 'Total Award Money',
      dataIndex: 'totalAwardMoney',
      key: 'totalAwardMoney',
      render: totalAwardMoney => (
        <span>{new Intl.NumberFormat().format(totalAwardMoney)}</span>
      ),
    },
    {
      title: 'Last Hit Award Money',
      dataIndex: 'lastHitAwardMoney',
      key: 'lastHitAwardMoney',
      render: lastHitAwardMoney => (
        <span>{new Intl.NumberFormat().format(lastHitAwardMoney)}</span>
      ),
    },
    {
      title: 'Last Hit Time',
      dataIndex: 'lastHitTime',
      key: 'lastHitTime',
    },
    {
      title: 'Time Record',
      dataIndex: 'timeRecord',
      key: 'timeRecord',
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey="bossId"
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={props.pagination}
        onChange={props.onTableChange}
        className="table-responsive table-boss"
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
