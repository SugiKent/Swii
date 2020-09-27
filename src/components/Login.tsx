import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import * as firebaseui from 'firebaseui-ja';

import firebase from './../config/firebaseConf';
import './../firebaseui/firebaseui.css';

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    const deffer = () => { }

    firebase.auth().onAuthStateChanged(function (user) {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function () {
            history.replace('/monthly');
            return true;
          },
          uiShown: function () {
            // document.getElementById('loading').style.display = 'none';
          }
        },
        signInFlow: 'popup',
        signInSuccessUrl: '/monthly',
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
              'openid',
              'https://www.googleapis.com/auth/userinfo.email'
            ],
            customParameters: {
              // Forces account selection even when one account
              // is available.
              prompt: 'select_account'
            }
          }
        ],
        tosUrl: '/term_of_service',
        privacyPolicyUrl: '/privacy_policy'
      };

      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
      return deffer
    });
  }, [history]);

  return (
    <>
      <div id="firebaseui-auth-container"></div>
    </>
  )
}

export default Login;
