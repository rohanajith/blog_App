import React , {Component} from 'react';
import {Jumbotron,Button,Container,Row,Col,Form,Navbar,Card} from 'react-bootstrap';
import {Link,NavLink} from 'react-router-dom';
import '../components/createblogpost.css';




class EditBlogPost extends Component{
	
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
	
	handleSubmit = _ =>{

		const { blog } = this.state
		const blogid = this.props.match.params.id
		console.log(blog)
		fetch(`http://localhost:8000/update/${blogid}?title=${blog.title}&imglink=${blog.imglink}&description=${blog.description}`)
		.then(this.getBlogs)
		.catch(err => console.log(err))
		if(blog.title && blog.imglink)
		 alert("Your post has been updated");
	}
	handleChange(e){
		
		let blog = this.state.blogposts
		let name = e.target.name
		let value = e.target.value
		blog[name] = value
		this.setState({blog:{...blog,[name]:e.target.value}})
		
	}

	renderBlogs = ({blogid,title,imglink,description}) =>

		<Col className = "mb-4 pb-1" >
			<Card style={{width:'18rem'}} className = " h-100">
				<Card.Img variant = "top" src={imglink} className = "img-responsive"/>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text >{description + "."}</Card.Text>
					</Card.Body>
			</Card>
		</Col>

	render(){
		const { blogposts, blog} = this.state;
		return(
			<div>
				<Navbar bg="dark" variant="dark">
					    <Navbar.Brand href="/">Blogs Home</Navbar.Brand>
				</Navbar>
				<div id ="form">
					
					<Container>
						<Row>
							<Col><h2>Update Blog Post</h2></Col>
						
					  		{blogposts.map(this.renderBlogs)}
					  	</Row>
					</Container>
					<Form className = "m-5">
					  <Form.Group controlId="formBasicEmail">
					    <Form.Label>Title</Form.Label>
					    <Form.Control required type="text" name = "title" value ={blog.title} 
					    onChange = {e => this.setState({blog:{...blog,title:e.target.value}})}  placeholder="Enter title"
					  	/>
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
					  <Link to="/"><Button to="/"onClick = {this.handleSubmit} type="submit">
					    Update
					  </Button></Link>
					</Form>		
				</div>
			</div> 
		);
	}
}
export default EditBlogPost;