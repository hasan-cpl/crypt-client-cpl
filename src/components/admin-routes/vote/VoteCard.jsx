import React, { useState ,useEffect} from "react";
import { FcOrganization } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const VoteCard = ({ vote,totalUser }) => {

    const navigate = useNavigate();
    //console.log(totalUser);
    


    const calculateTimeLeft = () => {
        //let year = new Date().getFullYear();

        let seconds = (vote.endTime - Date.now()) / 1000;


        let timeLeft = {};

        if (seconds > 0) {

            seconds = Number(seconds);
        
            //console.log(seconds);

            timeLeft = {
                days: Math.floor(seconds / (3600 * 24)),
                hours: Math.floor(seconds % (3600 * 24) / 3600),
                minutes: Math.floor(seconds % 3600 / 60),
                seconds:  Math.floor(seconds % 60)
            };
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    }); 


    const yesVote = vote.totalVote > 0 ? (
       ( (Number(vote.yesVoteCount) / Number(totalUser)) * 100).toFixed(2)
    ) : (0);

    const noVote = vote.totalVote > 0 ? (
        ((Number(vote.noVoteCount) / Number(totalUser)) * 100).toFixed(2)
    ) : (0)

    return (
        <div className="p-2 card"
            style={{
                minHeight: '250px',
                backgroundColor: '#eee'
            }}
            onClick={() => {

                navigate(`/user/vote/${vote.proposalNumber}`)

            }}>
            <div class="card-body">

                <div className="border rounded pt-1 pb-1">
                    <FcOrganization /> Voting
                </div>
                <div>
                    <h5 class="card-title">{`${vote.proposalNumber}# ${vote.proposal}`}</h5>
                </div>
                <div>
                    {/* Yes vote progress bar */}
                    <div className="d-flex justify-content-between">
                        <span>Yes</span>
                        <span>{`${yesVote}%`}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style={{ width: `${yesVote}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    {/* No vote progress bar */}
                    <div className="d-flex justify-content-between">
                        <span>No</span>
                        <span>{`${noVote}%`}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style={{ width: `${noVote}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>


                </div>
                <div className="text-center mt-2">
                    {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
                        <h5>
                            <span>{timeLeft.days}D</span>
                            <span>:</span>
                            <span>{timeLeft.hours}H</span>
                            <span>:</span>
                            <span>{timeLeft.minutes}M</span>
                            <span>:</span>
                            <span>{timeLeft.seconds}S</span>
                        </h5>
                    ) : (
                        <div>
                            {
                                yesVote >= 51 ?
                                    (<h5 className="text-success">Success ✔️</h5>)
                                    : (<h5 className="text-danger">Rejected ❌</h5>)
                            }

                        </div>
                    )
                    }
                </div>
                <Link to="" class="stretched-link"></Link>

            </div>

        </div>
    );

}

export default VoteCard;