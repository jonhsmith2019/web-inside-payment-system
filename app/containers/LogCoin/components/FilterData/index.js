import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Form, Button, Input, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function FilterData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: '',
      status: 0,
      reasonId: 0,
      dateRange: [moment(), moment()],
    });
  }, []);

  const onFinish = values => {
    props.onSubmitFilter(values);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        form={form}
        name="filter-boss"
        layout={isMobile ? 'vertical' : 'inline'}
        onFinish={onFinish}
      >
        <Form.Item name="username">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Tất cả trạng thái"
            allowClear
            className="xs-width-100"
            style={{ width: 220 }}
          >
            <Option value={0} key={0}>
              Tất cả trạng thái
            </Option>
            <Option value={1} key={1}>
              Chuyển tiền thành công
            </Option>
            <Option value={2} key={2}>
              Thất bại đã hoàn tiền
            </Option>
            <Option value={3} key={3}>
              Thất bại chưa hoàn tiền
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="reasonId">
          <Select
            placeholder="Tất cả Reason"
            allowClear
            className="xs-width-100"
            style={{ width: 220 }}
          >
            <Option value={0} key={0}>
              Tất cả reason
            </Option>
            <Option value={45} key={45}>
              Chuyển tiền vào game cá
            </Option>
            <Option value={46} key={46}>
              Rút tiền từ game cá
            </Option>
            <Option value={48} key={48}>
              Hoàn tiền khi rút thất bại
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="dateRange">
          <RangePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            icon={<SearchOutlined style={{ verticalAlign: '1px' }} />}
          >
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

FilterData.propTypes = {
  onSubmitFilter: PropTypes.func,
};
