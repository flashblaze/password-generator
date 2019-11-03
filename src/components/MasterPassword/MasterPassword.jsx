import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, message, Modal } from 'antd';

import { encryptMasterPassword } from '../../utils/hashPassword';
import {
  setMasterPassword,
  storeTempMasterPassword
} from '../../redux/actions/password-action';
import { storeMasterPassword } from '../../firebase/firebase.utils';

const MasterPassword = ({ uid }) => {
  const [visible, setVisible] = useState(false);
  const [plainPassword, setPlainPassword] = useState('');

  const dispatch = useDispatch();

  // useState did not work
  let encryptedMasterPassword;

  const saveMasterPassword = async () => {
    // useState did not work
    encryptedMasterPassword = encryptMasterPassword(plainPassword, uid);
    let retVal = await storeMasterPassword(encryptedMasterPassword, uid);
    if (retVal !== null) {
      dispatch(setMasterPassword(encryptedMasterPassword));
      dispatch(storeTempMasterPassword(plainPassword));
      message.success('Master password created successfully');
      setVisible(false);
    }

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
