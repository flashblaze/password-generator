import React, { useState } from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';

import './styles.less';
import { getPasswords } from '../../firebase/firebase.utils';

const ViewPasswords = () => {
  let [passwordsData, setPasswordsData] = useState([]);
  let placeholder = [];

  const getPass = async () => {
    let res = await getPasswords();
    res.forEach(passData => {
      placeholder.push(passData);
    });
    setPasswordsData([...placeholder]);
  };

  const menu = (
    <Menu>
      {passwordsData.map(passwordData => (
        <Menu.Item key={passwordData.websiteName}>
          <p>{passwordData.originalWebsiteName}</p>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']} onClick={() => getPass()}>
        <Button>
          View Passwords <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ViewPasswords;
