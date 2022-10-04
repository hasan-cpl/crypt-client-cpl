import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from 'web3';
import { WEB_3_PROVIDER_URL } from "../../../services/helper";
import { contractABI, contractAddress } from "../../../utils/constants";
import Base from "../../Base";
import VoteCard from "./VoteCard";
const web3 = new Web3(WEB_3_PROVIDER_URL);

const AllVote = () => {

  const votingContract = new web3.eth.Contract(contractABI, contractAddress);
  let [votes, setVotes] = useState([]);
 

  useEffect(() => {
    //const getAllProposal = await votingContract.methods.getAllVote().call();

    votingContract.methods.getAllVote().call()
      .then(res => {
        console.log(res);
        let arr = [...res];
        setVotes(arr.reverse());
      }).catch(err => {
        console.error(err);
      })


  },[])

  return (
    <Base>
      <div className="h-100 gradient-custom-2">
        <div className="container">
          <div className="bg-dark ps-2 pe-2 d-flex justify-content-between align-items-center">
            <h1 className="text-white d-inline-block">Voting</h1>
            <Link className="btn btn-info"
              to="/admin/create-vote"
              tag="a"
              action
            >New Vote</Link>
          </div>


          <div className="grid-vote mt-3 overflow-auto" data-bs-spy="scroll">
            {
              votes.length > 0 ? (
                votes.map( vote => <VoteCard key={vote.proposalNumber} vote = {vote}/>)
              ) : <>No Vote Found!!</>
            }

          </div>

        </div>
      </div>
    </Base>
  );
};

export default AllVote;
