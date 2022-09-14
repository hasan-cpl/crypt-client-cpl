import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { getCurrentUser } from "../../auth/auth";
import { getCurrentUserInfo } from "../../services/user-service";
import Base from "../Base";
import PageLoader from "../page-loader/PageLoader";



const MyTransactions = () => {

    /*     const Web3 = require('web3');
        const web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/ukXBvGXFSkA7R3alQlK8Qg8qCBvLql3s');
    
     */
    const [account, setAccount] = useState('');
    // Page Loading
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const [transaction, setTransaction] = useState({ result: [] });
    useEffect(() => {
        document.title = 'Transactions'
    })

    useEffect(() => {


        getCurrentUser().then((res) => {
            //console.log(res.user_id);

            setIsLoading(true);

            getCurrentUserInfo(res.user_id)
                .then(async (userInfo) => {
                    //console.log(userInfo);
                    setUserInfo(userInfo);
                    setAccount(userInfo.wallet.accountAddress.toLowerCase());

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
                        //console.log(res.data.result);
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



    }, []);


    return (
        <Base>
            {
                isLoading ? (
                    <PageLoader />
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
                                                <td>{(account === item.from) ? ("Send") : ("Received")}</td>
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

                                        <Container className="text-center"><h1>No Transaction yet!</h1></Container>

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