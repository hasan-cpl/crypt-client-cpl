import { useEffect } from "react";
import Base from "../../Base";
import UserTable from "./UserTable";

const AllUser = () => {



    useEffect(() => {
        document.title = 'All User';
    });




    return (
        <Base>
            <UserTable />
        </Base>
    );
};

export default AllUser;