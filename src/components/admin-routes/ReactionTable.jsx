import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import PageLoader from '../page-loader/PageLoader';


const columns = [
    {
        name: "Server",
        selector: row => row.server
    },
    {
        name: "Channel",
        selector: row => row.channel
    },
    {
        name: "Sender",
        selector: row => row.sender
    },
    {
        name: "Message",
        selector: row => row.message
    },
    {
        name: "Time",
        selector: row => row.time
    },
    {
        name: "Date",
        selector: row => row.date
    },
    {
        name: "Reaction",
        cell: row => <>{row.counter.map(r => `${r.key} ${r.count}`)}</>
    },
]

const ReactionTable = () => {

    const [reactions, setReactions] = useState([]);
    const [loading, isLoading] = useState(false);
    //const [error, setError] = useState(null);


    //const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    

    useEffect(() => {
        document.title = 'Reactions'
    });

    useEffect(() => {
        fetchData(1, perPage);
    }, [perPage])

    const fetchData = async (page, per_page) => {

        isLoading(true);

        try {
            const response = await axios
                .get(`https://discord-to-mongo-app.herokuapp.com/api/v2/discordmsg?pageSize=${per_page}&page=${page}`);
            setReactions(response.data);
            //console.log(response.data);
            

            isLoading(false);

        } catch (error) {
            console.error(error);
            isLoading(false);
        }
    }

    const handlePageChange = (page) => {
        fetchData(page, perPage);
        setCurrentPage(page);
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchData(page, newPerPage);
        setPerPage(newPerPage);
    }



  





    return (

        loading ? (<PageLoader />) : (
            <DataTable
                columns={columns}
                data={reactions.data}
                pagination
                paginationServer
                paginationTotalRows={reactions.total}
                paginationPerPage={perPage}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions = {[2, 4, 6, 8, 10]}
                // paginationComponentOptions={{
                //     noRowsPerPage: true
                // }}
                onChangePage={handlePageChange}


            />
        )

    );
};

export default ReactionTable;