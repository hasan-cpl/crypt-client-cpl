import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import { getAllUser } from "../../services/user-service";
import Base from "../Base";
import PageLoader from "../page-loader/PageLoader";
import UserTable from "./UserTable";

const AllUser = () => {

   

    useEffect(() => {
        document.title = 'All User';
    });




    return (
        <Base>
            <UserTable/>
        </Base>
    );
};

export default AllUser;