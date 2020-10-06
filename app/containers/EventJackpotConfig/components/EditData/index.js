/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Divider,
  DatePicker,
  Select,
} from 'antd';

const dateFormat = 'DD/MM/YYYY HH:mm:ss';
export default function EditData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    const eventData = { ...props?.event };
    eventData.timeStart = moment(eventData.timeStart, dateFormat);
    eventData.timeEnd = moment(eventData.timeEnd, dateFormat);
    eventData.jackpotConfig = JSON.parse(eventData.jackpotConfig);
    form.setFieldsValue(eventData);
  }, [props?.event]);

  const onFinish = values => {
    const newData = { ...values };
    newData.timeStart = values.timeStart.format(dateFormat);
    newData.timeEnd = values.timeEnd.format(dateFormat);

    newData.jackpotConfig = JSON.stringify(newData.jackpotConfig);
    props.onSubmitEventChange(newData);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form form={form} layout="vertical" name="edit-event" onFinish={onFinish}>
        <Divider orientation="center">EVENT INFO</Divider>
        <div style={{ display: 'none' }}>
          <Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="gameKindId">
            <Input type="hidden" />
          </Form.Item>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ID"
              name="id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input readOnly disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Game Kind Id"
              name="gameKindId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input readOnly disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Time Start"
              name="timeStart"
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
              name="timeEnd"
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
              label="Time Per Jackpost"
              name="timePerJackpost"
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
              label="Times Per Day"
              name="timesPerDay"
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
              label="Time Delay"
              name="timeDelay"
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
              label="Percent Keep"
              name="percentKeep"
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
              label="Min Coin"
              name="minCoin"
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
              label="Max Coin"
              name="maxCoin"
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
              name="enable"
              label="Active"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Select.Option value={true}>True</Select.Option>
                <Select.Option value={false}>False</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Fish Count"
              name="fishCount"
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

        <div>
          <Divider orientation="center">JACKPOT CONFIG</Divider>
          <Form.List name="jackpotConfig">
            {fields => (
              <>
                {fields.map(field => (
                  <Row key={`${field.name}`} gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="MinC"
                        name={[field.name, 'MinC']}
                        fieldKey={[field.fieldKey, 'MinC']}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập MinC',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="PM"
                        name={[field.name, 'PM']}
                        fieldKey={[field.fieldKey, 'PM']}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập PM',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Ra"
                        name={[field.name, 'Ra']}
                        fieldKey={[field.fieldKey, 'Ra']}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập Ra',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" size="large">
              Lưu
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

EditData.propTypes = {
  event: PropTypes.object,
  onSubmitEventChange: PropTypes.func,
};
