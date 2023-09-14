import React, { useEffect, useState } from 'react'
import { Container, ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Dropdown = () => {

    // useState : Categories
    const [categories, setCategories] = useState([])

    // Load all Categories
    const loadCategories = () => {
        loadAllCategories().then(
            (response) => {
                console.log(response)
                setCategories([...response])
            }
        ).catch(error => {
            console.log(error)
            toast.error(error.response?.message, { position: "top-right" })
        })
    }

    // useEffect
    useEffect(() => {
        loadCategories()
    }, [])


    return (
        <Container>
            <ListGroup>
                <ListGroupItem action='true' tag={Link} to="/" >All Posts</ListGroupItem>
                {
                    categories &&
                    categories.map((cat, index) => (
                        <ListGroupItem
                            key={index}
                            value={cat.categoryId}
                            action="true"
                            tag={Link}
                            to={'/category/' + cat.categoryId}
                        >
                            {cat.categoryTitle}
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        </Container>
    )
}

export default Dropdown
