import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { getCurrentUser } from '../../auth/auth';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '../../services/helper';
import { addDiscordUserInformation } from '../../services/user-service';
import Base from "../Base";

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const ProcessOauth = () => {

    const navigate = useNavigate();

    //const [successText, setSuccessText] = useState('Failed to Merge with Discord');



    getCurrentUser().then((currentUser) => {

        let currentUserId = currentUser.user_id
        console.log(currentUserId);
        const queryParams = new URLSearchParams(window.location.search)
        const code = queryParams.get("code")
        console.log(code);


        oauth.tokenRequest({
            clientId: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET,
            code: code,
            scope: "identify email guilds",
            grantType: "authorization_code",

            redirectUri: `${window.location.origin}/user/process-discord-oauth`,
        }).then(res => {
            oauth.getUser(res.access_token)
                .then(discordUser => {
                    console.log(discordUser);

                    addDiscordUserInformation(currentUserId, discordUser)
                        .then(res => {
                            //console.log(res);
                            toast.success('Successfuly Merged With Discord!');
                        }).catch(err => {
                            console.error(err);
                            toast.error('Can not Merged With Discord');
                        })
                    /* discordInfo.discordId = discordUser.id;
                    discordInfo.username = discordUser.username;
                    discordInfo.discriminator = discordUser.discriminator;
                    discordInfo.email = discordUser.email;
                    discordInfo.avatar = discordUser.avatar;
                    discordInfo.verified = discordUser.verified;

                    addDiscordUserInformation() */

                })
                .catch(err => console.error('UserErr', err));
        }).catch(err => console.error(err));
    });



    const handleData = () => {

        navigate("/user/dashboard", {
            replace: true
        });

    }




    return (
        <Base>
            <div className='container text-center'>
                <h1>Merged With Discord</h1>
                <Button onClick={handleData}>Back</Button>

            </div>
        </Base>
    );
};

export default ProcessOauth;