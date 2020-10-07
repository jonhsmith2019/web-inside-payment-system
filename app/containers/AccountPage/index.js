/* eslint-disable prefer-promise-reject-errors */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import { PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
// import FilterData from './components/FilterData';
import { SOCKET_GET_ACCOUNT_LIST, SOCKET_GET_GROUP_LIST } from './constants';
// const { confirm } = Modal;

const defaultFilter = {
  page: 0,
  size: 20,
};

export function AccountList() {
  const socket = useContext(WebSocketContext);
  // const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [visible, setVisible] = useState(false);
  const [group, setDataGroup] = useState([]);
  const [data, setData] = useState({});
  // const [currentRecord, setRecord] = useState();
  const [filter, setFilterData] = useState(defaultFilter);

  useEffect(() => {
    getGroups();
    getData(filter);
  }, []);

  const getGroups = async () => {
    await socket.emit(SOCKET_GET_GROUP_LIST, { data: {} });
    await socket.on(SOCKET_GET_GROUP_LIST, res => {
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        setDataGroup(resParsed.data);
      }
    });
  };

  const getData = async fiterData => {
    setLoading(true);

    await socket.emit(SOCKET_GET_ACCOUNT_LIST, { data: fiterData });
    await socket.on(SOCKET_GET_ACCOUNT_LIST, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        // console.log('SOCKET_GET_ACCOUNT_LIST', resParsed.data);
        setData(resParsed.data);
      } else {
        setData([]);
      }
    });
  };

  // const updateStatus = async newData => {
  //   setLoading(true);
  //   await socket.emit(SOCKET_ENABLE_USER, { data: newData });
  //   await socket.on(SOCKET_ENABLE_USER, res => {
  //     setLoading(false);
  //     const resParsed = JSON.parse(res);
  //     if (resParsed.result) {
  //       message.success('Cập nhật trạng thái thành công');
  //       fetchData(filter);
  //     } else {
  //       message.error('Có lỗi xảy ra, xin vui lòng thử lại');
  //     }
  //   });
  // };

  // const onSubmitFilter = values => {
  //   setLoading(true);
  //   const newFilter = {
  //     ...values,
  //     page: 0,
  //     size: 20,
  //   };
  //   console.log('query:', newFilter);
  //   setFilterData(newFilter);
  //   fetchData(newFilter);
  // };

  const handleTableChange = pagination => {
    setLoading(true);
    const newFilter = filter;
    newFilter.page = pagination.current - 1;
    newFilter.size = pagination.pageSize;
    setFilterData(newFilter);
    getData(newFilter);
  };

  // const handleChangeStatus = query => {
  //   confirm({
  //     title: 'Confirm',
  //     content: 'Bạn có muốn thay đổi trạng thái user?',
  //     icon: <ExclamationCircleOutlined />,
  //     onOk() {
  //       updateStatus(query);
  //     },
  //   });
  // };

  // const handleChangePassword = record => {
  //   setRecord(record);
  //   setVisible(!visible);
  // };

  // const handleSubmitFormChangePassword = async values => {
  //   setLoading(true);
  //   const req = {
  //     userId: currentRecord.id,
  //     password: values.password,
  //   };
  //   await socket.emit(SOCKET_SET_PASSWORD_USER, { data: req });
  //   await socket.on(SOCKET_SET_PASSWORD_USER, res => {
  //     setLoading(false);
  //     const resParsed = JSON.parse(res);
  //     if (resParsed.result) {
  //       message.success('Cập nhật password thành công');
  //       fetchData(filter);
  //     } else {
  //       message.error('Có lỗi xảy ra, xin vui lòng thử lại');
  //     }
  //   });
  //   await setVisible(!visible);
  //   form.resetFields();
  // };

  return (
    <div>
      <Helmet>
        <title>Account List</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="Account List"
          extra={[
            <Link
              key="1"
              to="/account/add"
              className="ant-btn ant-btn-primary ant-btn-background-ghost"
            >
              <PlusOutlined style={{ verticalAlign: '1px' }} /> Tạo mới
            </Link>,
          ]}
        />
      </div>

      {/* <div style={{ marginTop: '20px' }}>
        <FilterData group={group} onSubmitFilter={onSubmitFilter} />
      </div> */}

      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data.content}
          group={group}
          pagination={{
            current: _get(filter, 'page', 1) + 1,
            pageSize: _get(filter, 'size', 20),
            total: data.totalElements,
          }}
          onTableChange={handleTableChange}
          // onChangeUserStatus={handleChangeStatus}
          // onChangePassword={handleChangePassword}
        />
      </div>
      {/* <Modal
        title={`Thay đổi Password cho user ${currentRecord?.username}`}
        visible={visible}
        form={form}
        footer={null}
        onCancel={() => {
          setVisible(!visible);
        }}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleSubmitFormChangePassword}
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm New Password"
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
}

export default AccountList;
