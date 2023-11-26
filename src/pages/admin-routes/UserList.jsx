import React, { useEffect, useState } from 'react'
import { Card, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { getAllUsers } from '../../services/user-service'
import { toast } from 'react-toastify'

const UserList = () => {
    // useState : Users
    const [users, setUsers] = useState([])

    // loadUsers
    const loadUsers = () => {
        getAllUsers().then(
            (response) => {
                console.log(users)
                setUsers({ ...users, response })
            }
        ).catch((error) => {
            toast.error(error.response?.data.message, { position: "top-right" })
        })
    }

    // useEffect
    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <Container>
            <Card className='px-3'>
                <CardHeader className='text-center mb-2'>
                    <h2>User's List <i>({users.response && users.response.length})</i>
                    </h2>
                </CardHeader>
                <Form>
                    {
                        (users.response?.length > 0) ?
                            users.response?.map((user) => (
                                <FormGroup className='shadow-sm p-1'>
                                    <Label>{user.id}. {user.name}</Label>
                                    <Input disabled bsSize='sm'
                                        value={user.email} />
                                </FormGroup>
                            ))
                            :
                            <div>No User's Available</div>
                    }
                </Form>
            </Card>
        </Container>
    )
}

export default UserList
