import React, { useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';

import { genHashedPassword } from '../../utils/hashPassword';
import './styles.less';

const PasswordManager = ({ passwordString }) => {
  const [visible, setVisible] = useState(false);
  let hashedPassword = genHashedPassword(passwordString);

  return (
    <div>
      <Button type="default" onClick={() => setVisible(true)}>
        Save Password
      </Button>
      <Drawer
        title="Password Manager"
        placement="right"
        closable={false}
        width={550}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                <Input placeholder="Enter name of website" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                <Input
                  style={{ width: '100%' }}
                  placeholder="Hashed password will go here"
                  value={hashedPassword}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="buttons">
            <Button type="default" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => setVisible(true)}>
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default PasswordManager;
