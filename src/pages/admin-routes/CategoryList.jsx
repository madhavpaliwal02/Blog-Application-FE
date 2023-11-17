import React, { useEffect, useState } from 'react'
import { Button, Card, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../../services/category-service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CategoryList = () => {

    // useState : Categories
    const [categories, setCategories] = useState([])

    // useNavigate
    const nav = useNavigate()

    // Loading all categories
    const loadCategories = () => {
        loadAllCategories().then(
            (response) => {
                console.log(response)
                setCategories(response)
            }
        ).catch((error) => {
            toast.error(error.response?.data?.message, { position: "top-right" })
        })
    }

    // Get Category by Id
    const updateCategory = (cat) => {
        nav("/update-cat/" + cat.categoryId)
    }

    // handle Delete
    const handleDelete = (e) => {
        e.preventDefault()
        window.alert("Delete category is disbled as category might have posts !!!")
        return
    }

    // useEffect
    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <Container className='shadow-sm'>
            <Card className='mt-2 px-2' >
                <CardHeader><h3>Categories Available  <i>({categories && categories.length})</i>
                </h3></CardHeader>
                <Form className='mt-2'>
                    {
                        (categories.length > 0) ?
                            categories.map((cat) => (
                                <FormGroup>
                                    <Label className='d-flex flex-row justify-content-between align-items-start'>
                                        <p className='my-0'><b>Title:</b> {cat.categoryTitle}</p>
                                        <div>
                                            <Button onClick={() => updateCategory(cat)} color="warning" size='sm' className='my-0' outline >
                                                Update
                                            </Button>
                                            <Button onClick={handleDelete} color="danger" size='sm' className='my-0 ms-2' outline >
                                                Delete
                                            </Button>
                                        </div>
                                    </Label>
                                    <Input disabled bsSize='sm'
                                        value={cat.categoryDescription}
                                    />
                                </FormGroup>
                            ))
                            :
                            <div>No Categories found</div>
                    }
                </Form>
            </Card>
        </Container>
    )
}

export default CategoryList
