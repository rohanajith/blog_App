import React , {Component} from 'react';
import {Jumbotron,Button,Container,Card,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../components/landingpage.css';
import axios from 'axios';

class LandingPage extends Component{

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
		fetch('http://localhost:8000/blogs')
		.then(response => response.json())
		.then(response => this.setState({blogposts:response.data}))
		.then(err => console.log(err))
	}
	
	

	renderBlogs = ({blogid,title,imglink,description}) =>

		<Col className = "mb-4 pb-1" >
			<Card style={{width:'18rem'}} className = " h-100">
				<Card.Img variant = "top" src={imglink} className = "img-responsive"/>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text >{description + "."}</Card.Text>
						<Link to={"/blog/" + blogid} ><Button variant="primary" className = "mr-3">Go to Post</Button></Link>
						<Link to={"/update/" + blogid} ><i class="fa fa-pencil-square-o fa-lg"  title = "Edit"   aria-hidden="true"/></Link>
						<Link to={"/delete/" + blogid} ><i class="fa fa-trash fa-lg" title = "Delete"  aria-hidden="true" ></i></Link>
					</Card.Body>
			</Card>
		</Col>

	render(){
		const { blogposts, blog} = this.state;
		return(
			<div>
				
				<Jumbotron fluid>
				<Container>
					<h1>Welcome to the World of Blogs</h1>
					<p>This is where all the blogs are displayed</p>
					<Link to="/add/blog"><Button variant ="primary">Create a Blog Post</Button></Link>
				</Container>
				</Jumbotron>

				<Container>
					<Row>
				  {blogposts.map(this.renderBlogs)}
				  	</Row>
				</Container>		
			</div>
		);
	}
}
export default LandingPage;