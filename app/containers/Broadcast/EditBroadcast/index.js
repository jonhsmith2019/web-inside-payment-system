/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { WebSocketContext } from 'containers/WebSocket';
import {
  PageHeader,
  Form,
  Button,
  Input,
  Card,
  DatePicker,
  message,
} from 'antd';
import moment from 'moment';
import FormWrapper from 'components/FormWrapper';

import {
  SOCKET_SAVE_BROADCAST,
  SOCKET_GET_BROADCAST_DETAIL,
} from '../constants';
const { RangePicker } = DatePicker;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const dateFormat = 'DD/MM/YYYY HH:mm:ss';

export function EditBroadcast(props) {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { id } = props.match.params;
    fetchData(id);
  }, []);

  const fetchData = async id => {
    setLoading(true);
    await socket.emit(SOCKET_GET_BROADCAST_DETAIL, { data: { id } });
    await socket.on(SOCKET_GET_BROADCAST_DETAIL, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        const data = { ...resParsed.data };
        form.setFieldsValue({
          ...data,
          dateRangePicker: [
            moment(data.startDate, dateFormat),
            moment(data.endDate, dateFormat),
          ],
        });
      } else {
        props.history.push('/broadcast-list');
      }
    });
  };

  const onSumitForm = async values => {
    setLoading(true);
    const dateRange = values.dateRangePicker;
    const dataUpdated = {
      ...values,
      startDate: dateRange[0].format('DD/MM/YYYY HH:mm:ss'),
      endDate: dateRange[1].format('DD/MM/YYYY HH:mm:ss'),
    };
    delete dataUpdated.dateRangePicker;

    await socket.emit(SOCKET_SAVE_BROADCAST, { data: dataUpdated });
    await socket.on(SOCKET_SAVE_BROADCAST, () => {
      message.success('Sửa broadcast thành công');
      setLoading(false);
      props.history.push('/broadcast-list');
    });
  };

  return (
    <div>
      <Helmet>
        <title>Chỉnh sửa Broadcast</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Chỉnh sửa Broadcast"
        />
      </div>
      <Card>
        <FormWrapper loading={loading}>
          <Form
            form={form}
            name="edit-broadcast"
            onFinish={onSumitForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Form.Item
              style={{ display: 'none' }}
              name="id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="channelId"
              label="Kênh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Kênh',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Độ ưu tiên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Độ ưu tiên',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="interval"
              label="Thời gian lặp"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Thời gian lặp',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="msg"
              label="Thông báo"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Thông báo',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="dateRangePicker"
              label="Thời gian"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thời gian',
                },
              ]}
            >
              <RangePicker
                showTime
                format="DD/MM/YYYY HH:mm:ss"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Link
                to="/broadcast-list"
                className="ant-btn ant-btn-link ant-btn-dangerous"
              >
                Quay lại
              </Link>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Card>
    </div>
  );
}

export default EditBroadcast;
