import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { tokenTransferABI, TOKEN_ADDRESS } from '../../abi/ABI';
import Base from "../Base";
import Loader from "../Loader";

const Web3 = require('web3');
const web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/ukXBvGXFSkA7R3alQlK8Qg8qCBvLql3s');

const SendToken = () => {



    const [metamaskAccount, setMetamaskAccount] = useState('');

    const [token, setToken] = useState({
        addressTo: '',
        amount: '',
        message: ''
    });
    const [loader, setLoader] = useState(false);

    const handleChange = async (event, field) => {
        setToken({ ...token, [field]: event.target.value });





    };

    const resetTokenData = () => {
        setToken({
            addressTo: '',
            amount: '',
            message: ''
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setLoader(true);
        console.log("token: ", token);

        if (typeof window.ethereum !== 'undefined') {
            //console.log('MetaMask is installed!');
            try {
                let resAcc = await window.ethereum
                    .request({ method: 'eth_requestAccounts' });

                let fromAddress = resAcc.toString();

                const tokenAddress = TOKEN_ADDRESS;
                const toAddress = token.addressTo;
                let contractABI = tokenTransferABI;


                //console.log(env.TOKEN_ADDRESS, fromAddress);

                let contract = new web3.eth.Contract(contractABI, tokenAddress, { from: fromAddress })
                let amount = web3.utils.toHex(web3.utils.toWei(token.amount)); //1 DEMO Token
                let data = contract.methods.transfer(toAddress, amount).encodeABI();

                let txObj = {
                    gas: web3.utils.toHex(100000),
                    "to": tokenAddress,
                    "value": "0x00",
                    "data": data,
                    "from": fromAddress

                };
                await window.ethereum
                    .request({
                        method: "eth_sendTransaction",
                        params: [txObj],
                    })
                    .then((txhash) => {
                        console.log(txhash)
                        checkTxConfirmation(txhash)
                            .then(res => {
                                toast.success('Transaction Successfull')
                                setLoader(false);
                            }).catch((err) => {
                                toast.error('Transaction Failed!')
                                setLoader(false);
                            });
                    }).catch((error) => {
                        console.error(error);
                        setLoader(false);
                    });
            } catch (error) {
                console.log("Error: ", error);
                setLoader(false);
            }

        } else {
            toast.error("Please Install Metamask!");
            setLoader(false);
        }


    };

    // Send Token

    // Transaction confirmation
    function checkTxConfirmation(txhash) {
        let checkTxLoop = () => {
            return window.ethereum.request({
                method: 'eth_getTransactionReceipt',
                params: [txhash]
            }).then(result => {
                if (result != null) return 'Confirmed!'
                else return checkTxLoop();
            })
        };
        return checkTxLoop();
    }





    useEffect(() => {
        document.title = "Send Token"
    });
    return (
        <Base>
            <Container className="mt-5" >
                <Form onSubmit={submitForm}>

                    <FormGroup>
                        <Label for="addressTo">Address To</Label>
                        <Input type="text"
                            name="addressTo"
                            id="addressTo"
                            placeholder="0x747F6cFbc9Eb40EDb4ad971e6017fd88439E2e5b"
                            onChange={(e) => handleChange(e, 'addressTo')}
                            value={token.addressTo}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount ( CPT )</Label>
                        <Input type="number"
                            name="amount"
                            id="amount"
                            placeholder="1"
                            onChange={(e) => handleChange(e, 'amount')}
                            value={token.amount}

                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="message">Enter Message</Label>
                        <Input type="text"
                            name="message"
                            id="message"
                            placeholder="message"
                            onChange={(e) => handleChange(e, 'message')}
                            value={token.message}

                        />
                    </FormGroup>

                    <Container className="text-center">
                        {
                            loader ?
                                (<Loader name="Sending Token" />)
                                : (
                                    <div>
                                        <Button color="primary" type="submit" onSubmit={submitForm} className="me-1" outline >Send Token</Button>
                                        <Button type="reset" onClick={resetTokenData} className="ms-1">Clear</Button>
                                    </div>
                                )
                        }
                    </Container>
                </Form>
            </Container >

        </Base >
    );
};

export default SendToken;