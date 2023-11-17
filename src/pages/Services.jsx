import React from 'react'
import Base from '../components/Base'
import { Container } from 'reactstrap'

const Services = () => {

    const bg = {
        backgroundColor: "#f7fcfc",
    }

    const title = {
        fontSize: "1.2em",
        fontWeight: "600",
    }

    const cont = {
        fontSize: "1.2em",
        fontWeight: "500",
        textIndent: "100px",
        wordSpacing: "3px",
        lineHeight: "25px",
        marginTop: "20px"
    }

    const listItem = {
        lineHeight: "30px"
    }

    const listHeader = {
        fontWeight: "bold",
        fontSize: "1.2em",

    }

    const listContent = {
        fontSize: "17px",
        fontWeight: "500",
        wordSpacing: "2px",

    }

    return (
        <Base>
            <Container style={bg}>
                <Container className='mt-3' >
                    <h1>Services Overview</h1>
                    <h3>Welcome to <span style={title}>BlogSphere</span> - Your Ultimate Blogging Destination!</h3>

                    <p style={cont}>At BlogSphere, we are committed to providing you with a seamless and feature-rich blogging experience. Our array of services is designed to empower bloggers of all levels, from beginners to seasoned pros. Whether you're looking to share your thoughts, build an online presence, or grow your audience, BlogSphere has the tools and resources to help you achieve your blogging goals.</p>
                </Container>

                <Container className='mt-4 py-2'>
                    <ol>
                        <li style={listItem}><span style={listHeader}>User-Friendly Blogging Platform</span>: <span style={listContent}>We offer a user-friendly, intuitive blogging platform that makes it easy to create and manage your blog posts. Our platform is designed with both beginners and experienced bloggers in mind, ensuring that you have the flexibility and control you need.</span></li>

                        <li style={listItem}><span style={listHeader}>Customizable Templates</span>: <span style={listContent}>Express your unique style with our collection of customizable blog templates. Choose from a variety of layouts, color schemes, and fonts to make your blog stand out and reflect your personal brand.</span></li>

                        <li style={listItem}><span style={listHeader}>Content Management</span>: <span style={listContent}>Effortlessly organize and manage your content with our robust content management system. Create drafts, schedule posts for publication, and categorize your articles to keep your blog organized and your readers engaged.</span></li>

                        <li style={listItem}><span style={listHeader}>Social Integration</span>: <span style={listContent}>Expand your reach and engage with your audience by connecting your social media accounts. Share your latest blog posts and interact with your readers on popular social platforms.</span></li>

                        <li style={listItem}><span style={listHeader}>Community and Networking</span>: <span style={listContent}>Join a vibrant community of bloggers and readers. Connect with like-minded individuals, exchange ideas, and collaborate on projects to enhance your blogging experience.</span></li>

                        <li style={listItem}><span style={listHeader}>Security and Data Protection</span>: <span style={listContent}>Rest assured that your data and content are safe with us. We prioritize security and data protection to keep your blog and personal information secure. Focus on creating, and let us handle the technical details.</span></li>

                        <li style={listItem}><span style={listHeader}>24/7 Support</span>: <span style={listContent}>Rest easy knowing that our dedicated support team is here to assist you around the clock. Whether you have technical questions or need guidance on improving your blog, we're here to help.</span></li>
                    </ol>
                </Container>
            </Container>
        </Base>
    )
}

export default Services