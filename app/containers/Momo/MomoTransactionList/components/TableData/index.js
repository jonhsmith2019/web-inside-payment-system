import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { Table, Badge } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: '10%',
    },
    {
      title: 'Trans Id',
      dataIndex: 'momoTransId',
      key: 'momoTransId',
      width: '13%',
    },
    {
      title: 'Request time',
      dataIndex: 'requestTime',
      key: 'requestTime',
      width: '12%',
      // render: requestTime =>
      //   moment
      //     .unix(parseInt(requestTime / 1000, 10))
      //     .format('MM/DD/YYYY HH:ss:ss'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '12%',
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'money',
      width: '8%',
      render: money => new Intl.NumberFormat().format(money),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: status => (
        <span>
          {status === 1 ? (
            <span>
              <Badge status="success" />
              Thành công
            </span>
          ) : (
            <span>
              <Badge status="error" />
              Thất bại
            </span>
          )}
        </span>
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
  pagination: PropTypes.object,
  onTableChange: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
};
