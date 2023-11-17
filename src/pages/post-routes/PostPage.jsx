import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getPostByPostId } from '../../services/post-service'
import { BASE__URL } from '../../services/helper'
import Comment from '../../components/Comment'
import { saveComment } from '../../services/comment-service'
import { isLoggedIn } from '../../auth'

const PostPage = () => {

    // Use params
    const { postId } = useParams()

    // useState : Post Details
    const [post, setPost] = useState({
        title: '',
        content: '',
        category: '',
        comments: [],
        user: '',
        imageName: '',
        postId: 0
    })

    // useState : Comment - content
    const [comment, setComment] = useState({
        content: '',
    })

    // UseEffect : Fetch the post
    useEffect(() => {
        getPost()
        console.log("Api fetched ", post)
    }, [])

    // HandleComment
    const handleComment = (event) => {
        setComment({ ...comment, 'content': event.target.value })
    }

    // Add Comment Handlear
    const addComment = () => {
        if (comment.content.trim() === '' || comment.content === '') {
            alert("Comment can't be empty !")
            return
        }
        console.log("comment : ", comment.content)

        // Server Call : Comment Service
        saveComment(post.postId, comment).then(
            (response) => {
                console.log("response ", response)
                toast.success("Comment added successfully", { position: "top-right" })
            }
        ).catch(error => {
            console.log("error", error)
            toast.error(error.response?.message, { position: "top-right" })
        })
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    // Get the post By postId
    const getPost = () => {
        getPostByPostId(postId).then(
            (response) => {
                console.log("Post By Id: ", response)
                setPost(response)
            }
        ).catch(error => {
            console.log("error ", error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // Print Date in Post Header
    const printDate = (date) => {
        return new Date(date).toLocaleString()
    }

    return (
        <Base>
            <Container className='mt-4'>
                <Link to='/' >Home</Link> / {post && (<Link>{post.title}</Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}
                    >
                        <Card className='mt-3 ps-2 border-0'>
                            {
                                (post) && (
                                    <CardBody>
                                        {/* User & Date */}
                                        <CardText>
                                            <h5>Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b></h5>
                                        </CardText>

                                        {/* Category */}
                                        <CardText className='text-muted'>
                                            <span>{post.category.categoryTitle}</span>
                                        </CardText>

                                        {/* Divider */}
                                        <div className="divider" style={{
                                            width: "100%",
                                            height: "1px",
                                            background: "#e2e2e2"
                                        }} />

                                        {/* Title */}
                                        <CardText><h3>{post.title}</h3></CardText>

                                        {/* Image */}
                                        <div className="image-container mt-2  text-center"

                                        >
                                            <img className='image-fluid shadow'
                                                src={BASE__URL + '/api/post/image/' + post.imageName}
                                                alt=""
                                                style={{ maxWidth: "250px", maxHeight: "350px" }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <CardText className='mt-4 mb-4' dangerouslySetInnerHTML={{ __html: post.content }} />

                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={{
                        size: 10,
                        offset: 1
                    }}>
                        {/* Comments */}
                        <Card className='mt-2 pt-2 border-0 shadow'>
                            <Container>
                                <h3>Comments ({post.comments.length})</h3>
                            </Container>

                            {/* Add Comments */}
                            {(isLoggedIn()) &&
                                (
                                    <div className="comment-Box p-2">
                                        <Input
                                            type='textarea'
                                            name='content'
                                            placeholder='Add new comment'
                                            onChange={handleComment}
                                        />
                                        <Button onClick={addComment} className='btn-sm mt-2' color='primary'>Add Comment</Button>
                                    </div>
                                )
                            }

                            {/* Divider */}
                            <div className="divider container text-center mt-2" style={{
                                width: "90%",
                                height: "1px",
                                background: "#e2e2e2"
                            }} />

                            <div className="mt-2" />
                            {/* Added Comments */}
                            {
                                post && (
                                    post.comments.map((cmt) => (
                                        <Comment content={cmt.content} key={cmt.id} />
                                    ))
                                )
                            }
                            <div className="mt-2" />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base >
    )
}

export default PostPage
