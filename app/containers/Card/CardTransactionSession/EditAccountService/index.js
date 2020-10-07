/* eslint-disable react/prop-types */
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
  SOCKET_SAVE_ACCOUNT_SERVICE,
  SOCKET_GET_ACCOUNT_LIST,
  SOCKET_GET_ACCOUNT_SERVICE_DETAIL,
} from '../constants';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function EditAccountService(props) {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [accounts, setDataAccounts] = useState([]);
  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    getAccounts({
      page: 0,
      size: 100,
    });

    getData({ id });
  }, []);

  const getAccounts = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_ACCOUNT_LIST, { data: fiterData });
    await socket.on(SOCKET_GET_ACCOUNT_LIST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        setDataAccounts(resParsed.data?.content);
      } else {
        setDataAccounts([]);
      }
    });
  };

  const getData = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_ACCOUNT_SERVICE_DETAIL, { data: fiterData });
    await socket.on(SOCKET_GET_ACCOUNT_SERVICE_DETAIL, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        // console.log('SOCKET_GET_ACCOUNT_SERVICE_DETAIL', resParsed.data);
        form.setFieldsValue({
          ...resParsed.data,
          accountId: resParsed.data?.account.id,
          serviceId: resParsed.data?.service?.id,
        });
      }
    });
  };

  const handleSumitForm = async values => {
    setLoading(true);
    await socket.emit(SOCKET_SAVE_ACCOUNT_SERVICE, {
      data: { ...values, status: values.status === false ? 0 : 1 },
    });
    await socket
      .off(SOCKET_SAVE_ACCOUNT_SERVICE)
      .on(SOCKET_SAVE_ACCOUNT_SERVICE, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          message.success(resParsed.message);

          props.history.push(
            `${routes.accountService.list}?accountId=${values.accountId}`,
          );
        } else {
          message.error(resParsed.message);
        }
      });
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
            name="edit-account-service"
            onFinish={handleSumitForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
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
              name="serviceId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name="secret"
              label="Secret"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập secret',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="callbackUrl"
              label="Callback Url"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập callback url',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="whiteListIp"
              label="WhiteList Ip"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập whiteList ip',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sharingRate"
              label="Sharing Rate"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập sharing rate',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="accountId"
              label="Account"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn account!',
                },
              ]}
            >
              <Select
                placeholder="Chọn Account"
                allowClear
                className="xs-width-100"
                style={{ width: '100%' }}
              >
                {accounts.map(item => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.username}
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
                to={routes.accountService.list}
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

export default EditAccountService;
