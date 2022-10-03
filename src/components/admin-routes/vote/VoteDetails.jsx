import React from "react";
import Base from "../../Base";

const VoteDetails = () => {

    return (
        <Base>
            <div className="h-100 gradient-custom-2">
                <div className="container">
                    <div className="bg-dark ps-2 pe-2 d-flex justify-content-between align-items-center">
                        <h1 className="text-white d-inline-block">Voting</h1>
                    </div>

                    <div className="bg-dark ps-2 pe-2 d-flex justify-content-between align-items-center">
                        <button type="button" class="BackButton___StyledButtonBase-ebowg7-0 gOqcaU ButtonBase___StyledButton-ur1q76-0 lixQZQ">
                            <span class="BackButton___StyledSpan-ebowg7-1 kkzygP">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" stroke="currentColor" stroke-width="0.2" d="M18.434 11.434H5.566a.566.566 0 000 1.132h12.869a.565.565 0 100-1.132z"></path><path fill="currentColor" stroke="currentColor" stroke-width="0.2" d="M6.366 12l4.426-4.426a.565.565 0 10-.8-.8L5.166 11.6a.566.566 0 000 .8l4.826 4.826a.564.564 0 00.8 0 .565.565 0 000-.8L6.366 12z"></path></svg></span><span class="BackButton___StyledSpan2-ebowg7-2 ebLErP">
                                Back</span>
                        </button>
                    </div>






                </div>
            </div>

        </Base>
    );

}

export default VoteDetails;