import React , {Component} from 'react';
import {Jumbotron,Button,Container,Row,Col,Form,Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../components/createblogpost.css';

class CreateBlogPost extends Component{

	state={
		blogposts:[],
		blog:{
			blogid:'',
			title:'',
			imglink:'',
			description:'',
		}
	}
	
	addBlog = _ =>{

		const { blog } = this.state
		fetch(`http://localhost:8000/add?title=${blog.title}&imglink=${blog.imglink}&description=${blog.description}`)
		.then(this.getBlogs)
		.catch(err => console.log(err))
		if(blog.title && blog.imglink)
		 alert("Your post has been added");
	}
	
	render(){
		const { blogposts, blog} = this.state;
		return(
			<div>
				<Navbar bg="dark" variant="dark">
					    <Navbar.Brand href="/">Blogs Home</Navbar.Brand>
				</Navbar>
				<div id ="form">
					<h2 className ="m-5">Create a new Blog Post</h2>
					<Form className = "m-5">
					  <Form.Group controlId="formBasicEmail">
					    <Form.Label>Title</Form.Label>
					    <Form.Control required type="text" value ={blog.title} 
					    onChange = {e => this.setState({blog:{...blog,title:e.target.value}})} placeholder="Enter title" />
					  </Form.Group>
					  <Form.Group required controlId="formBasicEmail">
					    <Form.Label>Image Link</Form.Label>
					    <Form.Control required = "true" type="text" value = {blog.imglink} 
					     onChange = {e => this.setState({blog:{...blog,imglink:e.target.value}})} placeholder="Enter image link" />
					  </Form.Group>
					  <Form.Group controlId="exampleForm.ControlTextarea1">
					    <Form.Label>Content</Form.Label>
					    <Form.Control required  as="textarea" rows="10" value = {blog.description} 
					    onChange = {e => this.setState({blog:{...blog,description:e.target.value}})}  />
					  </Form.Group>
					  <Link to="/"><Button variant="primary" onClick = {this.addBlog} type="submit">
					    Create
					  </Button></Link>
					</Form>		
				</div>
			</div> 
		);
	}
}
export default CreateBlogPost;