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

function getKrockContract() {
    return new nearAPI.Contract(
        wallet.account(),
        'krock.testnet',
        {
            viewMethods: ['ft_balance_of'],
        }
    );
}

function getKrockNftContract() {
    return new nearAPI.Contract(
        wallet.account(),
        'krock-nft.testnet',
    {
        changeMethods: ['nft_mint', 'update_stats'],
        }
    );
}

export async function ft_balance_of() {
    const contract = getKrockContract();
    return contract.ft_balance_of({account_id: wallet.account().accountId})
        .catch (e => {console.error(e); return 0;});
}

export async function nft_mint() {
    const GAS = "200000000000000";
    const deposit = "7990000000000000000000";
    const contract = getKrockNftContract();
    return contract.nft_mint({
        token_id: 'token-' + Date.now(),
        receiver_id: wallet.account().accountId,
        token_metadata: {
            title: "Yurii",
            description: "working nft",
            media: "https://pbs.twimg.com/media/FU_9Kz4WQAMFAtr?format=png&name=small",
            issued_at: Date.now().toString(),
            extra: JSON.stringify({
                level: 1,
                stamina: 20,
                income: 3,
                recovery: 2,
                energy: 90
            }),
        }
    }, GAS, deposit).then(e => console.log(e))
}