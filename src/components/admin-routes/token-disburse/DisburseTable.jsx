import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { Button, Card, Form, Input } from "reactstrap";
import { BASE_URL } from "../../../services/helper";
import Loader from "../../Loader";
import PageLoader from "../../page-loader/PageLoader";


const DisburseTable = () => {

    const [tokenDisburses, setTokenDisburses] = useState([]);
    // Page Loading
    const [isLoading, setIsLoading] = useState(false);
   
    const [loader, setLoader] = useState(false);

    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    

    const [disburseData, setDisburseData] = useState({
        startTime: 0,
        endTime: 0,
        isMsgCount: false,
        isReactionCount: false,
        disburse: false,
    });

    // Handle Change
    /* const handleChang = (event, property) => {

        //console.log(property);
        // dynamic setting the values 
        if (property === "msgCount" || property === "reactionCount" || property === "isDisburse") {
            setDisburseData({ ...disburseData, [property]: event.target.checked });

        } else {
            setDisburseData({ ...disburseData, [property]: event.target.value });
        }



    }; */


    useEffect(() => {

        fetchData(1, perPage);

    }, [perPage, setTokenDisburses]);


    const fetchData = (page, per_page) => {

        setIsLoading(true);

        axios.get(`${BASE_URL}/api/v1/token-disburse/all`)
            .then(res => {
                console.log(res.data);
                setTokenDisburses(res.data);
                setIsLoading(false);

            }).catch(err => {
                console.error(err)
                setIsLoading(false);
            })





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

    const convertTimestampToDate = (unixTimestamp) => {
        //console.log(unixTimestamp);
        const date = new Date(unixTimestamp);
        //console.log(date.toLocaleDateString("default"));
        return date.toLocaleDateString("default");

    }

    // Submit the Form
    const submitForm = (event) => {
        event.preventDefault();

        setLoader(true);

        console.log(disburseData);

        axios.post(`${BASE_URL}/api/v1/token-disburse/add-time`, disburseData)
            .then(res => {
                toast.success("Added Successful!");
                fetchData(1, perPage);
                setLoader(false);
            }).catch((error) => {
                console.log("Error: ", error);
                setLoader(false);
            })



    }

   /*  // For resetting data
    const resetData = () => {
        setDisburseData({
            startTime: 0,
            endTime: 0,
            msgCount: false,
            reactionCount: false,
            isDisburse: false,
        })
    }; */



    const columns = [
        {
            name: <h5>SL</h5>,
            cell: (row, index) => index + 1,
            grow: 0,
        },
        {
            name: <h5>Id</h5>,
            selector: row => row._id
        },
        {
            name: <h5>Start Time</h5>,
            selector: row => convertTimestampToDate(row.startTime)
        },
        {
            name: <h5>End Time</h5>,
            selector: row => convertTimestampToDate(row.endTime)
        },

        
        {
            name: <h5>Msg Count</h5>,
            selector: row => row.isMsgCount ? <div>True</div> : <div>False</div>
        },
        {
            name: <h5>Reaction Count</h5>,
            selector: row => row.isReactionCount ? <div>True</div> : <div>False</div>
        },

        {
            name: <h5>Disburse</h5>,
            selector: row => row.disburse ? <div>True</div> : <div>False</div>
        },

    ]

    return (



        <div>
            <div className="m-3 ">

                <Card className="p-3 row d-flex justify-content-center">
                <Form onSubmit={submitForm}>
                    <div class="row ">
                        <div class="col-3">
                            <Input type="date" class="form-control"
                                id="inputStartDate"
                                placeholder="Start Date"
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    const seconds = Math.floor(date.getTime());
                                    setDisburseData({ ...disburseData, 'startTime': seconds });
                                }}
                            //value={disburseData.startTime}
                            />
                            <label class="" for="inputStartDate">Start Date</label>
                        </div>
                        <div class="col-3 ">
                            <Input type="date" class="form-control"
                                id="inputEndDate" placeholder="End Date"
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    const seconds = Math.floor(date.getTime());
                                    setDisburseData({ ...disburseData, 'endTime': seconds });
                                }}
                            //value={disburseData.endTime}
                            />
                            <label class="" for="inputEndDate">End Date</label>
                        </div>
                        <div class="form-check col-2">
                            <Input class="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                onChange={(e) => { setDisburseData({ ...disburseData, 'isMsgCount': e.target.checked }) }}
                                value={disburseData.isMsgCount}

                            />
                            <label class="form-check-label" for="flexCheckDefault">
                                Message count
                            </label>
                        </div>
                        <div class="form-check col-2">
                            <Input class="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                onChange={(e) => { setDisburseData({ ...disburseData, 'isReactionCount': e.target.checked }) }}
                                value={disburseData.isReactionCount}
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                                Reaction Count
                            </label>
                        </div>

                        <div className="col-2">
                            {
                                loader ? (<Loader name="adding" />) : (
                                    <div className="d-flex justify-content-center ">
                                        <Button type="submit" color="primary" >Token Disburse</Button>
                                    </div>
                                )
                            }

                        </div>

                    </div>
                </Form>
              </Card>

            </div>
            <div>
                {
                    isLoading ? (<PageLoader />) : (
                        <DataTable
                            columns={columns}
                            data={tokenDisburses.data}
                            pagination
                            paginationServer
                            paginationTotalRows={tokenDisburses.total}
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

export default DisburseTable;