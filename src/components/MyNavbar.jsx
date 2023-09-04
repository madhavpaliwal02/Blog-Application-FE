import React, { useEffect, useState } from 'react'
import { NavLink as ReactLink, useNavigate } from 'react-router-dom'
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';
import { doLogout, isLoggedIn } from '../auth';

const MyNavbar = () => {

    // useState : Navbar
    const [isOpen, setIsOpen] = useState(false)

    // useState : login
    const [login, setLogin] = useState(false)

    // useState : User
    const [user, setUser] = useState(undefined)

    // useNavigate
    const nav = useNavigate()

    // Handle Logout
    const handleLogout = () => {
        // doLogout(() => {
        //     setLogin(false)
        nav("/login")
        // })
    }

    // useEffect
    useEffect(() => {
        // setLogin(isLoggedIn)
        // setLogin(false)
        setLogin(true)
    }, [login])


    return (
        <div>
            <Navbar
                color='dark'
                dark
                expand='md'
                fixed=''
                className='px-5'
            >
                <NavbarBrand href="/">My Blogs</NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">New Feed</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services">Services</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to="/">Contact Us</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>LinkedIn</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav navbar>
                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/profile-info">Profile-Info</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard">palak@gmail.com</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">SignUp</NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MyNavbar