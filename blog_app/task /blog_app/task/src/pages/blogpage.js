import React , {Component} from 'react';
import {Jumbotron,Button,Container,Card,Row,Col,Navbar,Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import '../components/blogpage.css'

class BlogPage extends Component{

	state={
		blogposts:[],
		blog:{
			blogid:'',
			title:'',
			imglink:'',
			description:'',
		},
		comments_list:[],
		comments:{
			name:'',
			comment:'',
			blogid:'',
		}
	}
	
	componentDidMount(){
		this.getProduct()
		this.getComment()
		
	}
	
	getProduct(){
	
		fetch('http://localhost:8000/blog/' + this.props.match.params.id)
		.then(response => response.json())
		.then(response => this.setState({blogposts:response.data}))
		.then(err => console.log(err))
	}
	
	getComment(){
	
		fetch('http://localhost:8000/comments/' + this.props.match.params.id)
		.then(response => response.json())
		.then(response => this.setState({comments_list:response.data}))
		.then(err => console.log(err))
	}
	
	addComment = _ =>{

		const { comments } = this.state
		const blogid = this.props.match.params.id
		fetch(`http://localhost:8000/addcomment?name=${comments.name}&comment=${comments.comment}&blogid=${blogid}`)
		.then(this.getComments)
		.catch(err => console.log(err))
	}

	renderBlogs = ({blogid,title,imglink,description}) =>
	  
	  <Row>
		<Col className = "mb-4">
			<div id = "card_size"><img src ={imglink}/></div>
		</Col>
		<Col className = "mb-4" >
			<h2 id="write_up">{title}</h2>
			<p>{description}</p>
		</Col>
	  </Row>

	renderComments = ({name,comment}) =>
	 
			<h3 className=" p-2">{name} commented : {comment}</h3>
		
	render(){
		const { blogposts, blog,comments_list,comments} = this.state;
		return(
			<div>
				<Navbar bg="dark" variant="dark" id="navbar">
				    <Navbar.Brand href="/">Blogs Home</Navbar.Brand>
				</Navbar> 
				<Container>
					{blogposts.map(this.renderBlogs)}
				</Container>		
				<div id ="form">
					<h2 className ="m-5">Add Comment</h2>
					<Form className = "m-5">
					  <Form.Group controlId="formBasicEmail">
					    <Form.Label>Name</Form.Label>
					    <Form.Control required type="text" value ={comments.name} 
					    onChange = {e => this.setState({comments:{...comments,name:e.target.value}})} placeholder="Enter your name" />
					  </Form.Group>
					  <Form.Group controlId="exampleForm.ControlTextarea1">
					    <Form.Label>Comment</Form.Label>
					    <Form.Control required  as="textarea" rows="2" value = {comments.comment} 
					    onChange = {e => this.setState({comments:{...comments,comment:e.target.value}})}
					    placeholder = "Enter comment"  />
					  </Form.Group>
					  <Button variant="primary" onClick = {this.addComment} type="submit">
					    Add
					  </Button>
					</Form>		
				</div>
				<div>
				<h2 className ="m-5">Comments</h2>

				 <Row>
					<Col className = "mb-4">
						<div id = "comments_card_size">
						 {comments_list.map(this.renderComments)}
						</div>
					</Col>
				 </Row>
				</div>
			</div>
		);
	}
}
export default BlogPage;