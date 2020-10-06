/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Divider,
  Select,
  DatePicker,
} from 'antd';

const dateFormat = 'DD/MM/YYYY HH:mm:ss';
export default function EventBossTheGioi(props) {
  const [form] = Form.useForm();
  const [configData, setConfigData] = useState({});

  useEffect(() => {
    // console.log(props?.event);
    let dataParsed = {};
    if (typeof props?.event?.configData === 'object') {
      dataParsed = props?.event?.configData;
    } else {
      dataParsed = JSON.parse(props?.event?.configData);
    }

    setConfigData(dataParsed.ConfigData);
    // console.log(dataParsed.ConfigData);
    const configDataParsed = dataParsed.ConfigData.map(item => {
      const newItem = { ...item };
      newItem.StartTime = moment(newItem.StartTime, dateFormat);
      newItem.EndTime = moment(newItem.EndTime, dateFormat);
      return newItem;
    });
    // console.log(configDataParsed);
    const eventData = { ...props?.event };
    eventData.configData = {
      ConfigData: configDataParsed,
    };
    // console.log(eventData);
    eventData.beginTime = moment(eventData.beginTime, dateFormat);
    eventData.endTime = moment(eventData.endTime, dateFormat);
    eventData.beginDisplayTime = moment(eventData.beginDisplayTime, dateFormat);
    eventData.endDisplayTime = moment(eventData.endDisplayTime, dateFormat);

    form.setFieldsValue(eventData);
  }, []);

  const onFinish = values => {
    const newData = values;
    newData.beginTime = values.beginTime.format(dateFormat);
    newData.endTime = values.endTime.format(dateFormat);
    newData.beginDisplayTime = values.beginDisplayTime.format(dateFormat);
    newData.endDisplayTime = values.endDisplayTime.format(dateFormat);

    const configDataParsed = {
      ConfigData: newData.configData.ConfigData.map(item => {
        const newItem = { ...item };
        newItem.StartTime = newItem.StartTime.format(dateFormat);
        newItem.EndTime = newItem.EndTime.format(dateFormat);
        return newItem;
      }),
    };

    newData.configData = JSON.stringify(configDataParsed);
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
          <Form.Item name="eventId">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="status">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="status">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="code">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="isDelete">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="runOn">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="title">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="type">
            <Input type="hidden" />
          </Form.Item>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="beginTime"
              label="BeginTime"
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
              name="endTime"
              label="EndTime"
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
              name="beginDisplayTime"
              label="BeginDisplayTime"
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
              name="endDisplayTime"
              label="EndDisplayTime"
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
              name="active"
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
              name="channelId"
              label="ChannelId"
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
        <Form.List name={['configData', 'ConfigData']}>
          {() => (
            <>
              {Object.keys(configData).map(type => (
                <div key={type}>
                  <Divider orientation="center">CONFIG DATA</Divider>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name={[type, 'BossID']}
                        label="BossID"
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
                        name={[type, 'BossCount']}
                        label="BossCount"
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
                        name={[type, 'CurrentHP']}
                        label="CurrentHP"
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
                        name={[type, 'MaxHP']}
                        label="MaxHP"
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
                        name={[type, 'DelayRespawn']}
                        label="DelayRespawn"
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
                        name={[type, 'RatioPerMoney']}
                        label="RatioPerMoney"
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
                        name={[type, 'StartTime']}
                        label="StartTime"
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
                        name={[type, 'EndTime']}
                        label="EndTime"
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
                        name={[type, 'GameKindID']}
                        label="GameKindID"
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
                        name={[type, 'FishKind']}
                        label="FishKind"
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
                        name={[type, 'IsEnabled']}
                        label="IsEnabled"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select>
                          <Select.Option value={1}>True</Select.Option>
                          <Select.Option value={0}>False</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={[type, 'AwardValue']}
                        label="AwardValue"
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
                        name={[type, 'TotalAwardMoney']}
                        label="TotalAwardMoney"
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
                        name={[type, 'AwardItemCount']}
                        label="AwardItemCount"
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
                        name={[type, 'TotalAwardItemCount']}
                        label="TotalAwardItemCount"
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
                        name={[type, 'AwardItemID']}
                        label="AwardItemID"
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
                        name={[type, 'LastHitAwardValue']}
                        label="LastHitAwardValue"
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
                        name={[type, 'LastHitItemCount']}
                        label="LastHitItemCount"
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
                        name={[type, 'LastHitItemID']}
                        label="LastHitItemID"
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
                        name={[type, 'ChannelId']}
                        label="ChannelId"
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
                </div>
              ))}
            </>
          )}
        </Form.List>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" size="large">
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  );
}

EventBossTheGioi.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  event: PropTypes.object,
  onSubmitEventChange: PropTypes.func,
};
