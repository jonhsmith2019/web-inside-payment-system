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
import {
  SOCKET_ADD_ACCOUNT,
  SOCKET_GET_GROUP_LIST,
  SOCKET_GET_ACCOUNT,
} from '../constants';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function EditAccount(props) {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [isValidatePassword, setValidatePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [group, setDataGroup] = useState([]);
  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;

    fetchData({ id });
    fetchGroup({});
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_ACCOUNT, { data: fiterData });
    await socket.on(SOCKET_GET_ACCOUNT, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_ACCOUNT', resParsed.data);
        form.setFieldsValue({
          ...resParsed.data,
          groupId: resParsed.data?.group?.id,
        });
      }
    });
  };

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
    const userUpdated = values;
    if (!values.password) {
      delete userUpdated.password;
      delete userUpdated.confirm;
    }
    await socket.emit(SOCKET_ADD_ACCOUNT, {
      data: { ...userUpdated, status: userUpdated.status === false ? 0 : 1 },
    });
    await socket.off(SOCKET_ADD_ACCOUNT).on(SOCKET_ADD_ACCOUNT, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        message.success(resParsed.message);
        // eslint-disable-next-line react/prop-types
        props.history.push(routes.account.list);
      } else {
        message.error(resParsed.message);
      }
    });
  };

  const handleFormChange = changedFields => {
    // chi check confirm pass neu pass khac empty
    const newPassword = changedFields?.password?.replace(/\s/g, '');
    if (newPassword && newPassword !== '') {
      setValidatePassword(true);
      form.validateFields(['confirm']);
      form.setFieldsValue({
        password: newPassword,
      });
    } else if (newPassword === '') {
      setValidatePassword(false);
      form.resetFields(['confirm']);
      form.setFieldsValue({
        password: newPassword,
      });
    }
    // khong check neu pass empty;
    const newConfirmPassword = changedFields?.confirm?.replace(/\s/g, '');
    const password = form.getFieldValue(['password']);
    if (newConfirmPassword !== '' && (!password || password === '')) {
      setValidatePassword(false);
      form.resetFields(['confirm']);
    }
    // khong dc phep space
    if (changedFields?.username) {
      form.setFieldsValue({
        username: changedFields.username.replace(/\s/g, ''),
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Chỉnh sửa Account</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Chỉnh sửa Account"
        />
      </div>
      <Card>
        <FormWrapper loading={loading}>
          <Form
            form={form}
            name="edit-account"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={handleSumitForm}
            onValuesChange={changedFields => {
              handleFormChange(changedFields);
            }}
          >
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="hidden" />
            </Form.Item>
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
              label="Password"
              name="password"
              rules={[
                {
                  min: 6,
                  message: 'Vui lòng nhập password tối thiểu 6 kí tự!',
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
                  required: isValidatePassword,
                  message: 'Vui lòng xác nhận password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Password không chính xác!');
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
            <Form.Item name="status" label="Active" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Link
                to={routes.account.list}
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

export default EditAccount;
