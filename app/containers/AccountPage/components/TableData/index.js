/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge, Button } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'App',
      dataIndex: 'app',
      key: 'app',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enabled',
      key: 'enabled',
      render: enabled => (
        <span>
          {enabled === 1 ? (
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
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      render: group => <span>{group && group.groupName}</span>,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '250px',
      render: (text, record) => (
        <div>
          {record.enabled === 1 ? (
            <Button
              type="primary"
              danger
              size="small"
              style={{ width: '65px', textAlign: 'center' }}
              onClick={() =>
                props.onChangeUserStatus({ userId: record.id, enabled: 0 })
              }
            >
              Lock
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              size="small"
              style={{ width: '65px', textAlign: 'center' }}
              onClick={() =>
                props.onChangeUserStatus({ userId: record.id, enabled: 1 })
              }
            >
              UnLock
            </Button>
          )}

          <Button
            type="primary"
            size="small"
            style={{ marginLeft: '5px' }}
            onClick={() => props.onChangePassword(record)}
          >
            Change password
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
        pagination={false}
        onChange={props.onTableChange}
        className="table-responsive table-boss"
      />
    </>
  );
}

TableData.propTypes = {
  onChangeUserStatus: PropTypes.func,
  onChangePassword: PropTypes.func,
  onTableChange: PropTypes.func,
  data: PropTypes.array,
  group: PropTypes.array,
  loading: PropTypes.bool,
  // pagination: PropTypes.object,
};
