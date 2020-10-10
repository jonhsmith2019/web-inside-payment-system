import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Badge } from 'antd';
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
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      render: group => <span>{group && group.groupName}</span>,
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
          <Link to={`/account/${record.id}`}>Sửa</Link>
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
        className="table-responsive table-account"
      />
    </>
  );
}

TableData.propTypes = {
  onTableChange: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
};
