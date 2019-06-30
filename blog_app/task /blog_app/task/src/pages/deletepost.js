import React , {Component} from 'react';
import {Jumbotron,Button,Container,Row,Col,Form,Navbar} from 'react-bootstrap';
import {Link,NavLink} from 'react-router-dom';
import '../components/createblogpost.css';




class DeletePost extends Component{
	
	state={
		blogposts:[],
		blog:{
			blogid:'',
			title:'',
			imglink:'',
			description:'',
		}

	}
	componentDidMount(){
		this.getPosts();
	}
	getPosts(){

		fetch('http://localhost:8000/blog/' + this.props.match.params.id)
		.then(response => response.json())
		.then(response => this.setState({blogposts:response.data}))
		.then(err => console.log(err))
	}

	deletePost = _  =>{

		const { blog } = this.state
		fetch(`http://localhost:8000/delete/`+ this.props.match.params.id)
		.then(this.getBlogs)
		.catch(err => console.log(err))
		alert("Your post has been deleted");
	}

	deleteComment = _  =>{

		const { blog } = this.state
		fetch(`http://localhost:8000/delete/comment/`+ this.props.match.params.id)
		.then(this.getBlogs)
		.catch(err => console.log(err))
	}

	renderBlogs = ({blogid,title,imglink,description}) =>
		<Form className = "m-5">
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Title</Form.Label>
						    <Form.Control required type="text" value ={title} 
						     placeholder="Enter title"
						  	/>
						  </Form.Group>
						  <Form.Group required controlId="formBasicEmail">
						    <Form.Label>Image Link</Form.Label>
						    <Form.Control required = "true" type="text" value = {imglink} 
						     placeholder="Enter image link" />
						  </Form.Group>
						  <Form.Group controlId="exampleForm.ControlTextarea1">
						    <Form.Label>Content</Form.Label>
						    <Form.Control required  as="textarea" rows="10" value = {description} 
						      />
						  </Form.Group>
						  <Link to="/"><Button to="/" onClick = {() =>{this.deleteComment(); this.deletePost()}} type="submit">
						    Delete
						  </Button></Link>
		</Form>		
	render(){
		const { blogposts, blog} = this.state;
		return(
			<div>
				<Navbar bg="dark" variant="dark">
					    <Navbar.Brand href="/">Blogs Home</Navbar.Brand>
				</Navbar>
				<div id ="form">
					<h2 className ="m-5">Delete Blog Post</h2>
					{blogposts.map(this.renderBlogs)}

				</div>
			</div> 
		);
	}
}
export default DeletePost;