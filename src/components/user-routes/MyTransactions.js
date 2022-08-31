import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Button, Table } from "reactstrap";
import Base from "../Base";
import PageLoader from "../page-loader/PageLoader";



const MyTransactions = () => {

    /*     const Web3 = require('web3');
        const web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/ukXBvGXFSkA7R3alQlK8Qg8qCBvLql3s');
    
     */
    const [metamaskAccount, setMetamaskAccount] = useState('');
    // Page Loading
    const [isLoading, setIsLoading] = useState(false);

    const [transaction, setTransaction] = useState({ result: [] });

    useEffect(() => {
        document.title = "Dashboard";
        setIsLoading(true);

        if (typeof window.ethereum !== 'undefined') {
            //console.log('MetaMask is installed!');
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async (res) => {
                    // Return the address of the wallet
                    //toast("Metamask connected to account : " + res);
                    setMetamaskAccount(res[0]);
                    //console.log(res[0]);
                    let account = res[0];

                    try {


                        let url = "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" + account + "&startblock=0&endblock=99999999&sort=desc&apikey=FNF91N2DU5MQI9AQFKNNE96FR79DFN65XZ";
                        //setTransaction();
                        //console.log(url);

                        const res = await axios.get(`${url}`);
                        //setTransaction();

                        //console.log(transaction);
                        setTransaction({ result: res.data.result });
                        setIsLoading(false);
                        //console.log(res.data.result);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
                });
        } else {
            toast.error("Please Install Metamask!");
            setIsLoading(false);
        }

    }, [setTransaction]);










    return (
        <Base>
            {
                isLoading ? (
                    <PageLoader/>
                ) : (
                    <div className="container">
                    <Table className="mt-3"
                        bordered hover responsive
                    >
                        <thead>
                            <tr>
                                <th>Nonce</th>
                                <th>Send/Received</th>
                                <th>Status</th>
                                <th>TxHash</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
    
                                (transaction.result.length > 0) ? (
    
                                    transaction.result.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{(metamaskAccount === item.from) ? ("Send") : ("Received")}</td>
                                            <td>{(item.isError !== "0") ? (<p style={{ color: "red" }}>Failed</p>) : (<p>Success</p>)}</td>
                                            <td>{item.hash}</td>
                                            <td className="text-center">
                                                <Button onClick={() => {
                                                    window.open(`https://rinkeby.etherscan.io/tx/${item.hash}`, "_blank");
                                                }}
                                                    color="primary">Details</Button>
                                            </td>
                                        </tr>
                                    ))
    
                                ) : (
    
                                    <div></div>
                                )
                            }
    
                        </tbody>
                    </Table>
                </div>
                )
           }
        </Base>
    );
};

export default MyTransactions;