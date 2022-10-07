import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from 'web3';
import { myAxios, WEB_3_PROVIDER_URL } from "../../../services/helper";
import { contractABI, contractAddress } from "../../../utils/constants";
import Base from "../../Base";
import PageLoader from "../../page-loader/PageLoader";
import VoteCard from "./VoteCard";

const web3 = new Web3(WEB_3_PROVIDER_URL);

const AllVote = () => {

  const votingContract = new web3.eth.Contract(contractABI, contractAddress);
  const [votes, setVotes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [totalUser, setTotalUser] = useState(1);


  useEffect(() => {
    //const getAllProposal = await votingContract.methods.getAllVote().call();

    setLoader(true);

    votingContract.methods.getAllVote().call()
      .then(res => {
        //console.log(res);
        let arr = [...res];
        setVotes(arr.reverse());
        myAxios.get(`/api/v1/users`)
          .then(res => {
            //console.log(res.data);
            setTotalUser(res.data.total);
            setLoader(false);

          }).catch(err => {
            console.error(err)
            setLoader(false);
          });
      }).catch(err => {
        console.error(err);
        setLoader(false);
      })


  }, [setVotes])



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


          <div>

            {
              loader ? (
                <PageLoader />
              ) : (
                <div className="grid-vote mt-3 overflow-auto" data-bs-spy="scroll">
                  {
                    votes.length > 0 ? (
                      votes.map(vote => <VoteCard key={vote.proposalNumber} vote={vote} totalUser = {totalUser} />)
                    ) : <>No Vote Found!!</>
                  }

                </div>
              )
            }

          </div>

        </div>
      </div>
    </Base>
  );
};

export default AllVote;
