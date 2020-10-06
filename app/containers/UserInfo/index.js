/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader, Modal, message, Input, Form, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { WebSocketContext } from 'containers/WebSocket';
import TableData from './components/TableData';
import FilterData from './components/FilterData';
import { SOCKET_GET_USER_INFO } from './constants';
const { confirm } = Modal;
const defaultFilter = {
  keyword: '',
};

export function UserInfo() {
  const socket = useContext(WebSocketContext);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filter, setFilterData] = useState(defaultFilter);
  const [currentAction, setAction] = useState();
  const [currentRecord, setRecord] = useState();

  useEffect(() => {
    // fetchData(filter);
  }, []);

  const fetchData = async fiterData => {
    setLoading(true);
    await socket.emit(SOCKET_GET_USER_INFO, { data: fiterData });
    await socket.on(SOCKET_GET_USER_INFO, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        console.log('SOCKET_GET_USER_INFO', resParsed.data);
        if (resParsed.data?.userId) {
          setData([resParsed.data]);
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }
    });
  };

  const updateData = async (action, newData) => {
    setLoading(true);
    await socket.emit(action, { data: newData });
    await socket.on(action, res => {
      setLoading(false);
      const resParsed = JSON.parse(res);
      if (resParsed.result) {
        message.success('Cập nhật thành công');
        fetchData(filter);
      } else {
        message.error('Có lỗi xảy ra, xin vui lòng thử lại');
      }
    });
  };

  const onSubmitFilter = values => {
    setLoading(true);
    setFilterData(values);
    fetchData(values);
  };

  const handleRowClick = (action, record) => {
    setAction(action);
    setRecord(record);

    if (action === 'USER_REMOVE_STUCK' || action === 'USER_KICK') {
      showConfirm(action, record);
    } else {
      setVisible(!visible);
    }
  };

  const onSubmitForm = async values => {
    const req = {
      userId: currentRecord.userId,
      reason: values.reason,
    };
    await updateData(currentAction, req);
    await setVisible(!visible);
    await form.setFieldsValue({ reason: '' });
  };

  const showConfirm = (action, record) => {
    confirm({
      title: 'Confirm',
      content: 'Bạn có muốn thực hiện hành động này?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const req = {
          userId: record.userId,
        };
        updateData(action, req);
      },
    });
  };

  return (
    <div>
      <Helmet>
        <title>User Info</title>
      </Helmet>

      <div className="page-header-wrapper">
        <PageHeader
          style={{ paddingLeft: '0', paddingRight: '0' }}
          className="site-page-header"
          title="User Info"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <FilterData onSubmitFilter={onSubmitFilter} />
      </div>

      <div style={{ margin: '20px auto' }}>
        <TableData
          loading={loading}
          data={data}
          // pagination={false}
          onRowClick={handleRowClick}
        />
      </div>
      <Modal
        title="Confirm"
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
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
        >
          <Form.Item
            name="reason"
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
          >
            <Input.TextArea placeholder="Lí do" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserInfo;
