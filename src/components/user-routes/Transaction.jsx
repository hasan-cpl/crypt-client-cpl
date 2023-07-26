import React from "react";
import { Card } from "reactstrap";
import { ETHERSCAN_URL } from "../../utils/constants";

const Transaction = ({ tx }) => {

    //console.log("tx:", tx);

    return (

        
            <Card className="p-2 btn position-relative" style={{
                minHeight: '200px',
                backgroundColor: '#eee'
            }}
                onClick={() => {
                    window.open(`${ETHERSCAN_URL}${tx.hash}`, "_blank");
                }}
            >
                <div className="" >
                    <div className="text-truncate">{`From: ${tx.from}`}</div>
                    <div className="text-truncate">{`To: ${tx.to}`}</div>
                    <div>Status: {(tx.isError !== "0") ? (<span style={{ color: "red" }}>Failed</span>) : (<span style={{ color: "green" }}>Success</span>)}</div>
                    {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                                            alt="ima 1" className="w-100 rounded-3" /> */}
                </div>
                <div class="">{new Date(tx.timeStamp * 1000).toString()}</div>

            </Card>
            

        


    );
};

export default Transaction;