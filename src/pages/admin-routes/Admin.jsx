import React from 'react'
import Base from '../../components/Base'
import { Col, Container, Row } from 'reactstrap'
import AddCategory from './AddCategory'
import CategoryList from './CategoryList'
import UserList from './UserList'

const Admin = () => {

    return (
        <Base>
            <Container>
                <Row className='my-3'>
                    <Col md={{ size: 5, offset: 1 }}>
                        {/* Add Category Form */}
                        <AddCategory />

                        <hr />

                        {/* Category Available */}
                        <CategoryList />
                    </Col>
                    <Col md={{ size: 5, offset: 1 }}>
                        {/* Users List */}
                        <UserList />
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default Admin
