import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
          <Input placeholder="Từ khoá" />
        </Form.Item>
        <Form.Item name="chanelId">
          <Input placeholder="Kênh" />
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
