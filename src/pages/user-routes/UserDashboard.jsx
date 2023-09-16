import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from './AddPost'
import { getCurrUser, isLoggedIn } from '../../auth'
import { deletePostById, loadPostsByUser } from '../../services/post-service'
import { Container } from 'reactstrap'
import Post from '../../components/Post'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {

    // useState : User
    const user = getCurrUser()

    // useState : Posts
    const [posts, setPosts] = useState([])

    // useNavigate
    const nav = useNavigate()

    // load Posts by User
    const loadUsersPost = () => {
        loadPostsByUser(user.id).then(
            response => {
                console.log(response)
                setPosts([...response])
            }
        ).catch(error => {
            console.log(error)
        })
    }

    // Update Post
    const updatePost = (post) => {
        console.log(post)
        nav("/user/update-post/" + post.postId)
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
                let updatedPosts = posts.filter(p => p.postId !== post.postId)
                setPosts(updatedPosts)
            }
        ).catch(error => {
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // useEffect
    useEffect(() => {
        loadUsersPost();
    }, [])



    return (
        <Base>
            <AddPost />

            <Container className='mt-4'>
                {/* New Feeds Header */}
                <h1>Blogs Count : ({posts.length})</h1>

                {isLoggedIn() &&
                    posts.map((post, index) => (
                        <Post post={post} key={index}
                            deletePost={() => deletePost(post)}
                            updatePost={() => updatePost(post)}
                        />
                    ))
                }

            </Container>
        </Base>
    )
}

export default UserDashboard
