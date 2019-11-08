import React from 'react';
import { Icon } from 'antd';

import './styles.less';

const Footer = () => {
  return (
    <div className="footer">
      <p>Created by FlashBlaze</p>
      <p>
        View on{' '}
        <a
          href="https://github.com/FlashBlaze/password-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          {<Icon type="github" />}
        </a>
      </p>
    </div>
  );
};

export default Footer;
