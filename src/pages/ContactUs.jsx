import React, { useEffect, useRef } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import Base from '../components/Base'
// import photo from '../image/default.jpg'
import mad from '../image/mad.png'
import pal from '../image/pal - Copy.jpg'
import { TypeAnimation } from 'react-type-animation'
import ScrollReveal from 'scrollreveal'

const ContactUs = () => {

    const first = {
        fontWeight: "500",
        fontSize: "1.2em",
        textIndent: "50px",
        lineHeight: "22px",
        textAlign: "left",
        padding: "0"
        // margin: "0"
    }

    const second = {
        fontWeight: "500",
        textAlign: "left",
        lineHeight: "20px",
        marginTop: "2px",
        textIndent: "30px",
        padding: "0",
        // margin: "0"
    }

    const name = {
        fontWeight: "600",
        fontSize: "1.3em",
        textAlign: "right",
        fontStyle: "italic",
        lineHeight: "20px",
        padding: "0",
        // margin: "0"
    }

    const refs = useRef()

    const left = {
        origin: "left",
        duration: 4000,
        delay: 3000,
        distance: "500px",
        scale: 1,
        easing: "ease",
    };

    useEffect(() => {
        ScrollReveal().reveal(refs.left, left)
    })

    return (
        <Base>
            <Row className='text-center mt-2'>
                {/* Palak Porwal */}
                <Col md={{ size: 5, offset: 1 }}>
                    <Card className='shadow' ref={left}>
                        {/* Image & Name */}
                        <CardHeader>
                            <img src={pal} alt="" width="70px" />
                            <h2 className='mt-2'>
                                <TypeAnimation
                                    sequence={[
                                        "Java Developer", 1000,
                                        "Backend Engineer", 1000,
                                        "Software Developer", 1000,
                                    ]}
                                    speed={100}
                                    deletionSpeed={50}
                                    repeat={Infinity}
                                />
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <p style={first}>"I am an enthusiastic and aspiring software engineer with a strong foundation in Java programming. My passion for technology, coupled with my academic background, has equipped me with a solid understanding of software development principles and Java programming."</p>

                            <p style={second}>"I am eager to apply my knowledge and learn from experienced professionals in the field while contributing to exciting projects and embracing new challenges."</p>

                            <p style={name}>~ Palak Porwal</p>
                        </CardBody>
                    </Card>
                </Col>
                {/* Madhav Paliwal */}
                <Col md={{ size: 5 }}>
                    <Card className='shadow'>
                        {/* Image & Name */}
                        <CardHeader>
                            <img src={mad} alt="" width="95px" />
                            <h2 className='mt-2'>
                                <TypeAnimation
                                    sequence={[
                                        "React Developer", 1000,
                                        "Frontend Engineer", 1000,
                                        "Full Stack Developer", 1000,
                                    ]}
                                    speed={100}
                                    deletionSpeed={50}
                                    repeat={Infinity}
                                />
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <p style={first}>"I am an aspiring software engineer with a strong foundation in Java and React. As a recent graduate, I am excited to embark on my career journey in the world of software development. My enthusiasm for technology and my eagerness to learn make me a motivated and adaptable team member."</p>

                            <p style={second}>"I am eager to apply my skills in Java and React to real-world projects, contribute to innovative solutions, and continue growing as a software engineer."</p>

                            <p style={name}>~ Madhav Paliwal</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Base>
    )
}

export default ContactUs
