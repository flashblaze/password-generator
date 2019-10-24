import React, { useState } from 'react';
import { Button, Card, Checkbox, InputNumber } from 'antd';

import './styles.less';

const PasswordConfig = () => {
  const [length, setLength] = useState(0);
  const [upperChecked, setUpperChecked] = useState(true);
  const [lowerChecked, setLowerChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(true);
  const [symbolsChecked, setSymbolsChecked] = useState(true);

  return (
    <Card
      style={{ width: 300 }}
      title="Generate Password"
      className="container"
    >
      <div className="settings">
        <div className="setting">
          <p>Password length:</p>
          <InputNumber
            placeholder={4}
            min={4}
            value={length}
            onChange={e => setLength(e)}
          />
        </div>
        <div className="setting">
          <p>Uppercase Letters</p>
          <Checkbox
            onChange={e => setUpperChecked(e.target.checked)}
            checked={upperChecked}
          />
        </div>
        <div className="setting">
          <p>Lowercase Letters</p>
          <Checkbox
            onChange={e => setLowerChecked(e.target.checked)}
            checked={lowerChecked}
          />
        </div>
        <div className="setting">
          <p>Numbers</p>
          <Checkbox
            onChange={e => setNumbersChecked(e.target.checked)}
            checked={numbersChecked}
          />
        </div>
        <div className="setting">
          <p>Symbols</p>
          <Checkbox
            onChange={e => setSymbolsChecked(e.target.checked)}
            checked={symbolsChecked}
          />
        </div>
        <Button type="primary">Generate</Button>
      </div>
    </Card>
  );
};

export default PasswordConfig;
