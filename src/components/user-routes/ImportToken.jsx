import React from 'react';
import { toast } from 'react-toastify';
import { Button } from "reactstrap";
import Base from "../Base";

const ImportToken = () => {



    const handleImportToken = () => {
        //var getUrl = window.location;
        let tokenImgUrl = window.location.protocol
            + "//" +
            window.location.host
            + "/static/media/logo.55ea5d65395e2b30d4cd.png";

        console.log(tokenImgUrl);

        window.ethereum
            .request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: '0x0877e37a200836ba682b0fc2e7d660edabbd6e27',
                        symbol: 'CPT',
                        decimals: 18,
                        image: tokenImgUrl,
                    },
                },
            })
            .then((success) => {
                if (success) {
                    toast('CPT successfully added to wallet!');
                } else {
                    throw new Error('Something went wrong.');
                }
            })
            .catch(console.error);

        // window.ethereum.request({
        //     method: 'eth_chainId',
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => console.log(err));
    }

    return (
        <Base>
            <div className="container text-center">
                <h1>This is Import Token Page</h1>
                <Button color="primary"
                    onClick={handleImportToken}
                >Import Token</Button>
            </div>
        </Base>
    );
}

export default ImportToken;