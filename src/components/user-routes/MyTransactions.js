import React, { useEffect } from "react";
import Base from "../Base";
import TransactionTable from "./data-table/TransactionTable";



const MyTransactions = () => {

    useEffect(() => {
        document.title = 'Transactions'
    })


    return (
        <Base>
            <div className="d-flex flex-column align-items-center">
                <h1>Transaction List</h1>
                < TransactionTable />
            </div>

        </Base>
    );
};

export default MyTransactions;