import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { signUp } from "../services/user-service";
import Base from "./Base";
import Loader from "./Loader";

const Signup = () => {



    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        isAgree: false
    });

    const [loader, setLoader] = useState(false);

    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    // Handle Change
    const handleChang = (event, property) => {

        //console.log(property);
        // dynamic setting the values 
        if (property === "isAgree") {
            setUser({ ...user, [property]: event.target.checked });

        } else {
            setUser({ ...user, [property]: event.target.value });
        }



    };

    useEffect(() => {

        document.title = "Signup"

        //console.log(user);
    }, [user]);

    // For resetting data
    const resetData = () => {
        setUser({
            name: '',
            username: '',
            password: '',
            isAgree: false
        });
    };

    // Submit the Form
    const submitForm = (event) => {
        event.preventDefault();

        setLoader(true);

        // Data Validation

        // Call Server api For Sending Data

        signUp(user).then((res) => {
            //console.log(res);
            if (res.code === 201) {
                toast.success("Signup Successful!");
                resetData();
                setLoader(false);
                navigate("/login", {
                    replace: true
                });
            }else{
                setLoader(false);
                toast.error("Signup failed!")
            }

        }).catch((error) => {
            console.log("Error: ", error);
            setLoader(false);
        })



        //console.log(user);


    }

    return (
        <Base>
            <div className="vh-100" style={{ backgroundColor: "#EEE" }} >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">

                        <div className="card text-black" style={{ borderRadius: "25px", }}>
                            <div className="card-body p-md-5">
                                {/*  {JSON.stringify(user)} */}
                                <div className="row justify-content-center">
                                    <Row>
                                        <Col md={6}>
                                            <div className="col-md col-lg col-xl order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>

                                                <Form className="mx-1 mx-md-4" onSubmit={submitForm}>

                                                    <div className="d-flex flex-row align-items-center mb-4">

                                                        {/* Name */}
                                                        <div className="form-outline flex-fill mb-0">
                                                            <Input type="text" id="name"
                                                                className="form-control"
                                                                onChange={(e) => handleChang(e, 'name')}
                                                                value={user.name}
                                                            />
                                                            <Label className="form-Label"
                                                                for="name"
                                                            >Your Name</Label>
                                                        </div>
                                                    </div>

                                                    {/* username OR email */}
                                                    <div className="d-flex flex-row align-items-center mb-4">

                                                        <div className="form-outline flex-fill mb-0">
                                                            <Input type="email" id="email"
                                                                className="form-control"
                                                                onChange={(e) => handleChang(e, 'username')}
                                                                value={user.username}

                                                            />
                                                            <Label className="form-Label" for="email">Your Email</Label>
                                                        </div>
                                                    </div>

                                                    {/* Password */}
                                                    <div className="d-flex flex-row align-items-center mb-4">

                                                        <div className="form-outline flex-fill mb-0">
                                                            <Input type="password"
                                                                id="password"
                                                                onChange={(e) => handleChang(e, 'password')}
                                                                className="form-control"
                                                                value={user.password}
                                                            />
                                                            <Label className="form-Label" for="password">Password</Label>
                                                        </div>
                                                    </div>

                                                    {/* Confirm Password */}
                                                    <div className="d-flex flex-row align-items-center mb-4">

                                                        <div className="form-outline flex-fill mb-0">
                                                            <Input type="password" id="form3Example4cd" className="form-control" />
                                                            <Label className="form-Label" for="form3Example4cd">Repeat your password</Label>
                                                        </div>
                                                    </div>

                                                    {/* Password */}
                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <Input className="form-check-Input me-2"
                                                            type="checkbox"
                                                            id="checkbox"
                                                            onChange={(e) => handleChang(e, 'isAgree')}
                                                            value={user.isAgree}

                                                        />
                                                        <Label className="form-check-Label" for="form2Example3">
                                                            I agree all statements in <a href="#!">Terms of service</a>
                                                        </Label>
                                                    </div>

                                                    {
                                                        loader ? (<Loader name="Registering" />) : (
                                                            <div className="d-flex justify-content-center ">
                                                                <Button type="submit" color="primary" size="lg" block>Register</Button>
                                                            </div>
                                                        )
                                                    }

                                                </Form>

                                                <div className="text-center mt-3">
                                                    <span>Already Registered? Sign in <Link to="/login">here</Link></span>
                                                </div>

                                            </div>

                                        </Col>
                                        <Col md={6}>
                                            <div className="col-md col-lg col-xl text-center">
                                                <img src="sign_up.svg" style={{ padding: 8 }} className="img-fluid" alt="" />

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

export default Signup;