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
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => new Intl.NumberFormat().format(amount),
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
      width: '120px',
      align: 'center',
      render: record => (
        <div>
          <Link to={`/card2momo-rate/${record.id}`}>Sửa</Link>
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
        className="table-responsive table-rate"
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
