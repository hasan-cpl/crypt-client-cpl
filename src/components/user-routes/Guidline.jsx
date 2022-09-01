import React from "react";
import Base from "../Base";


const Guideline = () => {

    return (
        <Base>
            <div className="" style={{ backgroundColor: "#EEE" }}>
                <div className="container py-5">
                    <div className="d-flex justify-content-center" >
                        <div className="container">
                            <h1 className="" itemprop="name">
                                Getting started with MetaMask
                            </h1>
                            <ol>
                                <li>Visit&nbsp;<a href="https://metamask.io/">https://metamask.io/</a></li>
                                <li>Hit "Download" in the menu bar.</li>
                                <li>
                                    <p>Click “Install MetaMask for Chrome”. You will be directed to the Chrome Web Store.</p>
                                    <p className="wysiwyg-text-align-center">
                                        <img className="img-fluid"
                                            src="https://metamask.zendesk.com/hc/article_attachments/5196100781083/Chrome_store.png"
                                            alt="Chrome_store.png"
                                            width="621"
                                            height="476"
                                        />
                                    </p>
                                </li>
                                <li>Click “Add to Chrome”.</li>
                                <li>
                                    <p>On the pop up, click “Add extension”.</p>
                                    <p className="wysiwyg-text-align-center">
                                        <img className="img-fluid"
                                            src="https://metamask.zendesk.com/hc/article_attachments/5196209372443/Chrome_permissions.png"
                                            alt="Chrome_permissions.png"
                                            width="377"
                                            height="198" />
                                    </p>
                                </li>
                            </ol>
                            <p className="text-align-center">&nbsp;</p>
                            <p>After adding MetaMask Extension, MetaMask will automatically open. You can also make sure it's easily accessible in your toolbar by clicking the jigsaw icon in the top-right of the screen, and hitting the pin icon.&nbsp;</p>

                            <div className="import-account">
                                <h1 itemprop="name">
                                    How to import an account
                                </h1>
                                <h2 id="h_01G01W07NV7Q94M7P1EBD5BYM4"><strong>Importing using a private key</strong></h2>
                                <div class="tab" id="tab-content-60" aria-labelledby="tab-link-60" role="tabpanel">
                                    <ol>
                                        <li>Click the circle icon at the top right corner of your MetaMask pop-up next to the network indicator.</li>
                                        <li>
                                            <p>Select “<strong>Import Account</strong>” on the dropdown menu:</p>
                                            <p class="wysiwyg-text-align-center">
                                                <img
                                                    src="https://metamask.zendesk.com/hc/article_attachments/360079624651/Screen_Shot_2020-12-14_at_9.09.54_AM.png"
                                                    alt="Screen_Shot_2020-12-14_at_9.09.54_AM.png"
                                                    width="360"
                                                    height="609" />
                                            </p>
                                        </li>
                                        <li>
                                            <p>You will be directed to the Import page. Paste your private key and click “<strong>Import”</strong>.</p>
                                            <p class="wysiwyg-text-align-center">
                                                <img className="img-fluid"
                                                    src="https://metamask.zendesk.com/hc/article_attachments/360079624631/Screen_Shot_2020-12-14_at_9.10.07_AM.png"
                                                    alt="Screen_Shot_2020-12-14_at_9.10.07_AM.png"
                                                    width="360"
                                                    height="607" />

                                            </p>
                                        </li>
                                    </ol>
                                    <p>You should be able to see the newly added account in the dropdown menu with an "Imported" tag next to the account.</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>



        </Base >
    );
};

export default Guideline;