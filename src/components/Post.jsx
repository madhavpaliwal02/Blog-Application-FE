import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrUser, isLoggedIn } from '../auth'

const Post = ({ post = { title: "This is default Title", content: "This is default content" }, updatePost, deletePost }) => {

    // Current User
    const user = getCurrUser()

    // Is logged in
    const loggedIn = isLoggedIn()

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

                {
                    loggedIn && user && (user.id === post.user.id) &&
                    <Button onClick={updatePost} className='btn btn-warning mx-2'>Update</Button>
                }
                {
                    loggedIn && user && (user.id === post.user.id) &&
                    <Button onClick={deletePost} className='btn btn-danger'>Delete</Button>
                }
            </CardBody>
        </Card>
    )
}

export default Post