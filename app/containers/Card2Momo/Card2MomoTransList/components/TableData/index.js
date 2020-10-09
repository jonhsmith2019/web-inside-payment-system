import React from 'react';
import PropTypes from 'prop-types';
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
      title: 'Trans Id',
      dataIndex: 'transId',
      key: 'transId',
      width: '13%',
    },
    {
      title: 'Partner Trans Id',
      dataIndex: 'partnerTransId',
      key: 'partnerTransId',
      width: '13%',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '12%',
    },

    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '8%',
    },
    {
      title: 'Card',
      render: row => (
        <div>
          <div>Card number: {row.cardNumber}</div>
          <div>Serial number: {row.serialNumber}</div>
        </div>
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: rate => (
        <div>
          <div>Amount: {new Intl.NumberFormat().format(rate.amount)}</div>
          <div>Rate: {rate.rate}</div>
          <div>Telco: {rate.telco?.name}</div>
        </div>
      ),
    },
    {
      title: 'Response data',
      dataIndex: 'rawResponseData',
      key: 'rawResponseData',
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
