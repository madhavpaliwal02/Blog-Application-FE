import React from 'react'
import Base from '../components/Base'
import { Container } from 'reactstrap'

const About = () => {

    const bg = {
        backgroundColor: "#f7fcfc",
    }

    const listHeader = {
        fontWeight: "bold",
        fontSize: "1.2em"
    }

    const text = {
        textIndent: "90px",
        letterSpacing: "1px",
        wordSpacing: "2px",
        lineHeight: "20px"
    }

    return (
        <Base>
            <Container>
                <Container style={bg} className='shadow-sm mt-3 py-2'>
                    <h1><b>About</b></h1>
                    <h6 style={text}>Welcome to <span style={listHeader}>BlogShare</span>, your one-stop destination for all things programming and technology! We are passionate about the ever-evolving world of software development, and we've created this platform to share our knowledge, experiences, and insights with fellow tech enthusiasts like you.
                    </h6>
                </Container>

                <Container style={bg} className='shadow-sm mt-5 py-2'>
                    <h2>Our <b>Mission</b>?</h2>
                    <h6 style={text}>
                        At <span style={listHeader}>BlogShare</span>, our mission is simple yet profound: To empower individuals, developers, and tech enthusiasts with the knowledge and tools they need to thrive in the world of programming and technology. We understand the challenges and complexities that come with this rapidly changing field, and our goal is to make your journey smoother, more informative, and ultimately more enjoyable.
                    </h6>
                </Container>
                <Container style={bg} className='shadow-sm mt-5 py-2'>
                    <h2>Why <b>BlogShare</b>?</h2>
                    <h6 style={text}>
                        In today's fast-paced digital landscape, staying up-to-date with the latest trends, tools, and techniques in programming and technology is crucial. Whether you're a seasoned developer or just starting your journey, our mission is to provide you with valuable resources that empower you to excel in your field.
                    </h6>
                </Container>

                <Container style={bg} className='shadow-sm mt-5 py-2'>
                    <h2>Our <b> Blog Application</b> serves as a hub where you can find:
                    </h2>
                    <ul>
                        <li><span style={listHeader}>In-Depth Tutorials</span>: Dive into comprehensive tutorials on a wide range of programming languages, frameworks, and technologies. Whether you're interested in Java, Spring Boot, React JS, or any other tech stack, we've got you covered.</li>

                        <li><span style={listHeader}>News and Updates</span>: Stay informed about the latest industry news, product releases, and updates. We sift through the noise to bring you the most relevant and noteworthy information.</li>

                        <li><span style={listHeader}>Best Practices</span>: Learn from industry experts as they share their best practices, tips, and tricks to help you write clean, efficient, and maintainable code.</li>

                        <li><span style={listHeader}>Community Engagement</span>: Connect with a vibrant community of developers, engineers, and tech enthusiasts. Share your thoughts, ask questions, and collaborate on exciting projects.</li>
                    </ul>
                </Container>

                <Container style={bg} className='shadow-sm mt-5 py-2'>
                    <h2>Our <b> Tech Stack</b></h2>
                    <h6>
                        <h5>
                            Behind the scenes, [Your Blog Application Name] leverages cutting-edge technologies to provide you with a seamless and feature-rich experience. Our tech stack includes:
                        </h5>
                    </h6>

                    <h6>
                        <ul>
                            <li><span style={listHeader}>Backend</span>: We use Java and Spring Boot to create a robust and scalable backend infrastructure. Spring Security ensures your data is safe and secure, while MySQL stores and manages your content. Our RestAPIs power the dynamic data retrieval and interaction.</li>
                            <li><span style={listHeader}>Frontend</span>: Our user-friendly frontend is built with HTML, CSS, and JavaScript, providing a responsive and visually appealing interface. We've incorporated React JS and Bootstrap to deliver a modern and intuitive user experience.</li>
                        </ul>
                    </h6>
                </Container>

                <Container style={bg} className='shadow-sm my-5 py-2'>
                    <h6>At <span style={listHeader}>BlogSphere</span>, we're committed to fostering a learning community, facilitating knowledge sharing, and promoting innovation in the world of programming and technology.</h6>

                    <h6>Thank you for being a part of our journey. We look forward to helping you thrive in the exciting world of software development!</h6>
                </Container>
            </Container>
        </Base>
    )
}

export default About