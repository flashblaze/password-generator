import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Drawer, Form, Input, message, Row } from 'antd';

import ViewPasswords from '../ViewPasswords/ViewPasswords';

import { saveHashedPassword } from '../../firebase/firebase.utils';
import { encryptPlainTextPassword } from '../../utils/hashPassword';
import './styles.less';

const PasswordManager = ({ passwordString, uid }) => {
  const [visible, setVisible] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [plainPassword, setPlainPassword] = useState('');
  const deviceWidth = window.innerWidth;

  const currentUser = useSelector(state => state.user.currentUser);
  const tempMasterPassword = useSelector(
    state => state.masterPassword.tempMasterPassword
  );

  useEffect(() => {
    setPlainPassword(passwordString);
  }, [passwordString]);

  const savePasswordInDatabase = e => {
    e.preventDefault();
    const encryptedPassword = encryptPlainTextPassword(
      passwordString,
      tempMasterPassword,
      currentUser.id
    );
    let res = saveHashedPassword(websiteName, encryptedPassword, uid);
    res
      .then(res => {
        if (res === null) {
          message.error(`Password for ${websiteName} already exists`);
        } else {
          setWebsiteName('');
          setPlainPassword('');
          message.success(`Password added successfully`);
        }
      })
      .catch(e => {
        console.log(`Error: ${e.message}`);
      });
  };

  return (
    <div>
      <Button type="default" onClick={() => setVisible(true)}>
        Save Password
      </Button>
      <Drawer
        title="Password Manager"
        width={deviceWidth > 720 ? '35%' : '100%'}
        closable={false}
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
                  required={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                <Input.Password
                  style={{ width: '100%' }}
                  placeholder="Password"
                  value={plainPassword}
                  required={true}
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
        <ViewPasswords />
        <Link to="/profile">
          <Button className="profile-button" icon="setting">
            Profile
          </Button>
        </Link>
      </Drawer>
    </div>
  );
};

export default PasswordManager;
