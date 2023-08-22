import React from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const Login = () => {
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
                                <Form>
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