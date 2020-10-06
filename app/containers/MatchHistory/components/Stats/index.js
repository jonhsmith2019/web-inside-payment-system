/* eslint-disable react/prop-types */
import React from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import { isMobile } from 'react-device-detect';

export default function Stats(props) {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px' }}>
      {isMobile ? (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng triệt tiêu"
              value={props.trietTieu}
              precision={2}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng tiền vào phòng"
              value={props.tongVao}
              precision={2}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Statistic
              title="Tổng tiền ra phòng"
              value={props.tongRa}
              precision={2}
            />
          </div>
        </div>
      ) : (
        <Row gutter={32}>
          <Col xs={48} sm={32} md={8}>
            <Card>
              <Statistic
                title="Tổng triệt tiêu"
                value={props.trietTieu}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={48} sm={32} md={8}>
            <Card>
              <Statistic
                title="Tổng tiền vào phòng"
                value={props.tongVao}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={48} sm={32} md={8}>
            <Card>
              <Statistic
                title="Tổng tiền ra phòng"
                value={props.tongRa}
                precision={2}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
