import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const { Option } = Select;

export default function FilterData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    // const {
    //   location: { search },
    // } = props;
    // const querySearch = new URLSearchParams(search);
    // const accountId = querySearch.get('accountId');
    // if (accountId)
    //   form.setFieldsValue({
    //     accountId: parseInt(accountId, 10),
    //   });
  }, []);

  const handleSubmitSearch = values => {
    props.onSubmitFilter(values);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        form={form}
        name="filter-account"
        layout={isMobile ? 'vertical' : 'inline'}
        onFinish={handleSubmitSearch}
      >
        <Form.Item name="accountId">
          <Select
            placeholder="Chọn Account"
            allowClear
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
