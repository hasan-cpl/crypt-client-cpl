import React from "react";
import { Link } from "react-router-dom";
import Base from "../Base";


const Guideline = () => {
    const gettingStartLink = "https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask";
    const importAccountLink = "https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-account";
    const connectDisconnectSwitchLink = "https://help.1inch.io/en/articles/4666771-metamask-how-to-connect-disconnect-and-switch-accounts-with-metamask-on-1inch-network";
    return (
        <Base>
            <div>

                <h2>1. At first, <Link to='' onClick={() => {
                    window.open(gettingStartLink, "_blank");
                }}>install</Link> Metamask on your browser.</h2>

                <h2>2. Then <Link to='' onClick={() => {
                    window.open(importAccountLink, "_blank");
                }}>import</Link> your account using provided private key.</h2>

                <h2>3. Select your imported account in metamask.</h2>
                <p>You can follow this <Link to='' onClick={() => {
                    window.open(connectDisconnectSwitchLink, "_blank");
                }}>link</Link> how to connect, disconnect, and switch accounts with Metamask?</p>

            </div>
        </Base>
    );
};

export default Guideline;