import { useEffect, useState } from "react";
import PageLoader from "../../page-loader/PageLoader";

import DataTable from 'react-data-table-component';
import { myAxios } from '../../../services/helper';

const VoterTable = ({proposalNumber}) => {

    //const [isLoading, setIsLoading] = useState(false);
    const [voters, setVoters] = useState([]);
    //console.log(proposalNumber);

    useEffect(() => {

        async function fetchData() {
            // You can await here
            await myAxios.get(`/api/v1/proposals/${proposalNumber}`)
                .then(res => {
                    //console.log(res.data.voters);
                    setVoters(res.data.voters)
                }).catch(err => {
                    console.error(err);
                })

        }
        fetchData();

    }, [proposalNumber, setVoters]);



    const columns = [
        {
            name: <h5>Name</h5>,
            selector: row => <div className='text-center'>{row.voterName} </div>,

        },
        {
            name: <h5>Username</h5>,
            selector: (row) => <div>{row.username}</div>
        }
    ]




    return (
        <div>
            <h1 className="text-white mt-2">Voted Voter List</h1>
            <DataTable
                        columns={columns}
                        data={voters}
                        pagination
                        pointerOnHover
                        highlightOnHover

                    />
        </div>
    );
};

export default VoterTable;