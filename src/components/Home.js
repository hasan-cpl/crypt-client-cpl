import { useEffect } from "react";
import Base from "./Base";


const Home = () => {
    useEffect(() => {
        document.title = "Home";
    });
    return (
        <Base >
            <section className="banner vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="text-center">
                                <h1 class="font-weight-bold">Experience The New Reality</h1>
                                <p>
                                    Start Collecting your Token in very smarter way. We provide very efficient and smarter way of handling
                                    Token.
                                </p>

                                <button class="btn bg-primary btn-lg text-white">Get Start</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section >

        </Base>
    );
};



export default Home;