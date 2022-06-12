import React, {useEffect, useState} from "react";
import './App.css';
import {signIn, signOut, isSignedIn, ft_balance_of, nft_mint} from "./near";

function App() {
    const [isSigned, setIsSigned] = useState(false);
    const [shownAction, setShownAction] = useState('');

    useEffect(() => {
        const url = new URL(window.location.href);
        const action = url.searchParams.get('action');
        setShownAction(action);
        switch (action) {
            case 'sign-in':
                if (isSignedIn()) {
                  window.ReactNativeWebView.postMessage("success");
                } else {
                    signIn();
                }
                break;
            case 'sign-out':
                window.ReactNativeWebView?.postMessage("sign-out");
                signOut();
                break;
            case 'ft_balance':
                ft_balance_of().then(e => {
                  window.ReactNativeWebView?.postMessage(e);
                  console.log(e);
                })
                break;
            default: break;
        }
        setIsSigned(isSignedIn());
    }, [])
  return (
      <div className="App">
        <header className="App-header">
            <p>action: {shownAction}</p>
              <p>
                isSinged: {isSigned ? 'true' : 'false'}
              </p>
          <button onClick={signIn}>signIn</button>
          <button onClick={signOut}>signOut</button>
          <button onClick={ft_balance_of}>ft_ba</button>
            <button onClick={nft_mint}>nft)mit</button>
      </header>
    </div>
  );
}

export default App;
