/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge, Button, Popconfirm } from 'antd';
import './style.css';

export default function TableData(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Port WS',
      dataIndex: 'portWS',
      key: 'portWS',
    },

    {
      title: 'CCU',
      dataIndex: 'cCU',
      key: 'cCU',
    },
    {
      title: 'Max CCU',
      dataIndex: 'maxCCU',
      key: 'maxCCU',
    },
    {
      title: 'Update Time',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enable',
      key: 'enable',
      render: enable => (
        <span>
          {enable === 1 ? (
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
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Bạn chắc muốn thay đổi trạng thái?"
            onConfirm={() => props.onRowClick(record)}
            okText="Yes"
            cancelText="No"
          >
            {record.enable === 1 ? (
              <Button type="primary" danger size="small">
                Disable
              </Button>
            ) : (
              <Button type="primary" size="small">
                Enable
              </Button>
            )}
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey="domain"
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
};
