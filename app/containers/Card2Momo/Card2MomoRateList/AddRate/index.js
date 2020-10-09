/* eslint-disable prefer-promise-reject-errors */
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  Form,
  Button,
  InputNumber,
  Card,
  Switch,
  Select,
  message,
} from 'antd';
import FormWrapper from 'components/FormWrapper';
import { WebSocketContext } from 'containers/WebSocket';
import routes from 'config/routes';
import { SOCKET_SAVE_CARD2MOMO_RATE, SOCKET_GET_TELCO } from '../constants';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export function AddCard2MomoRate(props) {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [telco, setDataTelco] = useState([]);
  useEffect(() => {
    getTelco({});
  }, []);

  const getTelco = async () => {
    await socket.emit(SOCKET_GET_TELCO, { data: {} });
    await socket.on(SOCKET_GET_TELCO, res => {
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        setDataTelco(resParsed.data);
      }
    });
  };

  const handleSumitForm = async values => {
    setLoading(true);

    await socket.emit(SOCKET_SAVE_CARD2MOMO_RATE, {
      data: { ...values, status: values.status ? 1 : 0 },
    });
    await socket
      .off(SOCKET_SAVE_CARD2MOMO_RATE)
      .on(SOCKET_SAVE_CARD2MOMO_RATE, res => {
        setLoading(false);
        const resParsed = JSON.parse(res);
        if (resParsed.result) {
          message.success('Thêm rate thành công');
          // eslint-disable-next-line react/prop-types
          props.history.push(routes.card2momo.rateList);
        } else {
          message.error(resParsed.message);
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Thêm Rate</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Thêm Rate"
        />
      </div>
      <Card>
        <FormWrapper loading={loading}>
          <Form
            form={form}
            name="add-rate"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={handleSumitForm}
          >
            <Form.Item
              name="telcoId"
              label="Telco"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn telco',
                },
              ]}
            >
              <Select
                placeholder="Chọn Telco"
                allowClear
                className="xs-width-100"
                style={{ width: '100%' }}
              >
                {telco?.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="rate"
              label="Rate"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập username',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập amount',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="status" label="Active" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Link
                to={routes.card2momo.rateList}
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

export default AddCard2MomoRate;
