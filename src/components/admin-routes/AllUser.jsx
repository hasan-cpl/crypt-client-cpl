import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import { getAllUser } from "../../services/user-service";
import Base from "../Base";
import PageLoader from "../page-loader/PageLoader";

const AllUser = () => {

    const [users, setUsers] = useState();
    // Page Loading
    const [isLoading, setIsLoading] = useState(false);
    const [rSelected, setRSelected] = useState(1);

    useEffect(() => {
        document.title = 'All User';
    });

    useEffect(() => {
        setIsLoading(true);
        getAllUser()
            .then(res => {
                //console.log(res);
                if (rSelected === 2) {

                    const discordUser = res.filter(user => user.discordInfo != null);
                    //console.log(discordUser);
                    setUsers(discordUser);
                    
                } else {
                    setUsers(res);
                }
                
                setIsLoading(false);
            }).catch(err => {
                console.error(err)
                setIsLoading(false);
            })
    }, [setUsers,rSelected])




    return (
        <Base>
            <div className="mt-3">
                <ButtonGroup>
                    <Button
                        color="primary"
                        outline
                        onClick={() => setRSelected(1)}
                        active={rSelected === 1}
                    >
                        All User
                    </Button>
                    <Button
                        color="primary"
                        outline
                        onClick={() => setRSelected(2)}
                        active={rSelected === 2}
                    >
                        Discord User
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                {
                    isLoading ? (<PageLoader />) : (
                        users ? (
                            <div >
                                <Table className="mt-3"
                                    bordered hover responsive
                                >
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Wallet</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {
                                        //console.log(users.length)
                                        users.length > 0 ? (
                                            <tbody>
                                                {
                                                    users.map((user, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user.name}</td>
                                                            <td>{user.username}</td>
                                                            <td className="text-truncate">{user.wallet.accountAddress}</td>
                                                            <td></td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        ) : ('')
                                    }

                                </Table>
                            </div>
                        ) : ('')
                    )
                }

            </div>
        </Base>
    );
};

export default AllUser;