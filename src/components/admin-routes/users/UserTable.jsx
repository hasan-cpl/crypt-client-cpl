import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, ButtonGroup } from "reactstrap";
import { myAxios } from '../../../services/helper';
import PageLoader from "../../page-loader/PageLoader";


function UserTable() {

    const [users, setUsers] = useState([]);
    // Page Loading
    const [isLoading, setIsLoading] = useState(false);
    const [rSelected, setRSelected] = useState(1);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        fetchData(1, perPage);

    }, [rSelected,perPage,setUsers,]);

    const fetchData = (page, per_page) => {

        setIsLoading(true);

        if (rSelected === 2) {


            myAxios.get(`/api/v1/discord-user?page=${page}&pageSize=${per_page}`)
                .then(res => {
                    //console.log(res.data);
                    setUsers(res.data);
                    setIsLoading(false);

                }).catch(err => {
                    //console.error(err)
                    setIsLoading(false);
                })


        } else {
            myAxios.get(`/api/v1/users?page=${page}&pageSize=${per_page}`)
                .then(res => {
                    //console.log(res.data);
                    setUsers(res.data);
                    setIsLoading(false);

                }).catch(err => {
                    console.error(err)
                    setIsLoading(false);
                })
        }

        /* getAllUserPagination(page, per_page).then(res => {
            if (rSelected === 2) {
                const discordUser = res.filter(user => user.discordInfo != null);
                //console.log(discordUser);
                setUsers(discordUser);
            } else {
                setUsers(res);
            }

            setIsLoading(false);
        }).catch(err => {
            console.error(err)
            setIsLoading(false);
        }) */


    }

    const handlePageChange = (page) => {
        fetchData(page, perPage);
        setCurrentPage(page);
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchData(page, newPerPage);
        setPerPage(newPerPage);
    }


    const columns = [
        {
            name: <h5>SL</h5>,
            selector: row => row.index
        },
        {
            name: <h5>Name</h5>,
            selector: row => row.name
        },
        {
            name: <h5>Username</h5>,
            selector: row => row.username
        },

        {
            name: <h5>Username</h5>,
            selector: row => row.wallet.accountAddress
        },
        {
            name: <h5>Role</h5>,
            selector: row => row.role
        },
    ]

    return (
        <>

            <div className="mt-3">
                <ButtonGroup>
                    <Button
                        color="primary"
                        outline
                        onClick={() => setRSelected(1)}
                        active={rSelected === 1}
                    >
                        All User
                    </Button>
                    <Button
                        color="primary"
                        outline
                        onClick={() => setRSelected(2)}
                        active={rSelected === 2}
                    >
                        Discord User
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                {
                    isLoading ? (<PageLoader />) : (
                        <DataTable
                            columns={columns}
                            data={users.data}
                            pagination
                            paginationServer
                            paginationTotalRows={users.total}
                            paginationPerPage={perPage}
                            paginationDefaultPage={currentPage}
                            onChangeRowsPerPage={handlePerRowsChange}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
                            
                            onChangePage={handlePageChange}

                        />
                    )
                }
            </div>


        </>
    )
}

export default UserTable;

