/* eslint-disable prefer-promise-reject-errors */
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  Form,
  Button,
  Input,
  Card,
  Switch,
  Select,
  message,
} from 'antd';
import FormWrapper from 'components/FormWrapper';
import { WebSocketContext } from 'containers/WebSocket';
import routes from 'config/routes';
import { SOCKET_ADD_ACCOUNT, SOCKET_GET_GROUP_LIST } from '../constants';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function AddAccount(props) {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [group, setDataGroup] = useState([]);
  useEffect(() => {
    fetchGroup({});
  }, []);

  const fetchGroup = async () => {
    await socket.emit(SOCKET_GET_GROUP_LIST, { data: {} });
    await socket.on(SOCKET_GET_GROUP_LIST, res => {
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        setDataGroup(resParsed.data);
      }
    });
  };

  const handleSumitForm = async values => {
    setLoading(true);
    const { username, password, app, groupId, enabled } = values;
    const user = {
      username,
      password,
      app,
      groupId,
      enabled: enabled ? 1 : 0,
    };

    await socket.emit(SOCKET_ADD_ACCOUNT, { data: user });
    await socket.on(SOCKET_ADD_ACCOUNT, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        message.success('Thêm account thành công');
        // eslint-disable-next-line react/prop-types
        props.history.push(routes.account.list);
      } else {
        message.error('Có lỗi xảy ra, xin vui lòng thử lại');
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Thêm mới Account</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Thêm mới Account"
        />
      </div>
      <Card>
        <FormWrapper loading={loading}>
          <Form
            form={form}
            name="add-account"
            onFinish={handleSumitForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập username',
                  min: 3,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập password',
                  min: 3,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Xác nhận password không chính xác!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="app"
              label="App"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập app',
                  min: 3,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="groupId"
              label="Nhóm"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn group!',
                },
              ]}
            >
              <Select
                placeholder="Chọn nhóm"
                allowClear
                className="xs-width-100"
                style={{ width: '100%' }}
              >
                {group.map(item => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.groupName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="enabled" label="Active" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Link
                to={routes.management.user.list}
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

export default AddAccount;
