import axios from 'axios';
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { BASE_URL, BOT_BASE_URL } from '../../../services/helper';
import PageLoader from '../../page-loader/PageLoader';




const ReactionTable = () => {

    const [reactions, setReactions] = useState([]);
    const [loading, isLoading] = useState(false);
    //const [error, setError] = useState(null);


    //const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(12);
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
                .get(`${BASE_URL}/api/v1/discord-messages?pageSize=${per_page}&page=${page}`);
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

    const convertTimestampToTime = (unixTimestamp) => {
        const date = new Date(parseInt(unixTimestamp));
        //console.log(date.toLocaleTimeString("default"));
        return date.toLocaleTimeString("default");

    }

    const convertTimestampToDate = (unixTimestamp) => {
        const date = new Date(parseInt(unixTimestamp));
       // console.log(date.toLocaleDateString("default"));
        return date.toLocaleDateString("default");

    }


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
            cell: row => <>{convertTimestampToTime(row.createdTimestamp)}</>
        },
        {
            name: "Date",
            cell: row => convertTimestampToDate(row.createdTimestamp)
        },
         {
            name: "Reaction",
            cell: row => <>{row.counter.map(r => `${r.key} ${r.count}`)}</>
        }, 
    ]



    return (

        loading ? (<PageLoader />) : (
            <DataTable
                columns={columns}
                data={reactions.discordMsgs}
                pagination
                paginationServer
                paginationTotalRows={reactions.total}
                paginationPerPage={perPage}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[12, 24, 36, 48, 60]}
                // paginationComponentOptions={{
                //     noRowsPerPage: true
                // }}
                onChangePage={handlePageChange}


            />
        )

    );
};

export default ReactionTable;