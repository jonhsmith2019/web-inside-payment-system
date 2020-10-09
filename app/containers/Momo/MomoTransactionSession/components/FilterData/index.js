import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Form, Button, Select, Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function FilterData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      keyword: '',
      roomKind: '0',
      dateRange: [moment().subtract(7, 'd'), moment()],
    });
  }, []);

  const handleSubmitSearch = values => {
    props.onSubmitFilter(values);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        form={form}
        name="filter-card-trans"
        layout={isMobile ? 'vertical' : 'inline'}
        onFinish={handleSubmitSearch}
      >
        <Form.Item name="accountId">
          <Select
            allowClear
            showSearch
            placeholder="Chọn Account"
            className="xs-width-100"
            style={{ width: 200 }}
          >
            {props.accounts?.map(item => (
              <Option value={item.id} key={item.id}>
                {item.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="keyword">
          <Input placeholder="Keyword" />
        </Form.Item>
        <Form.Item name="dateRange">
          <RangePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

FilterData.propTypes = {
  accounts: PropTypes.array,
  onSubmitFilter: PropTypes.func,
};
