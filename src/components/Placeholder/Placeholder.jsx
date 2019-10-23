import React from 'react';
import { Typography } from 'antd';

import './styles.less';

const { Title, Paragraph } = Typography;

const Placeholder = () => {
  return (
    <div>
      <Title>Placeholder</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem maiores
        impedit possimus illo repudiandae dolorum unde aperiam laborum, velit
        dolore, a, harum minima sequi eaque quo culpa. Repellat, quia iure!
      </Paragraph>
    </div>
  );
};

export default Placeholder;
