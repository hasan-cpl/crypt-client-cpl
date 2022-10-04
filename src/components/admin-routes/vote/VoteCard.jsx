import React, { useEffect, useState } from "react";
import { FcOrganization } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const VoteCard = ({ vote }) => {

    const navigate = useNavigate();


    const calculateTimeLeft = () => {
        //let year = new Date().getFullYear();
        let difference = vote.endTime - Date.now();
        //console.log(difference);

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
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
        (Number(vote.yesVoteCount) / Number(vote.totalVote)) * 100
    ) : (0);

    const noVote = vote.totalVote > 0 ? (
        (Number(vote.noVoteCount) / Number(vote.totalVote)) * 100
    ) : (0)

    return (
        <div className="p-2 card"
            style={{
                minHeight: '250px',
                backgroundColor: '#eee'
            }}
            onClick={() => {

                navigate("/admin/vote-details", {
                    replace: true
                })

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
                        <div class="progress-bar bg-success" role="progressbar" style={{ width: yesVote }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    {/* No vote progress bar */}
                    <div className="d-flex justify-content-between">
                        <span>No</span>
                        <span>{`${noVote}%`}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style={{ width: noVote }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>


                </div>
                <div className="text-center mt-2">
                    {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
                        <h5>
                            <span>{timeLeft.hours}</span>
                            <span>:</span>
                            <span>{timeLeft.minutes}</span>
                            <span>:</span>
                            <span>{timeLeft.seconds}</span>
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