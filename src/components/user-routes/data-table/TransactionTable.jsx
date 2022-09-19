import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button } from 'reactstrap'
import { getCurrentUser } from '../../../auth/auth'
import { getCurrentUserInfo } from '../../../services/user-service'
import PageLoader from '../../page-loader/PageLoader'


function TransactionTable() {
    const [isLoading, setIsLoading] = useState(false);
    const [transaction, setTransaction] = useState({});
    const [account, setAccount] = useState('');

    useEffect(() => {

        getCurrentUser().then((res) => {
            //console.log(res.user_id);

            setIsLoading(true);

            getCurrentUserInfo(res.user_id)
                .then(async (userInfo) => {
                    //console.log(userInfo);
                    //setUserInfo(userInfo);
                    setAccount(userInfo.wallet.accountAddress.toLowerCase());

                    //Get All Trasactions
                    try {
                        let url = "https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" + userInfo.wallet.accountAddress + "&startblock=0&endblock=99999999&sort=desc&apikey=FNF91N2DU5MQI9AQFKNNE96FR79DFN65XZ";
                        //setTransaction();
                        //console.log(url);

                        const res = await axios.get(`${url}`);
                        //setTransaction();

                        //console.log(transaction);
                        setTransaction(res.data);
                        setIsLoading(false);
                        //console.log(res.data);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }

                }).catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });

        });

    }, []);


    const columns = [
        {
            name: <h5>Nonce</h5>,
            selector: row => <div className='text-center'> {row.nonce}</div>,
            
        },
        {
            name: <h5>Send/Received</h5>,
            selector: (row) => <div>{(account === row.from) ? ("Send") : ("Received")}</div>
        },
        {
            name: <h5>Status</h5>,
            cell: row => <div className='text-center'>
                {
                    (row.isError !== "0") ?
                        (<p style={{ color: "red" }}>Failed</p>)
                        : (<p style={{ color: "green" }}>Success</p>)
                }
            </div>
        },
        {
            name: <h5 className='text-center'>TxHash</h5>,
            selector: row => <div className="text-truncate"> {row.hash}</div>
        },
        {
            name: <h5>Action</h5>,
            cell: row => <Button color='primary' onClick={() => {
                window.open(`https://rinkeby.etherscan.io/tx/${row.hash}`, "_blank")
            }}>Details</Button>
        },
    ]




    return (
        isLoading ? (<PageLoader />) : (
            <DataTable
                columns={columns}
                data={transaction.result}
                pagination
                pointerOnHover
                highlightOnHover
            /* pagination
             paginationServer
             paginationTotalRows={reactions.total}
             paginationPerPage={perPage}
             paginationDefaultPage={currentPage}
             onChangeRowsPerPage={handlePerRowsChange}
             paginationRowsPerPageOptions = {[2, 4, 6, 8, 10]}
             // paginationComponentOptions={{
             //     noRowsPerPage: true
             // }}
             onChangePage={handlePageChange} */


            />
        )
    )
}

export default TransactionTable
