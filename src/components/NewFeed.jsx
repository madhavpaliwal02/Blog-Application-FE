import React, { useEffect, useState } from 'react'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import Post from './Post'
import { loadAllPostsService } from '../services/post-service'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

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

    // useState : Current Page
    const [currentPage, setCurrentPage] = useState(0)

    // Load all posts
    const loadAllPosts = (pageNumber = 0, pageSize = 4) => {
        if ((postContent.pageNumber < pageNumber && postContent.lastPage) ||
            (postContent.pageNumber > pageNumber && postContent.pageNumber == 0))
            return;

        loadAllPostsService(pageNumber, pageSize).then(
            (response) => {
                console.log(response)
                setPostContent({
                    content: [...postContent.content, ...response.content],
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                    pageNumber: response.pageNumber,
                    lastPage: response.lastPage
                })
                window.scroll(0, 0)
            }
        ).catch((error) => {
            console.log("Error ", error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // UseEffect
    useEffect(() => {
        loadAllPosts(currentPage)
        console.log("Post content :", postContent.content)
    }, [currentPage])

    // Handle Pagination
    const handlePagination = (index) => {
        loadAllPosts(index)
    }

    // Handle Change Page Infinity
    const changedPageInfinity = () => {
        console.log("Page Changed")
        setCurrentPage(currentPage + 1)
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

                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changedPageInfinity}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            postContent.content.map((post) => (
                                <Post post={post} key={post.postId} />
                            ))
                        }
                    </InfiniteScroll>


                    {/* <Container className='mt-3'>

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

                    </Container> */}
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed
