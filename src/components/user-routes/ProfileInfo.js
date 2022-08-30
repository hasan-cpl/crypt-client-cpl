import { Table } from "reactstrap";
import Base from "../Base";

const ProfileInfo = () => {
    return (
        <Base>
            <div>
              {/*   <div>
                    <div className="container">
                        <Table className="mt-3"
                            bordered hover responsive
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>{userInfo.name}</th>

                                </tr>
                                <tr>
                                    <th>username</th>
                                    <th>{userInfo.username}</th>

                                </tr>
                                <tr>
                                    <th>Eth Account</th>
                                    <th>{userInfo.wallet.accountAddress}</th>

                                </tr>
                                <tr>
                                    <th>PrivateKey</th>
                                    <th>{userInfo.wallet.privateKey}</th>

                                </tr>
                                <tr>
                                    <th>Token Address</th>
                                    <th>{userInfo.wallet.tokenAddress}</th>

                                </tr>
                            </thead>

                        </Table>
                    </div>
                </div> */}
            </div>
        </Base>
    );
}

export default ProfileInfo;