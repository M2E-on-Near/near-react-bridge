import React, {useEffect, useRef, useState} from "react";
import './App.css';
import {signIn, signOut, isSignedIn} from "./near";

function App() {
    const [isSigned, setIsSigned] = useState(false);
    const [triggerActionLoopReload, setTriggerActionLoopReload] = useState(false);
    const actionLoopIntervalID = useRef(0);

    useEffect(() => {
        clearInterval(actionLoopIntervalID.current);
        // actionLoopIntervalID.current = setInterval(() => {
            // window.ReactNativeWebView?.postMessage(JSON.parse(localStorage.getItem('action')).action);
            // window.ReactNativeWebView?.postMessage(JSON.parse(JSON.stringify({action: "sign"})).action);
            // window.ReactNativeWebView?.postMessage(JSON.parse(localStorage.getItem('action')).action);
            const action = JSON.parse(localStorage.getItem('action'));
            window.ReactNativeWebView?.postMessage(`${action.action}`);
            if (window.action) {
                window.ReactNativeWebView?.postMessage('staic');
                window.ReactNativeWebView?.postMessage('if action');
                switch (window.action.action) {
                    case 'sign-in':
                        window.ReactNativeWebView?.postMessage('sign-in attempt');
                        console.log('sign-in attempt')
                        window.action = undefined;
                        localStorage.removeItem('action');
                        if (isSignedIn()) {
                            window.ReactNativeWebView?.postMessage("success");
                        } else {
                            signIn();
                        }
                        break;
                    case 'sign-out':
                        window.ReactNativeWebView?.postMessage('sign-out attempt');
                        console.log('sign-out attempt')
                        localStorage.removeItem('action');
                        window.action = undefined;
                        signOut();
                        window.ReactNativeWebView?.postMessage("signed out");
                        break;
                    // case 'some-async-action':
                    //     clearInterval(actionLoopIntervalID.current);
                    //     setTimeout(()=>console.log('timeout'), 1000);
                    //     setTriggerActionLoopReload(t => !t);
                    //     break;
                    default: break;
                }
            }
        // }, 100);
        setIsSigned(isSignedIn());
    }, [triggerActionLoopReload]);
  return (
      <div className="App">
        <header className="App-header">
          <p> isSigned: {isSigned ? 'true' : 'false'} </p>
            <button onClick={()=>setTriggerActionLoopReload(t => !t)}>trigger</button>
          <button onClick={signIn}>signIn</button>
          <button onClick={signOut} style={{height: 200}}>signOut</button>
      </header>
    </div>
  );
}

export default App;
