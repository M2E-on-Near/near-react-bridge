import * as nearAPI from 'near-api-js';

import {Buffer} from "buffer";
window.Buffer = Buffer;

const { connect, keyStores, WalletConnection } = nearAPI;

export const config = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
};

let wallet
connect(config).then(near =>
    wallet = new WalletConnection(near)
);

export const signIn = () => {
    wallet.requestSignIn(
        "example-contract.testnet", // contract requesting access
        "Example App", // optional
    );
};

export const isSignedIn = () => {
    return wallet?.isSignedIn();
}

export const signOut = () => {
    wallet.signOut();
}