import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm } from 'antd';
import './style.css';

export default function TableData(props) {
  function handleConfirmDelete(record) {
    props.onDeleteBroadcast(record.id);
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '50px',
    },
    {
      title: 'Kênh',
      dataIndex: 'channelId',
      key: 'channelId',
      width: '100px',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: '150px',
    },
    {
      title: 'Thông báo',
      dataIndex: 'msg',
      key: 'msg',
    },
    {
      title: 'Thời gian lặp',
      dataIndex: 'interval',
      key: 'interval',
      width: '150px',
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      width: '180px',
    },
    {
      title: 'Kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      width: '180px',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '150px',
      render: (text, record) => (
        <div>
          <Link
            to={`/broadcast/edit/${record.id}`}
            className="ant-btn ant-btn-link"
          >
            Sửa
          </Link>
          <Popconfirm
            title="Bạn muốn xoá broadcast này?"
            onConfirm={() => handleConfirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Xoá
            </Button>
          </Popconfirm>
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
        className="table-responsive"
      />
    </>
  );
}

TableData.propTypes = {
  onTableChange: PropTypes.func,
  onDeleteBroadcast: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};
