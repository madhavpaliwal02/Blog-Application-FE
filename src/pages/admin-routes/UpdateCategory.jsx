import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Button, Card, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategory, updateCategory } from '../../services/category-service'
import { toast } from 'react-toastify'

const UpdateCategory = () => {

    // useParams
    const { categoryId } = useParams()

    // useState : Category
    const [category, setCategory] = useState({
        categoryId: '',
        categoryTitle: '',
        categoryDescription: ''
    })

    // useNavigate
    const nav = useNavigate()

    // Get Category by Id
    const loadCategory = () => {
        getCategory(categoryId).then(
            (response) => {
                setCategory({
                    categoryId: response.categoryId,
                    categoryTitle: response.categoryTitle,
                    categoryDescription: response.categoryDescription
                })
            }
        ).catch((error) => {
            toast.error(error.response?.data?.message, { position: "top-right" })
        })
    }

    // handle Change
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    // handle Update
    const handleUpdate = (e) => {
        e.preventDefault()

        console.log(categoryId, " ", category)

        // update api Calling
        updateCategory(categoryId, category).then(
            (response) => {
                toast.success("Category updated successfully", { position: "top-right" })
                setTimeout(() => {
                    nav('/admin')
                }, 1500)
            }
        ).catch((error) => {
            console.log(error)
            toast.error(error.response?.data, { position: "top-right" })
        })
    }

    // useEffect
    useEffect(() => {
        loadCategory()
    }, [])

    return (
        <Base>
            <Container className='mt-4 w-50'>
                <Card color='dark' inverse className='px-3 pb-2'>
                    <CardHeader className='text-center'>
                        <h2>Update Category Form</h2>
                    </CardHeader>
                    {/* Category Form */}
                    <Form onSubmit={handleUpdate}>
                        <FormGroup>
                            <Label for='categoryTitle'>Category Title</Label>
                            <Input
                                id='categoryTitle'
                                name='categoryTitle'
                                type='text'
                                placeholder='Enter Category Title'
                                value={category.categoryTitle}
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
                                value={category.categoryDescription}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Container className='text-center'>
                            <Button type='submit' color='info'>Update</Button>
                            <Button type='reset' color='info' className='ms-4'>Reset</Button>
                        </Container>
                    </Form>
                </Card>
            </Container>
        </Base>
    )
}

export default UpdateCategory
