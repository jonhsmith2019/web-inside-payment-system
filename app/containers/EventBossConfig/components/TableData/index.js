/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'bossId',
      key: 'bossId',
    },
    {
      title: 'Fish Name',
      dataIndex: 'fishName',
      key: 'fishName',
    },
    {
      title: 'Game Kind',
      dataIndex: 'gameKindId',
      key: 'gameKindId',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'maxHP',
      dataIndex: 'maxHP',
      key: 'maxHP',
    },
    {
      title: 'Current HP',
      dataIndex: 'currentHP',
      key: 'currentHP',
    },
    {
      title: 'Boss Count',
      dataIndex: 'bossCount',
      key: 'bossCount',
    },
    {
      title: 'Delay Respawn',
      dataIndex: 'delayRespawn',
      key: 'delayRespawn',
    },
    {
      title: 'Ratio Per Money',
      dataIndex: 'ratioPerMoney',
      key: 'ratioPerMoney',
    },
    {
      title: 'Award Value',
      dataIndex: 'awardValue',
      key: 'awardValue',
    },
    {
      title: 'Total Award Money',
      dataIndex: 'totalAwardMoney',
      key: 'totalAwardMoney',
    },
    {
      title: 'Last Hit Award Value',
      dataIndex: 'lastHitAwardValue',
      key: 'lastHitAwardValue',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => props.onRowClick(record)}>
            Sửa
          </Button>
        </div>
      ),
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
        className="table-responsive table-jackpot-config"
      />
    </>
  );
}

TableData.propTypes = {
  onRowClick: PropTypes.func,
  onTableChange: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};
