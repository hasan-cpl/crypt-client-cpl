import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { getCurrentUserDecodeData, isLoggedIn } from "../auth/auth";
import Menus from "./Menus";
import MyNavbar from "./MyNavbar";

const Base = ({ title = "Welcome", children }) => {

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);
    useEffect(() => {

        if (isLoggedIn()) {
            setLogin(true);
            setUser(getCurrentUserDecodeData());
            //console.log(isAdmin());
        }
        //getCurrentUser().then(res => setUser(res));


    }, [login]);

    // login ? () : (console.log());




    return (


        login ? (

            <div>
                <MyNavbar />
                <div className="container-fluid vh-100 d-flex flex-column">
                    <Row className="h-100">
                        <Col md={2} className="bg-dark">
                            <Menus user={user} />
                        </Col>
                        {
                            (document.title === 'Home') ?
                                (
                                    <Col md={10} className="banner d-flex justify-content-center align-items-center">
                                        <div >
                                            {children}
                                        </div>

                                    </Col>
                                ) : (
                                    <Col md={10}>
                                        <div>
                                            {children}
                                        </div>
                                    </Col>
                                )
                        }
                    </Row>
                </div>
            </div>
        ) : (
            <div >

                <MyNavbar />
                {children}

            </div>
        )

    );
};

export default Base;