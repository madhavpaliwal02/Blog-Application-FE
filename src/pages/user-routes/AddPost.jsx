import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { getCurrUser } from '../../auth'
import { loadAllCategories } from '../../services/category-service'
import { addPost, postImageService } from '../../services/post-service'

const AddPost = () => {

    // useState : Categories
    const [categories, setCategories] = useState([])

    // useState :Image
    const [image, setImage] = useState(null)

    // useState : Jodit React
    const editor = useRef(null)

    // useState : Post
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: 0,
        userId: 0,
        postId: 0
    })

    // handleChange
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

    // useEffect : On Page load
    useEffect(() => {
        getCategoriesHandler()
        post['userId'] = getCurrUser().id
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

    // Handle Add Post
    const handleAddPost = (e) => {
        e.preventDefault()

        if (post.title.trim() === '') {
            alert("Post title is required !")
            return
        }
        if (post.content.trim() === '') {
            alert("Post content is required !")
            return
        }
        if (post.categoryId === '') {
            alert("Select some category")
            return
        }

        // Server Call : Add Post
        addPost(post.userId, post.categoryId, post).then(
            (response) => {
                console.log(response)
                toast.success("Post Created Successfully", { position: "top-right" })
                addImage(image, response.postId)
                setTimeout(() => {
                    window.location.reload()
                }, 2500);
            }
        ).catch((error) => {
            console.log(error)
            toast.error(error.response?.data?.message, { position: "top-right" })
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
        <Container>
            <Card className='shadow-sm mt-2'>
                <CardBody>
                    {/* Form Header */}
                    <h3>Add Post Form</h3>
                    <Form onSubmit={handleAddPost} method='POST'>
                        {/* Post Title */}
                        <div className='my-3'>
                            <Label for='title'>Post Title</Label>
                            <Input type='text' placeholder='Enter here' id='title' name='title' className='rounded-0' onChange={handleChange} />
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
                            <Input id='image' type='file'
                                onChange={handleFileChange} />
                        </div>

                        {/* Post Category */}
                        <div className='my-3'>
                            <Label for='category'>Post Category</Label>
                            <Input type='select' id='category' className='rounded-0' name='categoryId' onChange={handleChange} defaultValue={0}>
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
                            <Button color='primary' >Add Post</Button>
                            <Button color='danger' type='reset' className='ms-2' >Reset</Button>
                        </Container>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default AddPost
