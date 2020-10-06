import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Input, Button } from 'antd';
import { isMobile } from 'react-device-detect';

export default function FilterData(props) {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onSubmitFilter(values);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        form={form}
        name="filter-user"
        layout={isMobile ? 'vertical' : 'inline'}
        onFinish={onFinish}
      >
        <Form.Item name="keyword">
          <Input placeholder="Keyword" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
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
