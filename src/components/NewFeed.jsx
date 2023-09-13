import React, { useEffect, useState } from 'react'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import Post from './Post'
import { loadAllPostsService } from '../services/post-service'
import { toast } from 'react-toastify'

const NewFeed = () => {

    // Use State : PostContent
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        pageNumber: '',
        lastPage: false
    })

    // Load all posts
    const loadAllPosts = (pageNumber = 0, pageSize = 2) => {
        if ((postContent.pageNumber < pageNumber && postContent.lastPage) ||
            (postContent.pageNumber > pageNumber && postContent.pageNumber == 0))
            return;

        loadAllPostsService(pageNumber, pageSize).then(
            (response) => {
                console.log(response)
                setPostContent(response)
                window.scroll(0, 0)
            }
        ).catch((error) => {
            console.log("Error ", error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // UseEffect
    useEffect(() => {
        loadAllPosts()
        console.log("Post content :", postContent.content)
    }, [])

    // Handle Pagination
    const handlePagination = (index) => {
        loadAllPosts(index)
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col md={{
                    size: 10,
                    offset: 1
                }}
                >
                    <h1>Blogs Count : ({postContent?.totalElements})</h1>

                    {
                        postContent.content.map((post) => (
                            <Post post={post} key={post.postId} />
                        ))
                    }


                    <Container className='mt-3'>

                        <Pagination>
                            <PaginationItem
                                disabled={postContent.pageNumber == 0}
                                onClick={() => handlePagination(postContent.pageNumber - 1)}
                            >
                                <PaginationLink previous>Prev</PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => (

                                    <PaginationItem
                                        key={index}
                                        active={postContent.pageNumber == index}
                                        onClick={() => handlePagination(index)}
                                    >
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }

                            <PaginationItem
                                disabled={postContent.lastPage}
                                onClick={() => handlePagination(postContent.pageNumber + 1)}
                            >
                                <PaginationLink next>Next</PaginationLink>
                            </PaginationItem>
                        </Pagination>

                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed
