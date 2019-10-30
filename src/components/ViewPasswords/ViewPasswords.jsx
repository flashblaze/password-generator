import React, { useState } from 'react';
import { Button, Dropdown, Icon, Input, Menu } from 'antd';

import './styles.less';
import { useSelector } from 'react-redux';
import { getPasswords } from '../../firebase/firebase.utils';

const ViewPasswords = () => {
  let [passwordsData, setPasswordsData] = useState([]);
  const [hashedPass, setHashedPass] = useState('');
  let placeholder = [];

  const currentUser = useSelector(state => state.user.currentUser);

  const getPass = async () => {
    let res = await getPasswords(currentUser.id);
    res.forEach(passData => {
      placeholder.push(passData);
    });
    setPasswordsData([...placeholder]);
  };

  const displayPassword = e => {
    let val = passwordsData.filter(data => data.websiteName === e.key);
    setHashedPass(val[0].hashedPassword);
  };

  const menu = (
    <Menu onClick={e => displayPassword(e)}>
      {passwordsData.length !== 0 ? (
        passwordsData.map(passwordData => (
          <Menu.Item key={passwordData.websiteName}>
            <p>{passwordData.originalWebsiteName}</p>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No Password</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="buttons">
      <Dropdown overlay={menu} trigger={['click']} onClick={() => getPass()}>
        <Button>
          View Passwords <Icon type="down" />
        </Button>
      </Dropdown>
      <Input.Password
        value={hashedPass}
        placeholder="Fetched password"
        style={{ width: 243 }}
      />
    </div>
  );
};

export default ViewPasswords;
