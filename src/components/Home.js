import { useEffect } from "react";
import Base from "./Base";


const Home = () => {
    useEffect(() => {
        document.title = "Home";
    });
    return (
        <Base>
            <div>
                <h1>This is Home page</h1>
            </div>
        </Base>
    );
};

export default Home;