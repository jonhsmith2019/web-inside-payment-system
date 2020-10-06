/**
 *
 * Stock Config
 *
 */

import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { WebSocketContext } from 'containers/WebSocket';
import FormWrapper from 'components/FormWrapper';
import { Form, Button, Input, PageHeader, Card, message, Row, Col } from 'antd';
import './style.css';
import { SOCKET_GET_STOCK_CONFIG } from './constants';

export function StockConfig() {
  const socket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const stockConfigData = { stockRatioConfig: {} };
    await socket.emit(SOCKET_GET_STOCK_CONFIG, { data: stockConfigData });
    await socket.on(SOCKET_GET_STOCK_CONFIG, res => {
      const resParsed = JSON.parse(res);
      setLoading(false);
      if (resParsed.result) {
        const dataRes = resParsed.data?.stockRatioConfig || resParsed.data;
        setData(dataRes);
        const dataParsed = {};
        Object.keys(dataRes).forEach(type => {
          const config = JSON.parse(dataRes[type]);
          dataParsed[type] = config;
        });
        form.setFieldsValue(dataParsed);
      }
    });
  };

  const onFinish = async values => {
    setLoading(true);
    const newData = {};
    Object.keys(values).forEach(type => {
      const config = JSON.stringify(values[type]);
      newData[type] = config;
    });
    const stockConfigData = { stockRatioConfig: newData };
    await socket.emit(SOCKET_GET_STOCK_CONFIG, { data: stockConfigData });
    await socket.on(SOCKET_GET_STOCK_CONFIG, () => {
      message.success('Cập nhật thành công');
      setLoading(false);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Stock Config</title>
      </Helmet>
      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Stock Config"
        />
      </div>
      <div style={{ margin: '20px auto' }}>
        <FormWrapper loading={loading}>
          <Form
            form={form}
            name="stockconfig"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            style={{ minHeight: 300 }}
          >
            <div>
              {Object.keys(data).map(type => (
                <Card
                  key={type}
                  type="inner"
                  title={type}
                  style={{ marginBottom: '20px' }}
                >
                  <div className="stock-config-fields">
                    <Form.Item
                      label="Stock Min"
                      name={[type, 'StockMin']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Stock Min',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Stock Max"
                      name={[type, 'StockMax']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Stock Max',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="BulletAppear"
                      name={[type, 'BulletAppear']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Bullet Appear',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.List name={[type, 'StockRatio']}>
                      {fields => (
                        <>
                          <Form.Item label="Stock Ratio">
                            {fields.map(field => (
                              <Row key={`${field.name}`} gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    name={[field.name, 'Stock']}
                                    fieldKey={[field.fieldKey, 'Stock']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Vui lòng nhập Stock',
                                      },
                                    ]}
                                  >
                                    <Input addonBefore="Stock" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    name={[field.name, 'Ratio']}
                                    fieldKey={[field.fieldKey, 'Ratio']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Vui lòng nhập Stock Ratio',
                                      },
                                    ]}
                                  >
                                    <Input addonBefore="Ratio" />
                                  </Form.Item>
                                </Col>
                              </Row>
                            ))}
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>
                </Card>
              ))}
            </div>
            {!loading && (
              <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" size="large">
                  Lưu
                </Button>
              </div>
            )}
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
}

export default StockConfig;
