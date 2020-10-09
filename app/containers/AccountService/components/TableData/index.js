import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Badge, Popover } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      render: account => (
        <Popover
          content={
            <div>
              <p>
                <span>ID: </span>
                {account.id}
              </p>
              <p>
                <span>App: </span>
                {account.app}
              </p>
              <p>
                <span>Group: </span>
                {account.group.groupName}
              </p>
              <p>
                <span>Status: </span>
                {account.status}
              </p>
            </div>
          }
          title="Title"
        >
          {account.username}
        </Popover>
      ),
    },
    {
      title: 'Secret Key',
      dataIndex: 'secret',
      key: 'secret',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: service => service.name,
    },
    {
      title: 'Sharing Rate',
      dataIndex: 'sharingRate',
      key: 'sharingRate',
    },
    {
      title: 'White List Ip',
      dataIndex: 'whiteListIp',
      key: 'whiteListIp',
    },
    {
      title: 'Callback Url',
      dataIndex: 'callbackUrl',
      key: 'callbackUrl',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <span>
          {status === 1 ? (
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
      width: '100px',
      align: 'center',
      render: record => (
        <div>
          <Link to={`/account-service/${record.id}`}>Sửa</Link>
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
        className="table-responsive table-account-service"
      />
    </>
  );
}

TableData.propTypes = {
  onTableChange: PropTypes.func,
  pagination: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool,
};
