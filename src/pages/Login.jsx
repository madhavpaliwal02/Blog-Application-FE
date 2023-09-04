import React, { useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { user_api } from '../services/API'
import { doLogin } from '../auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    // Use state : Login Detais
    const [loginDetail, setLoginDetail] = useState({
        email: '',
        password: '',
    })

    // useNavigate
    const nav = useNavigate()

    // Handle Change : Form
    const handleChange = (event) => {
        setLoginDetail({ ...loginDetail, [event.target.name]: event.target.value })
    }

    // Handle Submit : Form
    const handleSubmit = (e) => {
        e.preventDefault()

        // Validating the data
        if (loginDetail.email == '' || loginDetail.password == '') {
            toast.error("Email & Password is required...", { position: "top-right" })
            return
        }

        // Server call : login
        axios.post(`${user_api}login`, loginDetail).then(
            (response) => {
                console.log("Response ", response.data?.message)
                // Saving in Local Storage                                                                                                                                                                                                                                              
                // doLogin(response, () => {
                //     console.log("Data is saved in local storage")
                nav("/user/dashboard")
                // })
                toast.success(response.data?.message, { position: "top-right" })
            }
        ).catch((error) => {
            console.log("Error ", error.response?.data?.message)
            toast.error(error.response?.data?.message, { position: "top-right" })
        })
    }

    return (
        <Base>
            <Row>
                <Col sm={{ size: 4, offset: 4 }}>
                    <Container className='mt-3'>

                        <Card color='dark' inverse>
                            <CardHeader className='text-center'>
                                <h2>Blog Application LOGIN Form !!</h2>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    {/* Email */}
                                    <FormGroup>
                                        <Label for='email'>
                                            Enter Email
                                        </Label>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Enter here'
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    {/* Password */}
                                    <FormGroup>
                                        <Label for='password'>
                                            Enter Password
                                        </Label>
                                        <Input
                                            id='password'
                                            name='password'
                                            type='password'
                                            placeholder='Enter here'
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    <Container className='text-center'>
                                        <Button type='submit' color='info'>Submit</Button>
                                        <Button type='reset' color='info' className='ms-2'>Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>


                    </Container>
                </Col>
            </Row>
        </Base>
    )
}

export default Login