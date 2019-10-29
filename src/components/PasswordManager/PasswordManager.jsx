import React, { useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row } from 'antd';

import { genHashedPassword } from '../../utils/hashPassword';
import { saveHashedPassword } from '../../firebase/firebase.utils';
import './styles.less';

const PasswordManager = ({ passwordString, uid }) => {
  const [visible, setVisible] = useState(false);
  const [websiteName, setWebsiteName] = useState('');

  const savePasswordInDatabase = () => {
    let hashedPassword = genHashedPassword(passwordString);
    saveHashedPassword(websiteName, hashedPassword, uid);
    setWebsiteName('');
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
        <Form layout="vertical" hideRequiredMark>
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
                  value={passwordString}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="buttons">
            <Button type="default" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => savePasswordInDatabase()}>
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default PasswordManager;
