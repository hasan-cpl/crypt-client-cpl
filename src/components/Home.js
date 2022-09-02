import { useEffect } from "react";
import Base from "./Base";


const Home = () => {
    useEffect(() => {
        document.title = "Home";
    });
    return (
        <Base >

            <div className="text-center">
                <h1 class="font-weight-bold">Experience The New Reality</h1>
                <p>
                    Start Collecting your Token in very smarter way. We provide very efficient and smarter way of handling
                    Token.
                </p>

                <button class="btn bg-primary btn-lg text-white">Get Start</button>

            </div>

        </Base>
    );
};



export default Home;