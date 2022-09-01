import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const Menus = () => {
    return (

        <div>
            <ListGroup >
                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="/"
                    tag="a"
                    action
                >
                    Home
                </Link>
                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="/user/profile-info"
                    tag="a"
                    action
                >
                    Profile Info
                </Link>
                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="/user/dashboard"
                    tag="a"
                    action
                >
                    Wallet
                </Link>
                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="/user/send-token"
                    tag="a"
                    action
                >
                    Send Token
                </Link>
                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="/user/my-transactions"
                    tag="a"
                >
                    My Transactions
                </Link>

                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="/user/import-token"
                    tag="a"
                >
                    Import Token
                </Link>


                <Link className="list-group-item list-group-item-action bg-dark text-light"
                    to="#"
                    tag="a"
                >
                    Contact
                </Link>



            </ListGroup>

        </div>

    );
};

export default Menus;