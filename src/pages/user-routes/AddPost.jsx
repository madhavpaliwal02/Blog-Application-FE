import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { category_api, post_api } from '../../services/API'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { getCurrUser } from '../../auth'

const AddPost = () => {

    // useState : Categories
    const [categories, setCategories] = useState([])

    // useState : User
    const [user, setUser] = useState('')

    // useState : Jodit React
    const editor = useRef(null)

    // useState : Post
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    // handleChange
    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
        console.log(post)
    }

    // handleChangeConten
    const handleChangeConten = (data) => {
        setPost({ ...post, 'content': data })
    }

    // useEffect
    useEffect(() => {
        getCategoriesHandler()
        setUser(getCurrUser())
    }, [])



    // Getting all categories
    const getCategoriesHandler = () => {
        // Api Call
        axios.get(`${category_api}`).then(
            (response) => {
                setCategories(response.data)
                // console.log(response.data, categories)
            }
        ).catch((error) => {
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

        console.log(post)

        // Call Server API
        console.log("user-id", user)
        const url = `${post_api}user/${user.id}/category/${post.categoryId}/posts`
        console.log("url ", url)
        axios.post(url, post).then(
            (response) => {
                console.log(response.data)
                toast.success("Post Added Successfully", { position: "top-right" })
            }
        ).catch((error) => {
            console.log(error)
            // toast.error("Something went wrong !!", { position: "top-right" })
            toast.error(error.response?.data?.message, { position: "top-right" })
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
                            {/* <Input type='textarea' placeholder='Enter here' id='content' className='rounded-0' style={{ height: '100px' }} /> */}
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                onChange={handleChangeConten}
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
