import React from "react";
import { FcOrganization } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VoteCard = () => {

    const navigate = useNavigate();

    return (
        <div className="p-2 card"
            style={{
                minHeight: '250px',
                backgroundColor: '#eee'
            }}
            onClick={() => {

                navigate("/admin/vote-details", {
                    replace : true
                })

            }}>
            <div class="card-body">

                <div className="border rounded pt-1 pb-1">
                    <FcOrganization /> Voting
                </div>
                <div>
                    <h5 class="card-title">1# Are you want to add new vote?</h5>
                </div>
                <div>
                    {/* Yes vote progress bar */}
                    <div className="d-flex justify-content-between">
                        <span>Yes</span>
                        <span>25%</span>
                    </div>
                    <div className="progress">
                        <div className="progress-bar bg-primary w-25">
                        </div>
                    </div>
                    {/* No vote progress bar */}
                    <div className="d-flex justify-content-between">
                        <span>No</span>
                        <span>75%</span>
                    </div>
                    <div className="progress">
                        <div className="progress-bar bg-info w-75">
                        </div>
                    </div>
                    <h2>Status</h2>
                </div>
                <Link to="" class="stretched-link"></Link>

            </div>

        </div>
    );

}

export default VoteCard;