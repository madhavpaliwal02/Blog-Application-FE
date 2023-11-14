import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../../components/Base'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import JoditEditor from 'jodit-react'
// import { loadAllCategories } from '../../services/category-service'
import { loadAllCategories } from '../../services/category-service'
import { getPostByPostId, postImageService, updatePostById } from '../../services/post-service'
import { toast } from 'react-toastify'

const UpdatePost = () => {

    // useParam
    const { postId } = useParams()

    // use Navigate
    const nav = useNavigate()

    // useState : Post
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: 0,
        postId: 0
    })

    // useState : categories
    const [categories, setCategories] = useState([])

    // useState :Image
    const [image, setImage] = useState(null)

    // useState : Jodit React
    const editor = useRef(null)

    // useEffect
    useEffect(() => {
        getCategoriesHandler()
        getPostHandler()
        console.log(post)
    }, [])

    // Server Call : Getting all categories
    const getCategoriesHandler = () => {
        // Api Call
        loadAllCategories().then((response) => {
            setCategories(response)
        }
        ).catch((error) => {
            toast.error(error.response?.data, { position: "top-right" })
            console.log(error)
        })
    }

    // Server Call : Get Old Post Details
    const getPostHandler = () => {
        getPostByPostId(postId).then(
            res => {
                setPost({
                    postId: res.postId,
                    title: res.title,
                    content: res.content,
                    categoryId: res.category?.categoryId
                })
            }
        ).catch((error) => {
            toast.error(error.response?.data, { position: "top-right" })
            console.log(error)
        })
    }

    // Handle Change
    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    // handleChangeContent
    const handleChangeContent = (data) => {
        setPost({ ...post, 'content': data })
    }

    // handle Change image
    const handleFileChange = (event) => {
        setImage(event.target.files[0])
        console.log("image", image)
    }

    // Handle Update Post
    const handleUpdatePost = (e) => {
        e.preventDefault()
        if (post.title.trim() === '') {
            alert("Post title is required !")
            return
        }
        if (post.content.trim() === '') {
            alert("Post content is required !")
            return
        }

        updatePostById(post).then(
            (response) => {
                toast.success("Post Updated Sucessfully", { position: "top-right" })
                console.log(response)
                console.log(image)
                if (image !== null) {
                    addImage(image, response.postId)
                    toast.success("Image Updated Sucessfully", { position: "top-right" })
                }
                setTimeout(() => {
                    nav('/user/dashboard')
                }, 2500);
            }
        ).catch((error) => {
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // Server Call : Add Image 
    const addImage = (file, postId) => {
        postImageService(file, postId).then(
            (response) => {
                console.log(response)
                console.log("Image Successfully Added")
            }
        ).catch(error => {
            console.log("Error", error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }


    return (
        <Base>
            <Container>
                <h1 className='text-center'></h1>
                <Card className='shadow-sm mt-2'>
                    <CardBody>
                        {/* Form Header */}
                        <h3>Update Blog Page</h3>
                        <Form onSubmit={handleUpdatePost} >
                            {/* Post Title */}
                            <div className='my-3'>
                                <Label for='title'>Post Title</Label>
                                <Input
                                    type='text'
                                    placeholder='Enter here'
                                    id='title'
                                    name='title'
                                    className='rounded-0'
                                    value={post.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Post Content */}
                            <div className='my-3'>
                                <Label for='content'>Post Content</Label>
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    onChange={handleChangeContent}
                                />
                            </div>

                            {/* Post Image */}
                            <div className="my-3">
                                <Label for='image'>Post Image</Label>
                                <Input
                                    id='image'
                                    type='file'
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* Post Category */}
                            <div className='my-3'>
                                <Label for='category'>Post Category</Label>
                                <Input type='select' id='category'
                                    className='rounded-0'
                                    name='categoryId'
                                    onChange={handleChange}
                                    value={post.categoryId}
                                >
                                    <option disabled value={0}>--Select Category--</option>
                                    {
                                        categories.map((cat) => (
                                            <option value={cat.categoryId} key={cat.categoryId}>
                                                {cat.categoryTitle}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </div>

                            <Container className='text-center'>
                                <Button color='primary' >Update Post</Button>
                                <Button color='danger' type='reset' className='ms-2' >Reset</Button>
                            </Container>

                        </Form>
                    </CardBody>
                </Card>
            </Container>

        </Base>
    )
}

export default UpdatePost
