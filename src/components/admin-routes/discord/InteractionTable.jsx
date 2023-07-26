import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, ButtonGroup, Input } from "reactstrap";
import { BASE_URL } from "../../../services/helper";
import PageLoader from "../../page-loader/PageLoader";


const InteractionTable = () => {

    const [interactions, setInteractions] = useState([]);
    // Page Loading
    const [isLoading, setIsLoading] = useState(false);
    const [rSelected, setRSelected] = useState(1);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(Date.now());



    useEffect(() => {

        fetchData(1, perPage);

    }, [rSelected, perPage, setInteractions, startTime, endTime]);

    const fetchData = (page, per_page) => {

        setIsLoading(true);

        if (rSelected === 2) {
            axios.get(`${BASE_URL}/api/v1/user-interactions/reaction-count?startTime=${startTime}&endTime=${endTime}&page=${page}&pagesize=${per_page}`)
                .then(res => {
                    // console.log(res.data);
                    setInteractions(res.data);
                    setIsLoading(false);

                }).catch(err => {
                    console.error(err)
                    setIsLoading(false);
                })


        } else {

            axios.get(`${BASE_URL}/api/v1/user-interactions/message-count?startTime=${startTime}&endTime=${endTime}&page=${page}&pageSize=${per_page}`)
                .then(res => {
                    //console.log(res.data);
                    setInteractions(res.data);
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
    //console.log(startTime);
    // console.log(endTime);



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
            cell: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: <h5>Discord Id</h5>,
            selector: row => row._id
        },
        {
            name: <h5>Address</h5>,
            selector: row => row.address
        },
        {
            name: <h5>Username</h5>,
            selector: row => row.name
        },

        {
            name: <h5>Message Count</h5>,
            selector: row => row.count
        },

    ]

    return (


        <div className='container'>

            <div className="mt-3">
                <ButtonGroup>
                    <Button
                        color="primary"
                        outline
                        onClick={() => setRSelected(1)}
                        active={rSelected === 1}
                    >
                        Message Count
                    </Button>
                    <Button
                        color="primary"
                        outline
                        onClick={() => setRSelected(2)}
                        active={rSelected === 2}
                    >
                        Reaction Count
                    </Button>
                </ButtonGroup>
            </div>
            <div className="mt-3 mb-3 ">

                <div class="row ">
                    <div class="col-6">
                        <Input type="date" class="form-control"
                            id="inputStartDate"
                            placeholder="Start Date"
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                const seconds = Math.floor(date.getTime() / 1000);
                                setStartTime(seconds);
                            }}
                        />
                        <label class="" for="inputStartDate">Start Date</label>
                    </div>
                    <div class="col-6">
                        <Input type="date" class="form-control"
                            id="inputEndDate" placeholder="End Date"
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                const seconds = Math.floor(date.getTime() / 1000);
                                setEndTime(seconds + 86400);
                            }}
                        />
                        <label class="" for="inputEndDate">End Date</label>
                    </div>

                </div>


            </div>
            <div>
                {
                    isLoading ? (<PageLoader />) : (
                        <DataTable
                            columns={columns}
                            data={interactions.interactionCount}
                            pagination
                            paginationServer
                            paginationTotalRows={interactions.total}
                            paginationPerPage={perPage}
                            paginationDefaultPage={currentPage}
                            onChangeRowsPerPage={handlePerRowsChange}
                            paginationRowsPerPageOptions={[10, 24, 36, 48, 60]}
                            // paginationComponentOptions={{
                            //     noRowsPerPage: true
                            // }}
                            onChangePage={handlePageChange}


                        />
                    )
                }
            </div>


        </div>

    );
};

export default InteractionTable;