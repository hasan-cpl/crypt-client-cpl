import Base from "../../Base";
import ReactionTable from "./ReactionTable";



const DiscordReactions = () => {
    return (
        <Base>
            <div className="d-flex flex-column align-items-center">
                <h1>Discord Reaction List</h1>
                <ReactionTable />
            </div>
        </Base>
    );
};

export default DiscordReactions;