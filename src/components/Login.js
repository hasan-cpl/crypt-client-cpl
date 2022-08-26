import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { doLogin } from "../auth/auth";
import { loginUser } from "../services/user-service";
import Base from "./Base";
import Loader from "./Loader";

const Login = () => {

    useEffect(() => {
        document.title = "Login"
    });

    const navigate = useNavigate();

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: '',
    });

    const [loader, setLoader] = useState(false);

    const handleChange = (event, property) => {
        setLoginDetail({ ...loginDetail, [property]: event.target.value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();



        if (loginDetail.username.trim() === '') {
            toast.error("Username is required!");
            return;
        } else if (loginDetail.password.trim() === '') {
            toast.error("Password is required!");
            return;
        }

        setLoader(true);

        //console.log(loginDetail);

        try {
            const data = await loginUser(loginDetail);
            //console.log(data);
            doLogin(data, () => {
                //console.log("login detail is saved to local storage");

                // redirect to user user dashboard page
                navigate("/user/dashboard", {
                    replace: true
                });
            });

            setLoader(false);


        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
            setLoader(false);
        }

    }

    const resetLoginDetail = () => {
        setLoginDetail({
            username: '',
            password: '',
        })
    }

    return (
        <Base>
            <div className="vh-100" style={{ backgroundColor: "#EEE" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="card text-black" style={{ borderRadius: "25px", }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <Row>
                                        <Col md={6}>
                                            <div className="col-md col-lg col-xl">
                                                <img src="sign_in.svg" style={{ padding: 8 }} className="img-fluid" alt="" />
                                            </div>

                                        </Col>

                                        <Col md={6}>
                                            <div className="col-md col-lg col-xl offset-xl-1">
                                                <div className="text-center mb-3">
                                                    <h1>Signin</h1>
                                                </div>
                                                <form onSubmit={handleFormSubmit}>
                                                    {/*  <!-- Email Input --> */}
                                                    <div className="form-outline mb-4">
                                                        <Input type="email"
                                                            id="email"
                                                            className="form-control form-control-lg"
                                                            value={loginDetail.username}
                                                            onChange={(e) => handleChange(e, 'username')}
                                                        />
                                                        <Label className="form-label" for="email">Email address</Label>
                                                    </div>

                                                    {/* <!-- Password Input --> */}
                                                    <div className="form-outline mb-4">
                                                        <Input type="password"
                                                            id="password"
                                                            className="form-control form-control-lg"
                                                            value={loginDetail.password}
                                                            onChange={(e) => handleChange(e, 'password')}
                                                        />
                                                        <Label className="form-label" for="password">Password</Label>
                                                    </div>


                                                    <div className="d-flex justify-content-around align-items-center mb-4">
                                                        {/* <!-- Checkbox --> */}
                                                        <div className="form-check">
                                                            <Input className="form-check-Input" type="checkbox" value="" id="form1Example3" />
                                                            <Label className="form-check-label" for="form1Example3"> Remember me </Label>
                                                        </div>
                                                        <a href="#!">Forgot password?</a>
                                                    </div>

                                                    {/* <!-- Submit button --> */}
                                                    {
                                                        loader ? (<Loader name="Signin" />) : (
                                                            <div className="text-center">
                                                                <Button type="submit" color="primary" size="lg" block>Sign in</Button>
                                                            </div>)
                                                    }

                                                    <div className="text-center mt-3">
                                                        <span>Not Registered? Signup <Link to="/signup">here</Link></span>
                                                    </div>

                                                </form>
                                            </div>
                                        </Col>

                                    </Row>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default Login;