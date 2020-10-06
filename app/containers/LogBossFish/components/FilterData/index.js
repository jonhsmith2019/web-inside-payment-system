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
      type: '0',
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
        <Form.Item name="type">
          <Select
            placeholder="Tất cả room"
            allowClear
            className="xs-width-100"
            style={{ width: 200 }}
          >
            <Option value="0" key={0}>
              Tất cả loại
            </Option>
            <Option value="1" key={1}>
              Giết Boss
            </Option>
            <Option value="2" key={2}>
              Rớt tiền
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
