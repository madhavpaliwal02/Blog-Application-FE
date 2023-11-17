import React from 'react'
import { Card, CardBody, CardHeader, CardText, Col, Container, Row } from 'reactstrap'

const Comment = ({ content }) => {
    return (
        <Container>
            <Card className='border-0 m-1'>
                <CardBody className='shadow'>
                    <CardText>
                        <div className="ml-3">{content}</div>
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Comment
