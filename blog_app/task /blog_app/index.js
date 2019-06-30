const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
	host:'localhost',
	user: 'ro',
	password:'1234',
	database:'work'
});



const all_blog_posts_home = "SELECT blogid,title,imglink,SUBSTRING_INDEX(description, '.', 1)description FROM blogposts";


connection.connect(err =>{
	if(err){
		console.log(err);
	}
})

console.log(connection);

app.get("/blogs",(req,res) =>{
	connection.query(all_blog_posts_home,(err,results) =>{
		if(err){
			return res.send(err);
		}else{
			return res.json({data:results})
		}

	})
})

app.get("/blog/:id",(req,res) =>{
	let sql = "SELECT * FROM blogposts WHERE blogid = " + req.params.id;
	connection.query(sql,(err,results) =>{
		if(err){
			return res.send(err);
		}else{
			return res.json({data:results})
		}
	})
})

app.get("/comments/:id",(req,res) =>{
	let sql = "SELECT * FROM comments WHERE blogid = " + req.params.id;
	connection.query(sql,(err,results) =>{
		if(err){
			return res.send(err);
		}else{
			return res.json({data:results})
		}
	})
})


app.get("/add",(req,res) =>{

	const { title,imglink,description } = req.query;
	console.log(req.query)
	const insert_blog = `INSERT INTO blogposts (title,imglink,description) VALUES ('${title}','${imglink}','${description}')`
	connection.query(insert_blog,(err,results) => {
		if(err){
			console.log(err);
		}
		else{
			return res.send("success");
		}
	})
})

app.get("/addcomment",(req,res) =>{

	const { name,comment,blogid } = req.query;
	console.log(req.query)
	const insert_blog = `INSERT INTO comments (name,comment,blogid) VALUES ('${name}','${comment}','${blogid}')`
	connection.query(insert_blog,(err,results) => {
		if(err){
			console.log(err);
		}
		else{
			return res.send("success");
		}
	})
})

app.get("/update/:id",(req,res) =>{

	const { blogid,title,imglink,description } = req.query;
	const update_blog = `UPDATE blogposts SET title = '${title}',imglink = '${imglink}',description = "${description}" WHERE blogid = ${req.params.id}`
	console.log(update_blog)
	connection.query(update_blog,(err,results) => {
		if(err){
			return res.send(err);
		}else{
			console.log(results);
		}
	})
})

app.get("/delete/:id",(req,res) =>{

	const { blogid,title,imglink,description } = req.query;
	console.log(req.query)
	console.log(req.params.id)
	const update_blog = `DELETE FROM blogposts WHERE blogid = ${req.params.id}`
	console.log(update_blog)
	connection.query(update_blog,(err,results) => {
		if(err){
			return res.send(err);
		}else{
			console.log(results);
		}
	})
})

app.get("/delete/comment/:id",(req,res) =>{

	const { blogid,title,imglink,description } = req.query;
	console.log(req.query)
	console.log(req.params.id)
	const update_blog = `DELETE FROM comments WHERE blogid = ${req.params.id}`
	console.log(update_blog)
	connection.query(update_blog,(err,results) => {
		if(err){
			return res.send(err);
		}else{
			console.log(results);
		}
	})
})

app.get("/",(req,res) =>{
	res.send("hello");
})

app.listen(8000,() =>{
	console.log("server running");
})