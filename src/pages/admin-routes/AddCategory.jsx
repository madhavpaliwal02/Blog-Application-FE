import React, { useState } from 'react'
import { Button, Card, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { addCategory, updateCategory } from '../../services/category-service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddCategory = ({ cat }) => {

    // useState : Category
    const [category, setCategory] = useState({
        categoryTitle: '',
        categoryDescription: ''
    })

    // useNavigate
    const nav = useNavigate()

    // handle Change
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log(category)
        addCategory(category).then(
            (response) => {
                toast.success("Category Added Successfully", { position: "top-right" })
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        ).catch((error) => {

        })
    }

    // handle Update
    const handleUpdate = (e) => {
        e.preventDefault()
        updateCategory(cat.categoryId, category).then(
            (response) => {
                nav('/admin')
            }
        ).catch((error) => {
            toast.error(error.response?.data?.message, { position: "top-right" })
        })
    }

    return (
        <Container>
            <Card color='dark' inverse className='px-3 pb-2'>
                <CardHeader className='text-center'>
                    <h2>Add Category Form</h2>
                </CardHeader>
                {/* Category Form */}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for='categoryTitle'>Category Title</Label>
                        <Input
                            id='categoryTitle'
                            name='categoryTitle'
                            type='text'
                            placeholder='Enter Category Title'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='categoryDescription'>Category Description</Label>
                        <Input
                            id='categoryDescription'
                            name='categoryDescription'
                            type='text'
                            placeholder='Enter Category Description'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Container className='text-center'>
                        <Button type='submit' color='info'>Submit</Button>
                        <Button type='reset' color='info' className='ms-4'>Reset</Button>
                    </Container>
                </Form>
            </Card>
        </Container>
    )
}

export default AddCategory
