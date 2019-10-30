import React, { useState, useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';

import { genHashedPassword } from '../../utils/hashPassword';
import { saveHashedPassword } from '../../firebase/firebase.utils';
import './styles.less';

const PasswordManager = ({ passwordString, uid }) => {
  const [visible, setVisible] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [plainPassword, setPlainPassword] = useState('');

  useEffect(() => {
    setPlainPassword(passwordString);
  }, [passwordString]);

  const savePasswordInDatabase = e => {
    e.preventDefault();
    let hashedPassword = genHashedPassword(passwordString);
    saveHashedPassword(
      websiteName.toLowerCase().replace(' ', '_'),
      hashedPassword,
      uid
    );
    setWebsiteName('');
    setPlainPassword('');
  };

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
        <Form
          layout="vertical"
          hideRequiredMark
          onSubmit={e => savePasswordInDatabase(e)}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                <Input
                  placeholder="Name of website/account"
                  onChange={e => setWebsiteName(e.target.value)}
                  value={websiteName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                <Input.Password
                  style={{ width: '100%' }}
                  placeholder="Password"
                  value={plainPassword}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="buttons">
            <Button type="default" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default PasswordManager;
