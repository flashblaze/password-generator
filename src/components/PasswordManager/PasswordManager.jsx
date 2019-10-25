import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

const PasswordManager = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button type="default" onClick={() => setVisible(true)}>
        Save Password
      </Button>
      <Drawer
        title="Password Manager"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      ></Drawer>
    </div>
  );
};

export default PasswordManager;
