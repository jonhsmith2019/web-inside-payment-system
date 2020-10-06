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
  DatePicker,
  Select,
} from 'antd';

const dateFormat = 'DD/MM/YYYY HH:mm:ss';
export default function EventJackPot(props) {
  const [form] = Form.useForm();
  const [configData, setConfigData] = useState({});

  useEffect(() => {
    let dataParsed = {};
    if (typeof props?.event?.configData === 'object') {
      dataParsed = props?.event?.configData;
    } else {
      dataParsed = JSON.parse(props?.event?.configData);
    }
    // console.log(props?.event);

    const dataParsedV1 = dataParsed.ConfigData.map(item => {
      const newItem = { ...item };
      newItem.TimeBegin = moment(newItem.TimeBegin, dateFormat);
      newItem.TimeEnd = moment(newItem.TimeEnd, dateFormat);
      if (!Array.isArray(newItem.JackpotConfig)) {
        newItem.JackpotConfig = JSON.parse(newItem.JackpotConfig);
      }
      return newItem;
    });
    setConfigData(dataParsedV1);

    const eventData = { ...props?.event };
    // console.log(eventData);
    eventData.configData = {
      ConfigData: dataParsedV1,
    };
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
        newItem.TimeBegin = newItem.TimeBegin.format(dateFormat);
        newItem.TimeEnd = newItem.TimeEnd.format(dateFormat);
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
                  <Row gutter={16} style={{ display: 'none' }}>
                    <Col span={12}>
                      <Form.Item
                        name={[type, 'EventId']}
                        label="EventId"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input type="hidden" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={[type, 'Id']}
                        label="Id"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input type="hidden" />
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
                        name={[type, 'FishCount']}
                        label="FishCount"
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
                        name={[type, 'MinCoin']}
                        label="MinCoin"
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
                        name={[type, 'MaxCoin']}
                        label="MaxCoin"
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
                        name={[type, 'PercentKeep']}
                        label="PercentKeep"
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
                        name={[type, 'TimeDelay']}
                        label="TimeDelay"
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
                        name={[type, 'TimeBegin']}
                        label="TimeBegin"
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
                        name={[type, 'TimeEnd']}
                        label="TimeEnd"
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
                        name={[type, 'TimePerJackpost']}
                        label="TimePerJackpost"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name={[type, 'TimesPerDay']}
                        label="TimesPerDay"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div>
                    <Divider orientation="center">JACKPOT CONFIG</Divider>
                    <Form.List name={[type, 'JackpotConfig']}>
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
                  </div>
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

EventJackPot.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  event: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmitEventChange: PropTypes.func,
};
