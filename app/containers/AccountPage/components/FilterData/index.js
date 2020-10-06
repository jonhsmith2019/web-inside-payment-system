import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const { Option } = Select;

export default function FilterData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: '',
      group: '',
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
        <Form.Item name="groupId">
          <Select
            placeholder="Tất cả group"
            allowClear
            className="xs-width-100"
            style={{ width: 200 }}
          >
            <Option value="" key={0}>
              Tất cả nhóm
            </Option>
            {props.group.map(item => (
              <Option value={item.id} key={item.id}>
                {item.groupName}
              </Option>
            ))}
          </Select>
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
  group: PropTypes.array,
  onSubmitFilter: PropTypes.func,
};
