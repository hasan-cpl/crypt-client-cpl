const Loader = ({name}) => {
    return (
        <div className="text-center">
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                {` ${name} ...`}
            </button>
        </div>
    );
};

export default Loader;