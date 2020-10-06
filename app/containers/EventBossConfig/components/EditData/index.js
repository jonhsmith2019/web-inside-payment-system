/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Form, Row, Col, Input, Button, Divider, DatePicker } from 'antd';

const dateFormat = 'DD/MM/YYYY HH:mm:ss';
export default function EditData(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    const eventData = { ...props?.event };
    eventData.startTime = moment(eventData.startTime, dateFormat);
    eventData.endTime = moment(eventData.endTime, dateFormat);
    form.setFieldsValue(eventData);
  }, [props?.event]);

  const onFinish = values => {
    const newData = { ...values };
    newData.startTime = values.startTime.format(dateFormat);
    newData.endTime = values.endTime.format(dateFormat);

    props.onSubmitEventChange(newData);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form form={form} layout="vertical" name="edit-event" onFinish={onFinish}>
        <Divider orientation="center">EVENT INFO</Divider>
        <div style={{ display: 'none' }}>
          <Form.Item name="bossId">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="fishName">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="gameKindId">
            <Input type="hidden" />
          </Form.Item>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Time Start"
              name="startTime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker showTime format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Time End"
              name="endTime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker showTime format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Max HP"
              name="maxHP"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Current HP"
              name="currentHP"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Boss Count"
              name="bossCount"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Delay Respawn"
              name="delayRespawn"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Award Value"
              name="awardValue"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Total Award Money"
              name="totalAwardMoney"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ratio Per Money"
              name="ratioPerMoney"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Hit Award Value"
              name="lastHitAwardValue"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" size="large">
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  event: PropTypes.object,
  onSubmitEventChange: PropTypes.func,
};
