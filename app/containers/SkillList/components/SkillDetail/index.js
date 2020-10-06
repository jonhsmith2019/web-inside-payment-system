/* eslint-disable react/jsx-boolean-value */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Row, Col, Input, Button, Divider, Select } from 'antd';

export default function SkillDetail(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.skill);
  }, [props.skill]);

  const onFinish = values => {
    props.onSubmitChange(values);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form form={form} layout="vertical" name="edit-skill" onFinish={onFinish}>
        <Divider orientation="center">SKILL INFO</Divider>
        <div style={{ display: 'none' }}>
          <Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gameName"
              label="Game"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input readOnly disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameSkill"
              label="Skill"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input readOnly disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="numberFishGet"
              label="Number Fish Get"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="powerGun"
              label="Power Gun"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="scoreGetSkill"
              label="Score Get Skill"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="timeEffect"
              label="Time Effect"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="timesFire"
              label="Times Fire"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="isEnable"
              label="Active"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Select.Option value={1}>True</Select.Option>
                <Select.Option value={0}>False</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" size="large">
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  );
}

SkillDetail.propTypes = {
  skill: PropTypes.object,
  onSubmitChange: PropTypes.func,
};
