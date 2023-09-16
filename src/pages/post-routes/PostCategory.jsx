import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Col, Container, Row } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Dropdown from '../../components/Dropdown'
import { deletePostById, loadPostsByCategory } from '../../services/post-service'
import Post from '../../components/Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

const PostCategory = () => {

    // useParams
    const { categoryId } = useParams()

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

    // UseEffect : categoryId
    useEffect(() => {
        postContent.content = []
        setCurrentPage(0)
        loadPostsByCategories(categoryId)
    }, [categoryId])

    // Load Categories by Title
    const loadPostsByCategories = (catId, pageNumber = 0, pageSize = 4) => {
        if ((postContent.pageNumber < pageNumber && postContent.lastPage) ||
            (postContent.pageNumber > pageNumber && postContent.pageNumber == 0))
            return;

        loadPostsByCategory(catId, pageNumber, pageSize).then(
            response => {
                console.log(response)
                setPostContent({
                    content: [...postContent.content, ...response.content],
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                    pageNumber: response.pageNumber,
                    lastPage: response.lastPage
                })
            }
        ).catch(error => {
            console.log(error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // UseEffect : currentPage
    useEffect(() => {
        console.log("currentPage")
        loadPostsByCategories(categoryId, currentPage)
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
                let updatedPosts = postContent.content.filter(p => p.postId != postContent.content.postId)
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
        <Base>
            <Container className='mt-3'>
                <Row>
                    <Col md={2} className='pt-3'>
                        <Dropdown />
                    </Col>
                    <Col md={9}>
                        {/* New Feeds Header */}
                        <h1>Blogs Count : ({postContent.totalElements})</h1>

                        {/* Category wise posts */}
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
                                postContent.content.map((post, index) => (
                                    <Post post={post} key={index}
                                        deletePost={() => deletePost(post)}
                                        updatePost={() => updatePost(post)}
                                    />
                                ))
                            }
                        </InfiniteScroll>

                        {/* No Posts in a category */}
                        {
                            postContent.content.length <= 0 && (
                                <h1>No Posts found in this category</h1>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default PostCategory
