import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Label, Row } from "reactstrap";
import { tokenBalanceABI, TOKEN_ADDRESS } from '../../abi/ABI';
import { getCurrentUser } from "../../auth/auth";
import { getCurrentUserInfo } from "../../services/user-service";
import Base from "../Base";
import PageLoader from '../page-loader/PageLoader';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect to Metamask';
const CONNECTED_TEXT = 'Metamask Connected';
const Web3 = require('web3');
const web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/ukXBvGXFSkA7R3alQlK8Qg8qCBvLql3s');
let contract = new web3.eth.Contract(tokenBalanceABI, TOKEN_ADDRESS);



const UserDashboard = () => {

    // Metamask OnBoarding
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const onboarding = React.useRef();

    // Page Loading
    const [isLoading, setIsLoading] = useState(false);

    const logo = require('../../images/logo.png');
    const [user, setUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState();
    const [ethBalance, setEthBalance] = useState();
    const [cptTokenBalance, setCptTokenBalance] = useState();




    // Get Current User Info
    useEffect(() => {
        document.title = "Dashboard"

        getCurrentUser().then((res) => {
            //console.log(res.user_id);
            setUser(res);
            setIsLoading(true);

            getCurrentUserInfo(res.user_id)
                .then(userInfo => {
                    //console.log(userInfo);
                    setUserInfo(userInfo);
                    setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });

        });
        //getUserInfoById(user.user_id);



    }, [setUser, setUserInfo]);

    // Handle metamask Functionality
    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT);
                setDisabled(true);
                onboarding.current.stopOnboarding();
            } else {
                setButtonText(CONNECT_TEXT);
                setDisabled(false);
            }
        }
    }, [accounts]);

    React.useEffect(() => {

        function handleNewAccounts(newAccounts) {
            setAccounts(newAccounts);
            let web3 = new Web3(window.ethereum);
            web3.eth.getBalance(newAccounts[0])
                .then(balance => {
                    let balanceInEth = web3.utils.fromWei(balance, 'ether')
                    balanceInEth = (Math.round(balanceInEth * 100) / 100).toFixed(2);
                    //console.log(b);
                    setEthBalance(balanceInEth)
                }).catch(err => console.log(err));

            contract.methods.balanceOf(newAccounts[0]).call()
                .then(tokenBalance => {
                    const tokenBalanceInEth = web3.utils.fromWei(tokenBalance, 'ether');
                    //console.log(tokenBalanceInEth);
                    setCptTokenBalance(tokenBalanceInEth);
                }).catch(err => {
                    console.log(err);
                })

        }

        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleNewAccounts);
            window.ethereum.on('accountsChanged', handleNewAccounts);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleNewAccounts);
            };
        }
    }, []);

    const connectToMetamask = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((newAccounts) => setAccounts(newAccounts));
        } else {
            onboarding.current.startOnboarding();
        }
    };

    // account balance in eth

    return (
        <Base>

            {
                isLoading ? (
                    <div>
                        <PageLoader />
                    </div>
                ) : (
                    <div className="mt-2">
                        {
                            userInfo ? (
                                <div className="container">
                                    <Row>
                                        <Col sm="7">
                                            <div>
                                                <Card>
                                                    <CardBody>
                                                        <CardTitle tag="h5">
                                                            Welcome to CPL Crypt
                                                        </CardTitle>
                                                        <CardSubtitle
                                                            className="mb-2 text-muted"
                                                            tag="h6"
                                                        >
                                                            Send Token accross the world
                                                        </CardSubtitle>
                                                        <CardText>
                                                            Some quick example text to build on the card title and make up the bulk of the card‘s content.
                                                        </CardText>
                                                        <Button className="tex-center m-1"
                                                            disabled={isDisabled}
                                                            onClick={connectToMetamask}
                                                            color="primary"
                                                        >{buttonText}</Button>



                                                        <Button className="tex-center"
                                                            onClick={() => {
                                                                window.open("https://rinkebyfaucet.com/", "_blank");
                                                            }}
                                                            color="dark"
                                                        >
                                                            Add Test Eth
                                                        </Button>
                                                    </CardBody>

                                                </Card>

                                            </div>
                                        </Col>
                                        <Col sm="5">
                                            <Card className='eth-card p-2'>
                                                <div className="d-flex flex-column h-100">
                                                    <Label className="d-block">
                                                        <div className="d-flex position-relative">
                                                            <div>
                                                                <img src={logo}
                                                                    alt="master" className="master" style={{
                                                                        width: "40px",
                                                                        height: "40px",

                                                                    }} />

                                                            </div>
                                                            <div className="input ms-3">
                                                                <h4 style={{ color: "#000" }}>CPL CARD</h4>
                                                            </div>
                                                        </div>
                                                        <p className="text-white fw-bold">{userInfo.name}</p>
                                                    </Label>
                                                    <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                                                        <p className="m-0 text-truncate">{accounts}</p>

                                                    </div>
                                                    <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                                                        {
                                                            ethBalance ? (
                                                                <p className="m-0 ">{`${ethBalance} ETH`}</p>
                                                            ) : (
                                                                <p className="m-0"></p>
                                                            )
                                                        }

                                                    </div>
                                                    <div className="mt-auto fw-bold d-flex align-items-center justify-content-between">
                                                        {
                                                            ethBalance ? (
                                                                <p className="m-0 ">{`${cptTokenBalance} CPT`}</p>
                                                            ) : (
                                                                <p className="m-0"></p>
                                                            )
                                                        }

                                                    </div>
                                                </div>

                                            </Card>


                                        </Col>
                                    </Row>
                                </div>
                            ) : (<div></div>)
                        }


                    </div>
                )
            }



        </Base >
    );
}

export default UserDashboard;