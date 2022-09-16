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

            {/*  {
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
                                                <td></td>
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
            } */}
        </Base>
    );
};

export default MyTransactions;