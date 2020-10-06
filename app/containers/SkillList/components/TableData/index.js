import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge, Button } from 'antd';
import './style.css';

export default function TableData(props) {
  const { onRowClick } = props;
  const columns = [
    {
      title: 'Game',
      dataIndex: 'gameName',
      key: 'gameName',
    },
    {
      title: 'Skill',
      dataIndex: 'nameSkill',
      key: 'nameSkill',
    },
    {
      title: 'Number Fish Get',
      dataIndex: 'numberFishGet',
      key: 'numberFishGet',
      render: numberFishGet => (
        <span>{new Intl.NumberFormat().format(numberFishGet)}</span>
      ),
    },
    {
      title: 'Power Gun',
      dataIndex: 'powerGun',
      key: 'powerGun',
      render: powerGun => (
        <span>{new Intl.NumberFormat().format(powerGun)}</span>
      ),
    },

    {
      title: 'Score Get Skill',
      dataIndex: 'scoreGetSkill',
      key: 'scoreGetSkill',
      render: scoreGetSkill => (
        <span>{new Intl.NumberFormat().format(scoreGetSkill)}</span>
      ),
    },
    {
      title: 'Time Effect',
      dataIndex: 'timeEffect',
      key: 'timeEffect',
    },
    {
      title: 'Times Fire',
      dataIndex: 'timesFire',
      key: 'timesFire',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isEnable',
      key: 'isEnable',
      render: isEnable => (
        <span>
          {isEnable === 1 ? (
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
          <Button type="link" onClick={() => onRowClick(record)}>
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
