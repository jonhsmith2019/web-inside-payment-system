import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Form, DatePicker, Button } from 'antd';
import { isMobile } from 'react-device-detect';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY HH:mm:ss';
export default function FilterData(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      rangePicker: [moment(), moment()],
    });
  }, []);

  const onFinish = fieldsValue => {
    const rangeValue = fieldsValue.rangePicker;
    const values = {
      fromDate: rangeValue[0].startOf('day').format(dateFormat),
      toDate: rangeValue[1].endOf('day').format(dateFormat),
    };
    props.onSubmitFilter(values);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        form={form}
        name="filter-stats"
        layout={isMobile ? 'vertical' : 'inline'}
        onFinish={onFinish}
      >
        <Form.Item name="rangePicker">
          <RangePicker
            format="DD/MM/YYYY"
            ranges={{
              'Hôm nay': [moment(), moment()],
              'Tuần này': [moment().startOf('week'), moment().endOf('week')],
              'Tháng này': [moment().startOf('month'), moment().endOf('month')],
            }}
          />
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
