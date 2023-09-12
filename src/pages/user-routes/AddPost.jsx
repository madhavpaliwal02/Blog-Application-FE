import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { getCurrUser } from '../../auth'
import { loadAllCategories } from '../../services/category-service'
import { addPost } from '../../services/post-service'

const AddPost = () => {

    // useState : Categories
    const [categories, setCategories] = useState([])

    // useState : User
    // const [user, setUser] = useState('')

    // useState : Jodit React
    const editor = useRef(null)

    // useState : Post
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: '',
        userId: ''
    })

    // handleChange
    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    // handleChangeContent
    const handleChangeContent = (data) => {
        setPost({ ...post, 'content': data })
    }

    // useEffect
    useEffect(() => {
        getCategoriesHandler()
        post['userId'] = getCurrUser().id
    }, [])



    // Server Call : Getting all categories
    const getCategoriesHandler = () => {
        // Api Call
        // axios.get(`${category_api}`).then(
        loadAllCategories().then(
            (response) => {
                setCategories(response)
                // console.log(response.data, categories)
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

        // Url generate
        const url = `/api/user/${post.userId}/category/${post.categoryId}/posts`
        // console.log("url ", url)

        // Server Call : Add Post
        // axios.post(url, postObj).then(
        addPost(url, post).then(
            (response) => {
                console.log(response)
                toast.success("Post Created Successfully", { position: "top-right" })
                handleResetPost()
            }
        ).catch((error) => {
            console.log(error)
            toast.error(error.response?.data?.message, { position: "top-right" })
        })
    }

    // Handler Reset Post
    const handleResetPost = () => {
        setPost({
            title: '',
            categoryId: '',
        })
        handleChangeContent('')
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
                            {/* <Input type='textarea' placeholder='Enter here' id='content' className='rounded-0' style={{ height: '100px' }} /> */}
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                onChange={handleChangeContent}
                            />
                        </div>

                        {/* Post Category */}
                        <div className='my-3'>
                            <Label for='category'>Post Category</Label>
                            <Input type='select' id='category' className='rounded-0' name='categoryId' onChange={handleChange} defaultValue={0}>
                                {/* <option>Java</option>
                                <option>Python</option>
                                <option>Spring Boot</option>
                                <option>Hibernate</option> */}
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
                            <Button color='primary' className='rounded-0' >Add Post</Button>
                            <Button color='danger' type='reset' className='rounded-0 ms-2' >Reset</Button>
                        </Container>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default AddPost
