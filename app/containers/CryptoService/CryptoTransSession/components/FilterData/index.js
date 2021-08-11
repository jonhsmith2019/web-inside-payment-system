import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Form, Button, Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
const { RangePicker } = DatePicker;

export default function FilterData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      keyword: '',
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
        <Form.Item name="keyword">
          <Input placeholder="Keyword" />
        </Form.Item>
        <Form.Item name="dateRange">
          <RangePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block={isMobile ? 'true' : 'false'}
            icon={<SearchOutlined />}
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
