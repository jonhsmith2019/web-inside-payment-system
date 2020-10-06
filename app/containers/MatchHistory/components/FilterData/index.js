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
      keyword: '',
      roomKind: '0',
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
        name="filter-user"
        layout={isMobile ? 'vertical' : 'inline'}
        onFinish={onFinish}
      >
        <Form.Item name="keyword">
          <Input placeholder="Từ khoá" />
        </Form.Item>

        <Form.Item name="dateRange">
          <RangePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="roomKind">
          <Select placeholder="Tất cả room" allowClear style={{ width: 200 }}>
            <Option value="0" key={999}>
              Tất cả room
            </Option>
            {props.rooms?.map(
              item =>
                item.kindId !== 0 && (
                  <Option value={item.kindId} key={item.kindId}>
                    {item.gameName}
                  </Option>
                ),
            )}
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
  rooms: PropTypes.array,
  onSubmitFilter: PropTypes.func,
};
