import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap'
import { getUser, updateUser } from '../../services/user-service'
import { toast } from 'react-toastify'

const UpdateUser = () => {

    // useState
    const [user, setUser] = useState({
        name: '',
        email: '',
        about: '',
    })

    // useState : error
    const [error, setError] = useState(false)

    // useParams
    const { userId } = useParams()

    // useNavigate
    const nav = useNavigate()

    // useEffect
    useEffect(() => {
        loadUser()
        console.log(user)
    }, [])

    // Load User by Id
    const loadUser = () => {
        getUser(userId).then(
            (response) => {
                setUser(response)
                console.log(response, " ", user)
            }
        ).catch(error => {
            console.log(error)
            setError(true)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // handle change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // handle reset
    const handleReset = () => {
        setUser({
            name: '',
            email: '',
            about: ''
        })
    }

    // handle Update 
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)

        updateUser(userId, user).then(
            (response) => {
                toast.success("User Updated Successfully", { position: "top-right" })
                nav('/user/profile-info')
            }
        ).catch(err => {
            console.log(err)
            setError(true)
            toast.error(err.response?.data?.message)
        })
    }


    return (
        <Base>
            <Container>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Card className='mt-3 shadow'>
                            <CardHeader>
                                <h2>Update USER Form !!</h2>
                            </CardHeader>

                            <CardBody>
                                {/* Update User Details */}
                                <Form onSubmit={handleSubmit} method='PUT'>
                                    {/* Name */}
                                    <FormGroup>
                                        <Label for='name'>Name</Label>
                                        <Input
                                            id='name'
                                            name='name'
                                            type='text'
                                            value={user.name}
                                            placeholder='Enter Here...'
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    {/* Email */}
                                    <FormGroup>
                                        <Label for='email'>Email</Label>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='text'
                                            value={user.email}
                                            placeholder='Enter Here...'
                                            onChange={handleChange}
                                        />
                                        {error && <FormText color='danger'>
                                            Please Use another email address !! 
                                        </FormText>}
                                    </FormGroup>
                                    {/* About */}
                                    <FormGroup>
                                        <Label for='about'>About</Label>
                                        <Input
                                            id='about'
                                            name='about'
                                            type='textarea'
                                            value={user.about}
                                            placeholder='Enter Here...'
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    {/* Pasword */}
                                    <FormGroup>
                                        <Input
                                            id='password'
                                            name='password'
                                            type='text'
                                            value={user.password}
                                            placeholder='Enter Here...'
                                            style={{ display: "none" }}
                                        />
                                    </FormGroup>

                                    {/* Button */}
                                    <Container className='text-center'>
                                        <Button type='submit' color='primary'>Submit</Button>
                                        <Button onClick={handleReset} className='btn btn-warning ms-2'>Reset</Button>
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

export default UpdateUser
