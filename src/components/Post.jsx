import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'

const Post = ({ post = { title: "This is default Title", content: "This is default content" } }) => {
    return (
        <Card className='border-0 shadow-sm'>
            <CardBody>
                <h4>{post.title}</h4>
                <CardText
                    dangerouslySetInnerHTML={{ __html: post.content.substring(0, 50) + "..." }}
                >
                    {/* {post.content.substring(0, 50)}... */}
                </CardText>

                <Link to={'/post/' + post.postId} className='btn btn-primary'>Read More</Link>
            </CardBody>
        </Card>
    )
}

export default Post