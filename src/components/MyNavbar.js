
import React, { useEffect, useState } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import {
    Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
    NavLink
} from 'reactstrap';
import { doLogout, isLoggedIn } from '../auth/auth';


const MyNavbar = () => {

    const navigate = useNavigate();

    const logo = require('../images/logo.png')
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // User managment
    const [login, setLogin] = useState(false);
    //const [user, setUser] = useState(undefined);

    useEffect(() => {
        setLogin(isLoggedIn());
        //setUser(getCurrentUser());

    }, [login]);

    // logout the user
    const logout = () => doLogout(() => {
        setLogin(false);
        navigate("/login", { replace: true })

    });






    return (
        <div>
            <Navbar color='dark' dark expand className='px-4'>
                <NavbarBrand tag={RouterNavLink} to="/">
                    <img className='me-2'
                        alt="logo"
                        src={logo}
                        style={{
                            height: 30,
                            width: 30,


                        }}
                    />
                    CPL Crypt
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>

                        {
                            login && (
                                <NavItem>
                                    <NavLink tag={RouterNavLink} to="/home">
                                        Home
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {/* <NavItem>
                            <NavLink tag={RouterNavLink} to="/signup">
                                Signup
                            </NavLink>
                        </NavItem> */}

                    </Nav>


                    {/* login logic */}
                    {
                        login ? (
                            <Nav navbar>
                                <NavItem>
                                    <Link className='btn btn-outline-success me-2'
                                        to="/user/guideline"
                                        tag="a"
                                        action
                                    >
                                        Guidline
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='btn btn-outline-danger' onClick={logout} to="/logout">
                                        Logout
                                    </NavLink>
                                </NavItem>




                            </Nav>
                        ) : (
                            <Nav navbar>

                                <NavItem>
                                    <NavLink tag={RouterNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RouterNavLink} to="/signup">
                                        Signup
                                    </NavLink>
                                </NavItem>

                            </Nav>
                        )
                    }

                </Collapse >
            </Navbar >
        </div >
    );
}



export default MyNavbar;