import Base from "../../Base";
import InteractionTable from "./InteractionTable";



const Interactions = () => {
    return (
        <Base>
            <div className="d-flex flex-column align-items-center">
                <h1>Discord Interaction List</h1>
                <InteractionTable />
            </div>
        </Base>
    );
};

export default Interactions;