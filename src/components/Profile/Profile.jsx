import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';

import './styles.less';

const Profile = () => {
  return (
    <div className="container">
      <Card title="Profile">
        <Link to="/">
          <Button>Gotta go back</Button>
        </Link>
      </Card>
    </div>
  );
};

export default Profile;
