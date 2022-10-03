import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button } from "reactstrap";
import { tokenBalanceABI, TOKEN_ADDRESS } from '../../abi/ABI';
import { getCurrentUser } from "../../auth/auth";
import { DISCORD_URL, LOCALHOST_DISCORD_URL } from "../../services/helper";
import { getCurrentUserInfo } from "../../services/user-service";
import Base from "../Base";
import PageLoader from "../page-loader/PageLoader";
import Transaction from './Transaction';


const logo = require('../../images/logo.png');
const Web3 = require('web3');
const web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/ukXBvGXFSkA7R3alQlK8Qg8qCBvLql3s');
let contract = new web3.eth.Contract(tokenBalanceABI, TOKEN_ADDRESS);

// Discord
/* const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2(); */



const UserDashboard = () => {

    // Page Loading
    const [isLoading, setIsLoading] = useState(false);
    //const [txLoading, setTxLoading] = useState(false);
    const [transaction, setTransaction] = useState({ result: [] });


    //const [user, setUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState();
    const [ethBalance, setEthBalance] = useState();
    const [cptTokenBalance, setCptTokenBalance] = useState();



    useEffect(() => {
        document.title = "Dashboard";
    });

    // Get Current User Info
    useEffect(() => {


        getCurrentUser().then((res) => {
            //console.log(res.user_id);
            //setUser(res);
            setIsLoading(true);

            getCurrentUserInfo(res.user_id)
                .then(async (userInfo) => {
                    //console.log(userInfo);
                    setUserInfo(userInfo);


                    web3.eth.getBalance(userInfo.wallet.accountAddress)
                        .then(balance => {
                            let balanceInEth = web3.utils.fromWei(balance, 'ether')
                            balanceInEth = (Math.round(balanceInEth * 100) / 100).toFixed(2);
                            //console.log(b);
                            setEthBalance(balanceInEth);
                            setIsLoading(false);
                        }).catch(err => {
                            console.log(err);
                            setIsLoading(false);
                        });

                    contract.methods.balanceOf(userInfo.wallet.accountAddress).call()
                        .then(tokenBalance => {
                            const tokenBalanceInEth = web3.utils.fromWei(tokenBalance, 'ether');
                            //console.log(tokenBalanceInEth);
                            setCptTokenBalance(tokenBalanceInEth);
                        }).catch(err => {
                            console.log(err);
                        });

                    //Get All Trasactions
                    try {
                        let url = "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" + userInfo.wallet.accountAddress + "&startblock=0&endblock=99999999&sort=desc&apikey=FNF91N2DU5MQI9AQFKNNE96FR79DFN65XZ";
                        //setTransaction();
                        //console.log(url);

                        const res = await axios.get(`${url}`);
                        //setTransaction();

                        //console.log(transaction);
                        setTransaction({ result: res.data.result });
                        setIsLoading(false);
                        // console.log(res.data.result);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }

                }).catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });

        });
        //getUserInfoById(user.user_id);



    }, [setUserInfo]);

    //console.log(userInfo);

    const handleImportToken = () => {
        //var getUrl = window.location;
        let tokenImgUrl = window.location.protocol
            + "//" +
            window.location.host
            + "/static/media/logo.55ea5d65395e2b30d4cd.png";

        // console.log(tokenImgUrl);
        if (typeof window.ethereum !== 'undefined') {
            //console.log('MetaMask is installed!');
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
        } else {
            toast.error("Please Install Metamask!")
        }

    }

    return (
        <Base>
            {
                isLoading ? (<PageLoader />) : (
                    userInfo ? (
                        <section className="h-100 gradient-custom-2">
                            <div className="container py-2 h-100">
                                <div className="row d-flex flex-column align-items-center ">
                                    <div className="col col-lg-9 col-xl-7">
                                        <div className="card">
                                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: ' #000', height: '200px' }}>
                                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                                    <img src={logo}
                                                        alt="Generic placeholder" className="img-fluid img-thumbnail p-2 mt-4 mb-2"
                                                        style={{ width: '150px', background: '#000', zIndex: '1' }} />
                                                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                                        style={{ zIndex: 1 }}>
                                                        Edit profile
                                                    </button>
                                                </div>
                                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                                    <h5>{userInfo.name}</h5>
                                                    <p>{userInfo.username}</p>
                                                </div>
                                            </div>
                                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                                <div className="d-flex justify-content-end text-center py-1">
                                                    <div>
                                                        <p className="mb-1 h5">{ethBalance}</p>
                                                        <p className="small text-muted mb-0">ETH</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="mb-1 h5">{cptTokenBalance}</p>
                                                        <p className="small text-muted mb-0">CPT</p>
                                                    </div>
                                                    {/* <div>
                                                    <p className="mb-1 h5">478</p>
                                                    <p className="small text-muted mb-0">Following</p>
                                                </div> */}
                                                </div>
                                            </div>
                                            <div className="card-body p-4 text-black">
                                                <div className="mb-5">
                                                    <p className="lead fw-normal mb-1">Wallet</p>
                                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                                        <p className="font-italic mb-1 text-truncate">{`Account: ${userInfo.wallet.accountAddress}`}</p>
                                                        <p className="font-italic mb-1 text-truncate">{`Private Key: ${userInfo.wallet.privateKey}`}</p>
                                                        <p className="font-italic mb-0">{``}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <p className="lead fw-normal mb-0">Recent Transactions</p>
                                                    <div className="mb-0"><Link to='/user/my-transactions' >Show all</Link></div>
                                                </div>
                                                <div className="grid">
                                                    {
                                                        //console.log(transaction.result.length)
                                                        (transaction.result.length > 0) ?
                                                            (
                                                                transaction.result.slice(0, 6).map(
                                                                    (item) => <Transaction tx={item} />
                                                                    //console.log(item)
                                                                )

                                                            ) : (
                                                                <div className="container text-center">
                                                                    <h1>No Transaction Yet!</h1>
                                                                </div>
                                                            )
                                                    }



                                                </div>


                                                <div className="mt-4 d-flex justify-content-center">
                                                    <Button className="m-2 btn-dark btn-dark"
                                                        onClick={() => {
                                                            window.open("https://rinkebyfaucet.com/", "_blank");
                                                        }}
                                                    >Add Test Ether</Button>
                                                    <Button className="m-2 btn-info" onClick={handleImportToken}>Import Token to Metamask</Button>
                                                    <Button className="m-2 btn" color="primary"
                                                        disabled={(userInfo.discordInfo != null) ? true : false}
                                                        onClick={() => {
                                                            //console.log(window.location.hostname);
                                                            if (window.location.hostname === 'localhost') {
                                                                window.open(LOCALHOST_DISCORD_URL, "_blank");

                                                            } else {
                                                                window.open(DISCORD_URL, "_blank");
                                                            }
                                                            //
                                                        }}
                                                    >{(userInfo.discordInfo != null) ? 'Already Merged' : 'Merge Discord'}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section >
                    ) : ("")
                )
            }
        </Base >
    );
};

export default UserDashboard;