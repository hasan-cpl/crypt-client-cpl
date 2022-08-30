import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { isLoggedIn } from "../auth/auth";
import MyNavbar from "./MyNavbar";
import Menus from "./Menus";

const Base = ({ title = "Welcome", children }) => {

    const [login, setLogin] = useState(false);
    useEffect(() => {
        setLogin(isLoggedIn());
    }, [login]);

    
    return (


        login ? (

            <div>
                <MyNavbar />
                <div className="container-fluid vh-100 d-flex flex-column">
                    <Row className="h-100">
                        <Col md={2} className="bg-dark">
                            <Menus />
                        </Col>
                        <Col md={10}>
                            <div >
                                {children}
                            </div>
                        </Col>
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