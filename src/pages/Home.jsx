import React from 'react'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed'
import { Col, Container, Row } from 'reactstrap'
import Dropdown from '../components/Dropdown'
import { isLoggedIn } from '../auth'

const Home = () => {
    return (
        <Base>
            <Container className='mt-3'>
                <Row>
                    {isLoggedIn() &&
                        (
                            < Col md={2} className='pt-3'>
                                <Dropdown />
                            </Col>
                        )
                    }
                    <Col md={9}>
                        <NewFeed />
                    </Col>
                </Row>
            </Container>
        </Base >
    )
}

export default Home