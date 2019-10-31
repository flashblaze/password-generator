import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

import { encryptMasterPassword } from '../../utils/hashPassword';

const MasterPassword = ({ uid }) => {
  const [visible, setVisible] = useState(false);
  const [plainPassword, setPlainPassword] = useState('');

  // useState did not work
  let encryptedMasterPassword;

  const saveMasterPassword = () => {
    // useState did not work
    encryptedMasterPassword = encryptMasterPassword(plainPassword, uid);
    console.log(encryptedMasterPassword);
    setVisible(false);
    setPlainPassword('');
  };

  return (
    <div>
      <Button type="default" onClick={() => setVisible(true)}>
        Save Password
      </Button>
      <Modal
        title="Master Password"
        visible={visible}
        onOk={() => saveMasterPassword()}
        onCancel={() => setVisible(false)}
      >
        <div>
          <p>Create a master password to save and view generated passwords</p>
          <Input.Password
            value={plainPassword}
            onChange={e => setPlainPassword(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MasterPassword;
