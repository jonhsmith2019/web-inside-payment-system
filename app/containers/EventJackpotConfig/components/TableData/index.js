/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge, Button } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'timeStart',
      key: 'timeStart',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'timeEnd',
      key: 'timeEnd',
    },
    {
      title: 'Times Per Day',
      dataIndex: 'timesPerDay',
      key: 'timesPerDay',
    },
    {
      title: 'Time Per Jackpost',
      dataIndex: 'timePerJackpost',
      key: 'timePerJackpost',
    },
    {
      title: 'Time Delay',
      dataIndex: 'timeDelay',
      key: 'timeDelay',
    },
    {
      title: 'Percent Keep',
      dataIndex: 'percentKeep',
      key: 'percentKeep',
    },
    {
      title: 'Min Coin',
      dataIndex: 'minCoin',
      key: 'minCoin',
    },
    {
      title: 'Max Coin',
      dataIndex: 'maxCoin',
      key: 'maxCoin',
    },
    {
      title: 'Fish Count',
      dataIndex: 'fishCount',
      key: 'fishCount',
    },
    {
      title: 'Game Kind ID',
      dataIndex: 'gameKindId',
      key: 'gameKindId',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enable',
      key: 'enable',
      render: enable => (
        <span>
          {enable === true ? (
            <span>
              <Badge status="success" />
              Active
            </span>
          ) : (
            <span>
              <Badge status="error" />
              In-active
            </span>
          )}
        </span>
      ),
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
        rowKey="id"
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
