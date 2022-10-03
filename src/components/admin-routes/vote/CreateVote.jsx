import React, { useEffect, useState } from "react";
import { FcPrevious } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button, Form, Input, Label } from "reactstrap";
import Web3 from 'web3';
import { getCurrentUser } from "../../../auth/auth";
import { WEB_3_PROVIDER_URL } from "../../../services/helper";
import { getCurrentUserInfo } from "../../../services/user-service";
import { contractABI, contractAddress } from "../../../utils/constants";
import Base from "../../Base";
import Loader from "../../Loader";

const web3 = new Web3(WEB_3_PROVIDER_URL);

const CreateVote = () => {


    const [proposal, setProposal] = useState('');
    const [measure, setMeasure] = useState('');
    const [unit, setUnit] = useState('');
    const [loader, setLoader] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const votingContract = new web3.eth.Contract(contractABI, contractAddress);

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

    console.log(userInfo);

    const handleCreateVote = async (event) => {
        //const getAllProposal = await votingContract;

        //const pCount = await votingContract.methods.ec().call();
        console.log(proposal);

        event.preventDefault();

        if (proposal.trim() === '') {
            toast.error('Please insert Proposal');
            return;
        } else if (measure.trim() === '') {
            toast.error('Please insert End After');
            return;
        } else if (unit.trim() === '') {
            toast.error('Please insert Unit');
            return;
        }

        setLoader(true);

        let data = votingContract.methods
            .addVote(proposal, Date.now(), Date.now() + measure * 3600)
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




        /*  if (typeof window.ethereum !== 'undefined') {
            try {

                let resAcc = await window.ethereum.request({ method: 'eth_requestAccounts' });

                let fromAddress = resAcc.toString();
                let data = await votingContract
                    .methods.addVote(proposal, Date.now(), Date.now() + measure * 3600);

                let txObj = {
                    gas: web3.utils.toHex(300000),
                    "to": contractAddress,
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
                        console.log(txhash);
                        checkTxConfirmation(txhash)
                            .then(res => {
                                toast.success('Transaction Successful');
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
                console.error(error);
            }
        }  
        /*  web3.eth.accounts
             .signTransaction(txObj, privateKey)
             .then(signedTx => {
                 web3.eth
                     .sendSignedTransaction(signedTx.rawTransaction)
                     .then(sendSignTx => {
                         console.log(sendSignTx);
                         //toast.success('Transaction Successfull')
                         //setLoader(false);
                     })
                     .catch(err => {
                         //setLoader(false);
                         console.log(err)
                         //toast.error('Transaction Failed!')
                     })
             })
             .catch(err => {
                 //setLoader(false);
                 console.log(err);
                // toast.error('Transaction Failed!')
             }); */


        /* const getAllProposal = await votingContract.methods.getAllVote().call();

        console.log(getAllProposal); */


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



    return (
        <Base>
            <div className="h-100 gradient-custom-2">
                <div className="container">
                    <div className="bg-dark">
                        <h1 className="text-white d-inline-block">Voting</h1>
                    </div>

                    <div className="bg-dark mt-2"
                    >
                        <Link className="p-2 border border-dark d-inline-block"
                            style={{
                                textDecoration: 'none',
                                background: '#292929'
                            }}
                            to="/admin/vote"
                            action
                            tag="a"
                        >
                            <h3 className="text-white" ><FcPrevious />Back</h3>
                        </Link>

                    </div>

                    <div className="container mt-5">
                        <h1 className="text-center text-white">Create Proposal</h1>
                        <Form className="container" onSubmit={handleCreateVote}>
                            <div className="d-flex flex-row align-items-center mb-2">

                                {/* Question */}
                                <div className="form-outline flex-fill mb-0">
                                    <Input type="text" id="question"
                                        className="form-control"
                                        placeholder="Are you Crazy?"
                                        onChange={(e) => {
                                            setProposal(e.target.value);
                                        }}
                                    /* value={user.question} */
                                    />
                                    <Label className="form-Label text-white"
                                        for="name"
                                    >Proposal</Label>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-2">

                                {/* Start Date */}
                                <div className="form-outline flex-fill mb-0 me-1">
                                    <Input type="number" id="start-date"
                                        className="form-control"
                                        placeholder="0"
                                        onChange={(e) => {
                                            setMeasure(e.target.value);
                                        }}
                                    /* value={user.name} */
                                    />
                                    <Label className="form-Label text-white"
                                        for="start-date"
                                    >End After</Label>
                                </div>

                                {/* Start Time */}
                                <div className="form-outline flex-fill mb-0 ms-1">
                                    {/*   <Input type="time" id="start-time"
                                        className="form-control"
                                     onChange={(e) => handleChang(e, 'name')} 
                                     value={user.name} 
                                    /> */}
                                    <select class="form-control"
                                        id="exampleFormControlSelect1"
                                        onChange={(e) => {
                                            setUnit(e.target.value);
                                        }}
                                    >
                                        <option>Please select unit</option>
                                        <option>Minute</option>
                                        <option>Hour</option>
                                        <option>Day</option>
                                    </select>
                                    <Label className="form-Label text-white"
                                        for="start-time"
                                    >Minute/Hour/Day</Label>
                                </div>
                            </div>



                            <div className="d-flex justify-content-center">
                                {
                                    loader ? (<Loader name="Creating vote" />)
                                        : (
                                            <Button color="primary"
                                                type="submit"
                                            >Create Vote</Button>
                                        )
                                }
                            </div>


                        </Form>
                    </div>






                </div>
            </div>

        </Base>
    );

}

export default CreateVote;