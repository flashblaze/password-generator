import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Checkbox, Icon, Input, InputNumber } from 'antd';

import SignIn from '../SignIn/SignIn';
import SignOut from '../SignOut/SignOut';
import PasswordManager from '../PasswordManager/PasswordManager';
import MasterPassword from '../MasterPassword/MasterPassword';
import { generatePassword } from '../../utils/password';
import { getMasterPasswordFirestore } from '../../firebase/firebase.utils';
import { setMasterPassword } from '../../redux/actions/password-action';

import './styles.less';

const { TextArea } = Input;

const PasswordConfig = () => {
  const [length, setLength] = useState(8);
  const [upperChecked, setUpperChecked] = useState(true);
  const [lowerChecked, setLowerChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(true);
  const [symbolsChecked, setSymbolsChecked] = useState(true);
  const [passGenerated, setPassGenerated] = useState(false);
  let [passwordString, setPasswordString] = useState('');

  const currentUser = useSelector(state => state.user.currentUser);
  const masterPassword = useSelector(
    state => state.masterPassword.masterPassword
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkMasterPassword() {
      if (currentUser !== null) {
        let val = await getMasterPasswordFirestore(currentUser.id);
        dispatch(setMasterPassword(val.encryptedMasterPassword));
        console.log('rendered');
      }

      console.log('rendered');
    }

    checkMasterPassword();
    console.log('rendered');
  }, [dispatch, currentUser]);

  const genPassword = () => {
    passwordString = generatePassword(
      length,
      upperChecked,
      lowerChecked,
      numbersChecked,
      symbolsChecked
    );
    setPassGenerated(true);
    setPasswordString(passwordString);
  };

  const copyPassword = () => {
    let password = document.getElementById('password');
    password.select();
    password.setSelectionRange(0, 99999);

    document.execCommand('copy');
  };

  return (
    <div className="container">
      <Card title="Generate Password">
        <div className="settings">
          {currentUser ? (
            <h4 style={{ padding: 10 }}>
              Welcome <b>{currentUser.displayName}</b>
            </h4>
          ) : null}

          <div className="setting">
            <p>Password length</p>
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
          <div className="buttons">
            {currentUser ? (
              masterPassword ? (
                <PasswordManager
                  passwordString={passwordString}
                  uid={currentUser.id}
                />
              ) : (
                <MasterPassword uid={currentUser.id} />
              )
            ) : null}
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => genPassword()}
            >
              Generate
            </Button>
          </div>
        </div>
        {passGenerated ? (
          <div className="setting">
            <TextArea
              id="password"
              value={passwordString}
              autoSize={{ minRows: 2, maxRows: 6 }}
              style={{ width: '150px' }}
            />
            <div>
              <Icon
                type="copy"
                onClick={() => copyPassword()}
                style={{ marginRight: '20px' }}
              />
              <Icon type="delete" onClick={() => setPasswordString('')} />
            </div>
          </div>
        ) : null}
      </Card>
      <div style={{ margin: '20px 0', float: 'right' }}>
        {!currentUser ? <SignIn /> : <SignOut />}
      </div>
    </div>
  );
};

export default PasswordConfig;
