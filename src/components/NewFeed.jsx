import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import Post from './Post'
import { deletePostById, loadAllPostsService } from '../services/post-service'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'

const NewFeed = () => {

    // useNavigate
    const nav = useNavigate()

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

        // Server Call
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
                // window.scroll(0, 0)
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

    // Handle Change Page Infinity
    const changedPageInfinity = () => {
        console.log("Page Changed")
        setCurrentPage(currentPage + 1)
    }

    // Delete Post
    const deletePost = (post) => {
        let del = window.confirm("Are you sure ?")
        if (!del) {
            return;
        }

        deletePostById(post.postId).then(
            response => {
                console.log("Deleted  ", response)
                toast.success(response?.message, { position: "top-right" })
                let updatedPosts = postContent.content.filter(p => p.postId != post.postId)
                setPostContent({ ...postContent, content: updatedPosts })
            }
        ).catch(error => {
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // Update Post
    const updatePost = (post) => {
        console.log(post)
        nav("/user/update-post/" + post.postId)
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col md={{ size: 12 }}>
                    {/* New Feeds Header */}
                    <h1>Blogs Count : ({postContent?.totalElements})</h1>

                    {/* Infinite Scroll */}
                    <InfiniteScroll
                        dataLength={postContent.content?.length}
                        next={changedPageInfinity}
                        hasMore={!postContent?.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            postContent.content.map((post) => (
                                <Post post={post} key={post.postId}
                                    deletePost={() => deletePost(post)}
                                    updatePost={() => updatePost(post)}
                                />
                            ))
                        }
                    </InfiniteScroll>
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed
