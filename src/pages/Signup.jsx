import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import axios from 'axios'
import { user_api } from '../api/API'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    // User
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
    })

    // Error
    const [error, setError] = useState({
        errors: {},
        isError: false,
    });

    // Navigation
    const nav = useNavigate()

    // Handle Change
    const handleChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    // Handle reset
    const handleReset = () => {
        setUser({
            name: '',
            email: '',
            password: '',
            about: ''
        })
    }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // call server api
        axios.post(`${user_api}`, user).then(
            (response) => {
                console.log("response: ", response.data)
                toast.success("User registered with userId: ", response.data.id, { position: "top-right" })
                nav("/login")
            })
            .catch((err) => {
                console.log("something went wrong... Error: ", err)
                setError({
                    errors: err,
                    isError: true
                })
                toast.error("Something went wrong ! Please try again", { position: "top-right" })
            })
    }

    useEffect(() => {
        // console.log("user: ", user)
        toast.success("Hello Palak", { position: "top-right" })
    }, [Signup])

    return (
        <Base>
            <Container>

                <Row>
                    <Col sm={{ size: 6, offset: 3 }} >

                        <Card color='dark' inverse className='mt-2'>
                            {/* Header */}
                            <CardHeader>
                                <h2>Blog Application SIGN UP Form !!</h2>
                            </CardHeader>

                            <CardBody>

                                {/* Sign Up Form */}
                                <Form onSubmit={handleSubmit}>
                                    {/* Name */}
                                    <FormGroup>
                                        <Label for='name' >Enter Name</Label>
                                        <Input
                                            id='name'
                                            name='name'
                                            type='text'
                                            placeholder='Enter here...'
                                            onChange={handleChange}
                                            value={user.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/* Email */}
                                    <FormGroup>
                                        <Label for='email' >Enter Email</Label>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='text'
                                            placeholder='Enter here...'
                                            onChange={handleChange}
                                            value={user.email}
                                            invalid={error.errors?.response?.data?.email ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/* Password */}
                                    <FormGroup>
                                        <Label for='password' >Enter Password</Label>
                                        <Input
                                            id='password'
                                            name='password'
                                            type='password'
                                            placeholder='Enter here...'
                                            onChange={handleChange}
                                            value={user.password}
                                            invalid={error.errors?.response?.data?.password ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.password}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/* About */}
                                    <FormGroup>
                                        <Label for='about' >Enter About</Label>
                                        <Input
                                            id='about'
                                            name='about'
                                            type='textarea'
                                            placeholder='Enter here...'
                                            onChange={handleChange}
                                            value={user.about}
                                            invalid={error.errors?.response?.data?.about ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.about}
                                        </FormFeedback>
                                    </FormGroup>

                                    <Container className='text-center'>
                                        <Button type='submit' color='info'>Submit</Button>
                                        <Button onClick={handleReset} color='info' className='ms-3'>Reset</Button>
                                    </Container>
                                </Form>

                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </Container>


        </Base>
    )
}

export default Signup