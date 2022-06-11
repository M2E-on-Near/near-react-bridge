import React, {useEffect, useState} from "react";
import './App.css';
import {signIn, signOut, isSignedIn} from "./near";

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
      </header>
    </div>
  );
}

export default App;
