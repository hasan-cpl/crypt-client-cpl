import React from "react";
import { TailSpin } from 'react-loader-spinner';
const PageLoader = () => {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <TailSpin
                height="180"
                width="180"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default PageLoader;