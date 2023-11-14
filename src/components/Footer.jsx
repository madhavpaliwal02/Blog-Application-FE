import React from 'react'
import { Container } from 'reactstrap'

const Footer = () => {
    return (
        // <Container className=''>
        <div className="container-fluid text-center pb-1"
            style={{ background: "#2f2f2f", color: "#ffffff", position: "sticky" }}
        >
            <p className=' '>
                <b>ISO 9001:2011 Certified</b>
                <i>  Copyright Infringement 2008</i>
            </p>
        </div>
        // </Container>
    )
}

export default Footer
