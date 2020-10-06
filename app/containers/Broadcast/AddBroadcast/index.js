import React, { useState, useContext } from 'react';
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
import FormWrapper from 'components/FormWrapper';
import routes from 'config/routes';
import { SOCKET_SAVE_BROADCAST } from '../constants';
const { RangePicker } = DatePicker;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function AddBroadcast(props) {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSumitForm = async values => {
    setLoading(true);
    const dateRange = values.dateRangePicker;
    const broadcast = {
      ...values,
      startDate: dateRange[0].format('DD/MM/YYYY HH:mm:ss'),
      endDate: dateRange[1].format('DD/MM/YYYY HH:mm:ss'),
    };
    delete broadcast.dateRangePicker;

    await socket.emit(SOCKET_SAVE_BROADCAST, { data: broadcast });
    await socket.on(SOCKET_SAVE_BROADCAST, () => {
      message.success('Thêm broadcast thành công');
      setLoading(false);
      // eslint-disable-next-line react/prop-types
      props.history.push(routes.gmtool.broadcastList);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Thêm mới Broadcast</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Thêm mới Broadcast"
        />
      </div>
      <Card>
        <FormWrapper loading={loading}>
          <Form
            form={form}
            name="add-broadcast"
            onFinish={onSumitForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
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

export default AddBroadcast;
