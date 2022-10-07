import React, { useEffect, useState } from "react";
import { FcPrevious } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button } from "reactstrap";
import Web3 from "web3";
import { getCurrentUser } from "../../../auth/auth";
import { myAxios, WEB_3_PROVIDER_URL } from "../../../services/helper";
import { getCurrentUserInfo } from "../../../services/user-service";
import { contractABI, contractAddress } from "../../../utils/constants";
import Base from "../../Base";
import PageLoader from "../../page-loader/PageLoader";


const web3 = new Web3(WEB_3_PROVIDER_URL);

const VoteDetails = () => {

    const params = useParams();
    let votingContract = new web3.eth.Contract(contractABI, contractAddress);

    const [vote, setVote] = useState({});
    const [totalUser, setTotalUser] = useState(1);
    const [loader, setLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);
    const [userInfo, setUserInfo] = useState();
    //console.log(params.id);

    useEffect(() => {
        document.title = "Vote";
    });



    useEffect(() => {

        setPageLoader(true);

        votingContract.methods.getAllVote().call()
            .then(res => {
                //console.log(res);
                let arr = [...res];
                const proposal = arr.filter(proposal => proposal.proposalNumber === params.id);
                setVote(proposal[0]);
                //setPageLoader(false);

                myAxios.get(`/api/v1/users`)
                    .then(res => {
                        //console.log(res.data);
                        setTotalUser(res.data.total);
                        setPageLoader(false);

                    }).catch(err => {
                        console.error(err)
                        setPageLoader(false);
                    });

            }).catch(err => {
                console.error(err);
                setPageLoader(false);
            });

    }, [params, setVote]);

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
    }, [setUserInfo]);

    const yesVote = vote.totalVote > 0 ? (
        ( (Number(vote.yesVoteCount) / Number(totalUser)) * 100).toFixed(2)
     ) : (0);

    //console.log(vote);
    //console.log(totalUser);

    const handleYesBtn = (event) => {

        setLoader(true);
        console.log(vote);
        let data = votingContract.methods.toVote(vote.proposalNumber, 1)
            .encodeABI();

        const fromAddress = userInfo.wallet.accountAddress;
        const privateKey = userInfo.wallet.privateKey;

        let txObj = {
            gas: web3.utils.toHex(300000),
            "to": contractAddress,
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
                        toast.success('Transaction Successful')
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
                toast.error('Transaction Failed!!')
            });


        console.log("Yes");

    }
    const handleNoBtn = (event) => {
        setLoader(true);

        let data = votingContract.methods.toVote(vote.proposalNumber, 0)
            .encodeABI();

        const fromAddress = userInfo.wallet.accountAddress;
        const privateKey = userInfo.wallet.privateKey;

        let txObj = {
            gas: web3.utils.toHex(300000),
            "to": contractAddress,
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
                        toast.success('Transaction Successful')
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
                toast.error('Transaction Failed!!')
            });


        console.log("No");
    }





    return (
        <Base>
            {
                pageLoader ? (<PageLoader />)
                    : (
                        <div className="h-100 vote-background">
                            <div className="container">
                                <div className="bg-dark p-2 d-flex justify-content-between align-items-center">
                                    <h1 className="text-white d-inline-block">Voting</h1>
                                </div>

                                <div className="bg-dark mt-2"
                                >
                                    <Link className="p-2 border border-dark d-inline-block"
                                        style={{
                                            textDecoration: 'none',
                                            background: '#292929'
                                        }}
                                        to="/user/votes"
                                        action
                                        tag="a"
                                    >
                                        <h3 className="text-white" ><FcPrevious />Back</h3>
                                    </Link>

                                </div>

                                <div className="vote-body mt-3 vote-background" >
                                    <div className="d-flex justify-content-between">
                                        <div className="main-part card m-1 p-2 w-75" style={{ background: "#35425E" }}>
                                            <h4 className="text-white">{`Vote #${vote.proposalNumber}`}</h4>

                                            <div className="mt-5 d-md-flex justify-content-between align-items-center">
                                                <div className="me-1 text-truncate">
                                                    <h5 className="text-truncate">Description</h5>
                                                    <h5 className="text-white text-truncate">{vote.proposal}</h5>

                                                </div>
                                                <div className="ms-1 text-truncate">
                                                    <h5 className="text-truncate">Created By</h5>
                                                    <h5 className="text-white text-truncate">{vote.proposalCreator}</h5>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <h5 className="text-white">🟢 Yes {`${vote.yesVoteCount > 0 ? (
                                                    ((Number(vote.yesVoteCount) / Number(totalUser)) * 100).toFixed(2)
                                                ) : (0)}%`}</h5>
                                                <h5 className="text-white">🔴 No {`${vote.noVoteCount > 0 ? (
                                                    ((Number(vote.noVoteCount) / Number(totalUser)) * 100).toFixed(2)
                                                ) : (0)}%`}</h5>
                                            </div>

                                            <div >

                                                {
                                                    vote.endTime > Date.now() ? (
                                                        <div className="btn-div">
                                                            {
                                                                loader ?
                                                                    (
                                                                        <Button className="me-2 w-100" color="info" disabled>
                                                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                                            {` Voting ...`}
                                                                        </Button>
                                                                    )
                                                                    : (

                                                                        <div className="mt-3 d-md-flex justify-content-between align-items-center">
                                                                            <Button className="me-2 w-100"
                                                                                color="success"
                                                                                onClick={handleYesBtn}
                                                                            >✔️ Yes</Button>

                                                                            <Button className="ms-2 w-100"
                                                                                id="exampleModal"
                                                                                color="danger"
                                                                                onClick={handleNoBtn}
                                                                            >❌ No</Button>

                                                                        </div>

                                                                    )
                                                            }
                                                            <div className="mt-2 p-1 border-start" style={{ background: '#415279' }}>
                                                                <p className="text-info">May voting can create a transaction!!</p>
                                                            </div>
                                                        </div>

                                                    ) : (
                                                        <div className="text-center">
                                                        {
                                                            yesVote >= 51 ?
                                                                (<h5 className="text-success">Success ✔️</h5>)
                                                                : (<h5 className="text-danger">Rejected ❌</h5>)
                                                        }
                            
                                                    </div>
                                                    )
                                                }






                                            </div>



                                        </div>
                                        <div className="side-part card m-1 p-2 w-25" style={{ background: "#35425E" }}>



                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }

        </Base>
    );

}

export default VoteDetails;