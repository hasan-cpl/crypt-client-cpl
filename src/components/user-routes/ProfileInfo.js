import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getCurrentUser } from "../../auth/auth";
import { getCurrentUserInfo } from "../../services/user-service";
import Base from "../Base";
import PageLoader from "../page-loader/PageLoader";

const ProfileInfo = () => {

    const [user, setUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState();
    const [btn1Text, setBtn1Text] = useState(false);
    const [btn2Text, setBtn2Text] = useState(false);


    // Page Loading
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Dashboard"

        getCurrentUser().then(async (res) => {
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

    //console.log(userInfo);

    return (
        <Base>
            <div>
                {
                    isLoading ?
                        (<PageLoader />) :
                        (
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
                                                    <th>
                                                        <div className="text-truncate" style={{ float: "left" }}>{userInfo.wallet.accountAddress}</div>
                                                        <div style={{ float: "right" }}>
                                                            <Button outline color="success"
                                                                onClick={(e) => {
                                                                    window.navigator.clipboard
                                                                        .writeText(userInfo.wallet.accountAddress)
                                                                        .then(() => {
                                                                            setBtn1Text(true);

                                                                            setTimeout(() => {
                                                                                setBtn1Text(false);
                                                                                e.target.blur();
                                                                            }, 2500)

                                                                        }).catch((err) => console.log(err));


                                                                }}
                                                            >{btn1Text ? ('Copied!') : ('Copy')}</Button>
                                                        </div>

                                                    </th>


                                                </tr>
                                                <tr>
                                                    <th>PrivateKey</th>
                                                    <th>
                                                        <div className="text-truncate" style={{ float: "left" }}>{userInfo.wallet.privateKey}</div>
                                                        <div style={{ float: "right" }}>
                                                            <Button outline color="success"
                                                                onClick={(e) => {
                                                                    navigator.clipboard.writeText(userInfo.wallet.privateKey);
                                                                    setBtn2Text(true);

                                                                    setTimeout(() => {
                                                                        setBtn2Text(false);
                                                                        e.target.blur();
                                                                    }, 2500)

                                                                }}
                                                            >{btn2Text ? ('Copied!') : ('Copy')}</Button>
                                                        </div>
                                                    </th>

                                                </tr>

                                            </thead>

                                        </Table>
                                    </div>
                                </div>
                            ) : (
                                <h1>Data Not Found</h1>
                            )
                        )
                }
            </div>
        </Base>
    );
}

export default ProfileInfo;