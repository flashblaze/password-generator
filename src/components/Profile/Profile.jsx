import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, message, Input, Modal } from 'antd';

import {
  setMasterPassword,
  storeTempMasterPassword
} from '../../redux/actions/password-action';
import {
  deleteMasterPassword,
  deletePasswords,
  storeMasterPassword
} from '../../firebase/firebase.utils';
import {
  compareMasterPasswords,
  encryptMasterPassword
} from '../../utils/hashPassword';
import './styles.less';

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [oldMasterPassword, setOldMasterPassword] = useState('');
  const [newMasterPassword, setNewMasterPassword] = useState('');

  const currentUser = useSelector(state => state.user.currentUser);
  const masterPassword = useSelector(
    state => state.masterPassword.masterPassword
  );

  const dispatch = useDispatch();

  const showWarning = async () => {
    Modal.confirm({
      title: 'Delete Account',
      content: (
        <div>
          <p>
            This will delete the master password and all stored passwords.This
            process is irreversible.
          </p>
          <p>
            Are you <b>sure</b>?
          </p>
        </div>
      ),
      async onOk() {
        const passwordRes = await deletePasswords(currentUser.id);
        const masterPassRes = await deleteMasterPassword(currentUser.id);
        if (passwordRes !== null && masterPassRes !== null) {
          message.success('Passwords deleted successfully');
        } else {
          message.info('Password list is empty');
        }
      }
    });
  };

  const changeMasterPassword = async () => {
    const res = compareMasterPasswords(oldMasterPassword, masterPassword);
    if (res) {
      const newHashedMasterPassword = encryptMasterPassword(newMasterPassword);
      await deleteMasterPassword(currentUser.id);
      const res = await storeMasterPassword(
        newHashedMasterPassword,
        currentUser.id
      );
      dispatch(setMasterPassword(newHashedMasterPassword));
      dispatch(storeTempMasterPassword(newMasterPassword));
      if (res !== null) {
        message.success('Master password changed successfully');
      } else {
        message.error('Error changing master password');
      }
      setVisible(false);
    } else {
      message.error('Entered master password does not match');
    }
  };

  return (
    <div className="container">
      <Card title="Profile">
        <div>
          {/* <Button type="default" onClick={() => setVisible(true)}>
            Change master password
          </Button> */}
          <Modal
            title="Master Password"
            visible={visible}
            onOk={() => changeMasterPassword()}
            onCancel={() => setVisible(false)}
          >
            <div>
              <p>Enter old master password</p>
              <Input.Password
                value={oldMasterPassword}
                onChange={e => setOldMasterPassword(e.target.value)}
              />
            </div>
            <div>
              <p>Enter new master password</p>
              <Input.Password
                value={newMasterPassword}
                onChange={e => setNewMasterPassword(e.target.value)}
              />
            </div>
          </Modal>
        </div>
        <div className="setting">
          <Link to="/">
            <Button>Gotta go back</Button>
          </Link>
          <Button type="danger" onClick={() => showWarning()}>
            Delete passwords
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
