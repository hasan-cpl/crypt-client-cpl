import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { tokenTransferABI, TOKEN_ADDRESS } from '../../abi/ABI';
import { getCurrentUser } from "../../auth/auth";
import { getCurrentUserInfo } from "../../services/user-service";
import Base from "../Base";
import Loader from "../Loader";

const Web3 = require('web3');
const web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/ukXBvGXFSkA7R3alQlK8Qg8qCBvLql3s');

const SendToken = () => {


    const [userInfo, setUserInfo] = useState();
    //const [isMetamask, setIsMetamask] = useState(false);
    const [loader, setLoader] = useState(false);
    const [rSelected, setRSelected] = useState(1);

    //const [metamaskAccount, setMetamaskAccount] = useState('');

    const [tokenData, setTokenData] = useState({
        addressTo: '',
        amount: '',
        message: ''
    });


    useEffect(() => {

        document.title = "Send Token";

        getCurrentUser().then(async (res) => {
            //console.log(res.user_id);

            getCurrentUserInfo(res.user_id)
                .then(userInfo => {
                    //console.log(userInfo);
                    setUserInfo(userInfo);
                    //setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                    //setIsLoading(false);
                });

        });
    }, [setUserInfo])

    const handleChange = async (event, field) => {
        setTokenData({ ...tokenData, [field]: event.target.value });

    };

    const resetTokenData = () => {
        setTokenData({
            addressTo: '',
            amount: '',
            message: ''
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setLoader(true);
        //console.log("tokenData: ", tokenData);
        //console.log("isMetamask: ", isMetamask);

        if (rSelected === 2) {
            sendTokenViaMetmask(tokenData);
            console.log('Metmask');
        } else {
            console.log('System');
            sendTokenViaABI(tokenData);
        }






    };

    const sendTokenViaABI = async (tokenData) => {



        //console.log(userInfo);

        const fromAddress = userInfo.wallet.accountAddress;
        const privateKey = userInfo.wallet.privateKey;



        let contract = new web3.eth.Contract(tokenTransferABI, TOKEN_ADDRESS, { from: fromAddress })
        let amount = web3.utils.toHex(web3.utils.toWei(tokenData.amount)); //1 DEMO Token
        let data = contract.methods.transfer(tokenData.addressTo, amount).encodeABI();

        let txObj = {
            gas: web3.utils.toHex(100000),
            "to": TOKEN_ADDRESS,
            "value": "0x00",
            "data": data,
            "from": fromAddress

        };

        web3.eth.accounts
            .signTransaction(txObj, privateKey)
            .then(signedTx => {
                web3.eth
                    .sendSignedTransaction(signedTx.rawTransaction)
                    .then(sendSignTx => {
                        console.log(sendSignTx);
                        toast.success('Transaction Successfull')
                        setLoader(false);
                    })
                    .catch(err => {
                        setLoader(false);
                        console.log(err)
                        toast.error('Transaction Failed!')
                    })
            })
            .catch(err => {
                setLoader(false);
                console.log(err);
                toast.error('Transaction Failed!')
            });

    }

    // Send Token via metamask

    const sendTokenViaMetmask = async (tokenData) => {



        if (typeof window.ethereum !== 'undefined') {
            //console.log('MetaMask is installed!');
            try {
                let resAcc = await window.ethereum.request({ method: 'eth_requestAccounts' });

                let fromAddress = resAcc.toString();


                const tokenAddress = TOKEN_ADDRESS;
                const toAddress = tokenData.addressTo;
                let contractABI = tokenTransferABI;


                //console.log(env.TOKEN_ADDRESS, fromAddress);

                let contract = new web3.eth.Contract(contractABI, tokenAddress, { from: fromAddress })
                let amount = web3.utils.toHex(web3.utils.toWei(tokenData.amount)); //1 DEMO Token
                let data = contract.methods.transfer(toAddress, amount).encodeABI();

                let txObj = {
                    gas: web3.utils.toHex(100000),
                    "to": tokenAddress,
                    "value": "0x00",
                    "data": data,
                    "from": fromAddress

                };
                window.ethereum
                    .request({
                        method: "eth_sendTransaction",
                        params: [txObj],
                    })
                    .then((txhash) => {
                        console.log(txhash)
                        checkTxConfirmation(txhash)
                            .then(res => {
                                toast.success('Transaction Successfull');
                                setLoader(false);
                            }).catch((err) => {
                                toast.error('Transaction Failed!');
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

    }

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

    console.log(rSelected);




    
    return (
        <Base>
            <Container className="mt-5" >
                <Form onSubmit={submitForm}>
                    <div className="text-center">
                        <h1>Send Token (CPT)</h1>
                        <div className="mb-2">
                        <ButtonGroup>
                            <Button
                                color="primary"
                                outline
                                onClick={() => setRSelected(1)}
                                active={rSelected === 1}
                            >
                                System
                            </Button>
                            <Button
                                color="primary"
                                outline
                                onClick={() => setRSelected(2)}
                                active={rSelected === 2}
                            >
                                Metamask
                            </Button>
                            
                        </ButtonGroup>
                    </div>
                    </div>
                   

                    <FormGroup>
                        <Label for="addressTo">Address To</Label>
                        <Input type="text"
                            name="addressTo"
                            id="addressTo"
                            placeholder="0x747F6cFbc9Eb40EDb4ad971e6017fd88439E2e5b"
                            onChange={(e) => handleChange(e, 'addressTo')}
                            value={tokenData.addressTo}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount ( CPT )</Label>
                        <Input type="number"
                            name="amount"
                            id="amount"
                            placeholder="0"
                            onChange={(e) => handleChange(e, 'amount')}
                            value={tokenData.amount}

                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="message">Enter Message</Label>
                        <Input type="text"
                            name="message"
                            id="message"
                            placeholder="message"
                            onChange={(e) => handleChange(e, 'message')}
                            value={tokenData.message}

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