import React, { useState, useEffect } from 'react'
import Base from '../../components/Base'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import photo from '../../image/default.jpg'
import { uploadImage } from '../../services/user-service'
import { toast } from 'react-toastify'
import { doLogin, getCurrUser, getToken } from '../../auth'
import { BASE__URL } from '../../services/helper'
import { Link } from 'react-router-dom'

const ProfileInfo = () => {

    // useState : User
    const [user, setUser] = useState(null)

    // useState :Image
    const [image, setImage] = useState(null)

    // useEffect
    useEffect(() => {
        setUser(getCurrUser())
    }, [])

    // handle Change image
    const handleFileChange = (event) => {
        setImage(event.target.files[0])
        console.log("image", image)
    }

    // useEffect
    useEffect(() => {
        console.log(image)
    }, [handleFileChange])

    // upload Image
    const uploadUserImage = (e) => {
        e.preventDefault()

        if (image === null)
            return;

        uploadImage(image, user.id).then(
            response => {
                console.log(response)
                let data = {
                    token: getToken(),
                    user: response
                }
                doLogin(data, () => {
                    setUser(response)
                    setImage(null)
                })
                toast.success("Image Uploaded Successfully", { position: "top-right" })
            }
        ).catch(error => {
            console.log(error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    return (
        <Base>

            <Row className='mt-2'>
                <Col md={{
                    size: 4,
                    offset: 4
                }} >
                    {
                        user ?
                            <Card>
                                <CardBody>
                                    <Container className='text-center'>
                                        {/* Image */}
                                        <div className="mt-2 shadow-sm text-center">
                                            <Form onSubmit={uploadUserImage} method='POST'>
                                                <Label for='image'>
                                                    <img className='image-fluid'
                                                        src={BASE__URL + '/api/users/image/' + user.image}
                                                        alt={photo}
                                                        style={{ maxWidth: '120px', maxHeight: '110px', cursor: "pointer" }}
                                                    />
                                                </Label>
                                                <Input
                                                    id='image'
                                                    style={{ display: "none" }}
                                                    type='file'
                                                    onChange={handleFileChange}
                                                />
                                                {image &&
                                                    <Container className='text-center'>
                                                        <Button type='submit' color='primary'>
                                                            Upload
                                                        </Button>
                                                    </Container>
                                                }
                                            </Form>
                                        </div>
                                    </Container>

                                    {/* Personal Details */}
                                    <Form>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input value={user.name} disabled />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input value={user.email} disabled />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>About</Label>
                                            <Input value={user.about} disabled />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Roles</Label>
                                            <Input value={user.roles.map((role) => (
                                                role.name
                                            ))
                                            }
                                                disabled />
                                        </FormGroup>
                                    </Form>

                                    <Container className='text-center'>
                                        <Link to={'/user/update-user/' + user.id}
                                            className='btn btn-primary'
                                        >Update</Link>
                                    </Container>
                                </CardBody>
                            </Card>
                            : <h1>No user Logged In yet</h1>
                    }
                </Col>
            </Row>
        </Base>
    )
}

export default ProfileInfo
