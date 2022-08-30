import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Table } from "reactstrap";
import { getCurrentUser } from "../../auth/auth";
import { getCurrentUserInfo } from "../../services/user-service";
import Base from "../Base";


const UserDashboard = () => {

    const logo = require('../../images/logo.png')

    const [metamaskAccount, setMetamaskAccount] = useState('');
    const [user, setUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState();

    const [token, setToken] = useState(undefined);
    //const [userInfo, setUserInfo] = useState();
    console.log("Account: ",metamaskAccount);

    useEffect(() => {
        document.title = "Dashboard"

        getCurrentUser().then(async (res) => {
            //console.log(res.user_id);
            setUser(res);

            getCurrentUserInfo(res.user_id)
                .then(userInfo => {
                    console.log(userInfo);
                    setUserInfo(userInfo);
                }).catch(err => console.log(err));

        });
        //getUserInfoById(user.user_id);



    }, [setUser, setUserInfo]);


    const connectToMetamask = (event) => {
        event.preventDefault();

        if (typeof window.ethereum !== 'undefined') {
            //console.log('MetaMask is installed!');
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(res => {
                    // Return the address of the wallet
                    toast("Metamask connected to account : " + res);
                    setMetamaskAccount(res);
                })
        } else {
            toast.error("Please Install Metamask!");
        }
    }


    return (
        <Base>
            <div className="mt-2">

                {
                    userInfo ? (
                        <div>
                            <div className="container">
                                <Table className="mt-3"
                                    bordered hover responsive
                                >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>{userInfo.name}</th>

                                        </tr>
                                        <tr>
                                            <th>username</th>
                                            <th>{userInfo.username}</th>

                                        </tr>
                                        <tr>
                                            <th>Eth Account</th>
                                            <th>{userInfo.wallet.accountAddress}</th>

                                        </tr>
                                        <tr>
                                            <th>PrivateKey</th>
                                            <th>{userInfo.wallet.privateKey}</th>

                                        </tr>
                                        <tr>
                                            <th>Token Address</th>
                                            <th>{userInfo.wallet.tokenAddress}</th>

                                        </tr>
                                    </thead>

                                </Table>
                            </div>
                        </div>
                    ) : (<div></div>)
                }

                <div className="container">
                    <Row>
                        <Col sm="8">
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
                                            onClick={connectToMetamask}
                                            color="primary"
                                        >
                                            Connect to Metamask
                                        </Button>

                                        

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
                        <Col sm="4">
                            <div>
                                <Card className="eth-card" style={{
                                    height: "250px"
                                }}>
                                    <img
                                        alt="Card"
                                        src={logo}
                                        style={{
                                            width: '2rem',
                                            margin: "5px"
                                        }}
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5" className="text-light">
                                            CPL Crypt
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Send Token accross the world
                                        </CardSubtitle>


                                    </CardBody>

                                    <div className="d-flex align-items-end m-2">

                                        <div> {`Address: ${metamaskAccount}`}</div>
                                    </div>

                                </Card>

                            </div>

                        </Col>
                    </Row>
                </div>
            </div>

        </Base>
    );
}

export default UserDashboard;