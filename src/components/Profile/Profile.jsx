import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, message, Modal } from 'antd';

import { deletePasswords } from '../../firebase/firebase.utils';
import './styles.less';

const Profile = () => {
  const currentUser = useSelector(state => state.user.currentUser);

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
        const res = await deletePasswords(currentUser.id);
        if (res !== null) {
          message.success('Passwords deleted successfully');
        } else {
          message.info('Password list is empty');
        }
      }
    });
  };

  return (
    <div className="container">
      <Card title="Profile">
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
