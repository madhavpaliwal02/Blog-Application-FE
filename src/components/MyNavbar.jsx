import React, { useEffect, useState } from 'react'
import { NavLink as ReactLink, useNavigate } from 'react-router-dom'
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { doLogout, getCurrUser, isLoggedIn } from '../auth';
import mylogo from "../image/logo.jpg"

const MyNavbar = () => {

    // useState : Navbar
    const [isOpen, setIsOpen] = useState(false)

    // useState : login
    const [login, setLogin] = useState(false)

    // useState : User
    const [user, setUser] = useState(undefined)

    // useState : Admin
    const [admin, setAdmin] = useState(sessionStorage.getItem("admin") !== null)
    // console.log(admin)

    // useNavigate
    const nav = useNavigate()

    // Handle Logout
    const handleLogout = () => {
        doLogout(() => {
            setTimeout(() => {
                setLogin(false)
                nav("/")
                window.location.reload()
            }, 1000);
        })
    }

    // useEffect
    useEffect(() => {
        setLogin(isLoggedIn())
        setUser(getCurrUser())
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
                <NavbarBrand href="/">
                    <img src={mylogo} alt="" width="150px" />
                </NavbarBrand>
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
                        <NavItem>
                            <NavLink tag={ReactLink} to="/contact">Contact Us</NavLink>
                        </NavItem>

                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={ReactLink} to="/contact">Contact Us</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={ReactLink} to="https://www.linkedin.com/in/palak-porwal-4700b01a5/" target="_blank">Palak's LinkedIn</DropdownItem>
                                <DropdownItem tag={ReactLink} to="https://palakporwal.github.io/Personal-Portfolio/" target="_blank">Palak's Portfolio</DropdownItem>
                                <DropdownItem tag={ReactLink} to="https://linkedin.com/in/madhav-paliwal-09a26a1a1" target="_blank">Madhav's LinkedIn</DropdownItem>
                                <DropdownItem tag={ReactLink} to="https://madhav-tech-portfolio.netlify.app/" target="_blank">Madhav's Portfolio</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    <Nav navbar>
                        {
                            (login || admin) ?
                                <>
                                    {(admin ?
                                        <>
                                            <NavItem>
                                                <NavLink tag={ReactLink} to="/admin">Admin</NavLink>
                                            </NavItem>
                                        </>
                                        :
                                        <>
                                            <NavItem>
                                                <NavLink tag={ReactLink} to="/user/profile-info">{user?.name}</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={ReactLink} to="/user/dashboard">Home</NavLink>
                                            </NavItem>
                                        </>
                                    )}
                                    <NavItem>
                                        <NavLink onClick={handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">SignUp</NavLink>
                                    </NavItem>
                                </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MyNavbar