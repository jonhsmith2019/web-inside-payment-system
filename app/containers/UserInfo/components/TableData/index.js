/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge, Button } from 'antd';
import './style.css';
import {
  SOCKET_USER_LOCK,
  SOCKET_USER_UNLOCK,
  SOCKET_USER_REMOVE_STUCK,
  SOCKET_USER_KICK_USER,
} from '../../constants';
export default function TableData(props) {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Game Status',
      dataIndex: 'gameStatus',
      key: 'gameStatus',
      render: gameStatus => <span>{gameStatus ? 'True' : 'False'}</span>,
    },
    {
      title: 'Master Status',
      dataIndex: 'masterStatus',
      key: 'masterStatus',
      render: masterStatus => <span>{masterStatus ? 'True' : 'False'}</span>,
    },
    {
      title: 'Gold Fish',
      dataIndex: 'goldFish',
      key: 'goldFish',
      render: goldFish => (
        <span>{new Intl.NumberFormat().format(goldFish)}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: isActive => (
        <span>
          {isActive === 1 ? (
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
      width: '300px',
      render: (text, record) => (
        <div>
          {record.isActive === 1 ? (
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => props.onRowClick(SOCKET_USER_LOCK, record)}
            >
              Lock
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              size="small"
              style={{ marginLeft: '5px' }}
              onClick={() => props.onRowClick(SOCKET_USER_UNLOCK, record)}
            >
              UnLock
            </Button>
          )}

          <Button
            type="primary"
            size="small"
            style={{ marginLeft: '5px' }}
            onClick={() => props.onRowClick(SOCKET_USER_REMOVE_STUCK, record)}
          >
            Remove Stuck
          </Button>
          <Button
            type="primary"
            size="small"
            style={{ marginLeft: '5px' }}
            onClick={() => props.onRowClick(SOCKET_USER_KICK_USER, record)}
          >
            Kick User
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey="userId"
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={false}
        className="table-responsive"
      />
    </>
  );
}

TableData.propTypes = {
  onRowClick: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};
