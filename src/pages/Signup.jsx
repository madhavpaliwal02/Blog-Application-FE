import React from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const Signup = () => {
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
                                <Form>
                                    {/* Name */}
                                    <FormGroup>
                                        <Label for='name' >Enter Name</Label>
                                        <Input
                                            id='name'
                                            name='name'
                                            type='text'
                                            placeholder='Enter here...'
                                        />
                                    </FormGroup>
                                    {/* Email */}
                                    <FormGroup>
                                        <Label for='email' >Enter Email</Label>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Enter here...'
                                        />
                                    </FormGroup>
                                    {/* Password */}
                                    <FormGroup>
                                        <Label for='password' >Enter Password</Label>
                                        <Input
                                            id='password'
                                            name='password'
                                            type='password'
                                            placeholder='Enter here...'
                                        />
                                    </FormGroup>
                                    {/* About */}
                                    <FormGroup>
                                        <Label for='about' >Enter About</Label>
                                        <Input
                                            id='about'
                                            name='about'
                                            type='textarea'
                                            placeholder='Enter here...'
                                        />
                                    </FormGroup>

                                    <Container className='text-center'>
                                        <Button type='' color='info'>Submit</Button>
                                        <Button type='reset' color='info' className='ms-3'>Reset</Button>
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