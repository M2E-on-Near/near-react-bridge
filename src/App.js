import React, {useEffect, useState} from "react";
import './App.css';
import {signIn, signOut, isSignedIn, ft_balance_of} from "./near";

function App() {
    const [isSigned, setIsSigned] = useState(false);

    useEffect(() => {
        switch (window.action?.action) {
            case 'sign-in':
                if (isSignedIn()) {
                  window.ReactNativeWebView.postMessage("success");
                } else {
                    signIn();
                }
                break;
            case 'sign-out':
                signOut();
                break;
            case 'ft_balance':
                ft_balance_of().then(e => {
                  window.ReactNativeWebView.postMessage(e);
                })
                break;
            default: break;
        }
        setIsSigned(isSignedIn());
    }, [])
  return (
      <div className="App">
        <header className="App-header">
              <p>
                isSinged: {isSigned ? 'true' : 'false'}
              </p>
          <button onClick={signIn}>signIn</button>
          <button onClick={signOut}>signOut</button>
          <button onClick={ft_balance_of}>ft_ba</button>
      </header>
    </div>
  );
}

export default App;
