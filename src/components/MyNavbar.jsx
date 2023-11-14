import React, { useEffect, useState } from 'react'
import { NavLink as ReactLink, useNavigate } from 'react-router-dom'
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { doLogout, getCurrUser, isLoggedIn } from '../auth';

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
        doLogout(() => {
            setTimeout(() => {
                setLogin(false)
                window.location.reload()
                nav("/")
            }, 1000);
        })
    }

    // useEffect
    useEffect(() => {
        setLogin(isLoggedIn())
        setUser(getCurrUser())
        console.log("user:::", user)
        // setLogin(false)
        // setLogin(true)
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
                <NavbarBrand href="/">BlogSphere</NavbarBrand>
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
                            <DropdownMenu end>
                                <DropdownItem tag={ReactLink} to="/contact">Contact Us</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={ReactLink} to="https://www.linkedin.com/in/palak-porwal-4700b01a5/" target="_blank">Palak's LinkedIn</DropdownItem>
                                <DropdownItem tag={ReactLink} to="/contact" target="_blank">Palak's Portfolio</DropdownItem>
                                <DropdownItem tag={ReactLink} to="https://linkedin.com/in/madhav-paliwal-09a26a1a1" target="_blank">Madhav's LinkedIn</DropdownItem>
                                <DropdownItem tag={ReactLink} to="https://madhav-tech-portfolio.netlify.app/" target="_blank">Madhav's Portfolio</DropdownItem>
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
                                        <NavLink className='active' tag={ReactLink} to="/user/dashboard">{user?.name}</NavLink>
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