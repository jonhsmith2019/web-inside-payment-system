import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Select } from 'antd';
import { isMobile } from 'react-device-detect';
const { Option } = Select;

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
        <Form.Item name="event" label="Event">
          <Select placeholder="Tất cả" style={{ width: '200px' }}>
            <Option value="" key={0}>
              Tất cả
            </Option>
            {props.events?.map(item => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

FilterData.propTypes = {
  events: PropTypes.array,
  onSubmitFilter: PropTypes.func,
};
