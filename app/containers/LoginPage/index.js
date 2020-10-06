/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { checkLoggedIn } from 'utils/auth/RequireAuthentication';
import routes from 'config/routes';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { login } from './actions';
import './style.css';

export function LoginPage({ onSubmitForm }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });
  const isLogin = checkLoggedIn(localStorage.getItem('token'));
  const [form] = Form.useForm();
  if (isLogin) {
    return <Redirect to={routes.index} />;
  }

  const onFinish = values => {
    onSubmitForm(values);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-content">
          <div className="login-header">
            <h1
              style={{
                textAlign: 'center',
                fontWeight: '700',
                margin: '0',
                color: '#1890ff',
              }}
            >
              <span>Payment</span> Inside
            </h1>
          </div>
          <Form
            form={form}
            name="login_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: ({ username, password }) => {
      dispatch(login(username, password));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
