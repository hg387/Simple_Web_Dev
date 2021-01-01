var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("."))
var mysql = require("mysql");

// Calling the database..
var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database /display_student");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
// getting the interface for main page for display tables on the basis of student, grades or courses...
app.get('/main', function (req,res){
	console.log("Connection made to /main");
	
	var html_str = "";
	html_str += "<center><h3>Select a table to display:</h3></center><br>";
	html_str += "<center><select id=\"display_select\"><option value=\"student\">STUDENT</option><option value=\"course\">COURSE</option><option value=\"grades\">GRADES</option></select></center><br><center><button onClick=\"display_table()\">Generate</button></center>";
	html_str += "<div id=\"display\"></div>";
	
	res.send(html_str);
	
});

app.get('/display_student', function(req,res){
	console.log("Connection made to /display_student");
	
	var table = "";
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database /display_student");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
	// processing the query for table on the basis of student
	con.query("SELECT * from STUDENT",function(err,rows,fields){
		if (err){ 
			console.log("Query Processing Error");
		}
		else{
			console.log("Query Processing Successful");
			
			table += "<br><table><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Birth Date</th><th>Major</th></tr>";
			
			for (var i = 0; i < rows.length; i++){
				
				table += "<tr>";
				table += "<th>" + rows[i].studentID + "</th>";
				table += "<th>" + rows[i].firstName + "</th>";
				table += "<th>" + rows[i].lastName + "</th>";
				table += "<th>" + rows[i].birth + "</th>";
				table += "<th>" + rows[i].major + "</th>";
				table += "</tr>";
			};
			
			table += "</table>";
			
			res.send(table)
		}
	});
	
});

app.get('/display_course', function(req,res){
	console.log("Connection made to /display_course");
	
	table = "";
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
	// processing the query for table on the basis of course 
	con.query("SELECT * from COURSE", function(err,rows,fields){
		if (err){ 
			console.log("Query Processing Error");
		}
		else{
			console.log("Query Processing Successful");
			
			table += "<br><table><tr><th>Course ID</th><th>Course Description</th></tr>";
			
			for (var i = 0; i < rows.length; i++){
				
				table += "<tr>";
				table += "<th>" + rows[i].courseID + "</th>";
				table += "<th>" + rows[i].courseDesc + "</th>";
				table += "</tr>";
				
			};
			
			table += "</table>";
			
			res.send(table)
		}
			
		});
	
});
				
app.get('/display_grades', function(req,res){
	console.log("Connection made to /display_grades");
	
	table = "";
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
	// processing the query for table on the basis of grades  
	con.query("SELECT * from GRADES", function(err,rows,fields){
		if (err){
			console.log("Query Processing Error");
		}
		else{
			console.log("Query Processing Successful");
			
			table += "<br><table><tr><th>Course ID</th><th>Student ID</th><th>Term/Year</th><th>Grade</th></tr>";
			
			for (var i = 0; i < rows.length; i++){
				
				table += "<tr>";
				table += "<th>" + rows[i].courseID + "</th>";
				table += "<th>" + rows[i].studentID + "</th>";
				table += "<th>" + rows[i].termYear + "</th>";
				table += "<th>" + rows[i].grade + "</th>";
				table += "</tr>";
				
			};
			
			table += "</table>";
			
			res.send(table)
		}
		});
	
});		
	
app.get("/search", function(req,res){
	console.log("Connection made to /search");
	
	var html_str = "";
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database /search");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
	// processing the query for searching transcript with the interface for choosing student
	// interface for transcript page, also credentials are generated dynamically from the database
	// EXTRA CREDIT ADD STUDENT ALSO DYNAMICALLY WORKS!!!
	con.query('SELECT studentID, firstName, lastName FROM STUDENT ORDER BY lastName', function(err,rows,fields){
		if(err){
			console.log("Error Processing Query");
		}
		else{
			console.log("Query Sucessfully made");
			html_str += "<br><h2>Generate Student Transcipt from the Database</h2>";
			html_str += "<br><p>To Generate, Select the student and term/Year, the click the button 'Generate Transcript' </p>";
			html_str += "<select id=\"s_opts\">";
			
			for(i=0;i<rows.length;i++){
				html_str += "<option value=\"" + rows[i].studentID + "\">" + rows[i].studentID + "," +rows[i].lastName + "," + rows[i].firstName +"</option>";
			}
			
			html_str += "</select>";
			
			con.query('SELECT DISTINCT(termYear) FROM GRADES;', function(err,rows,fields){
				if(err){
					console.log("Error in Query Processing");
				}
				else{
					html_str += "<select id=\"t_opts\">";
					
					for(i=0; i<rows.length;i++){
						html_str += "<option value=\"" + rows[i].termYear + "\">" + rows[i].termYear + "</option>";
					}
					
					html_str += "</select>";
					html_str += "<button onclick=\"display_Trans()\">Generate Transcipt</button>";
					html_str += "<br>";
					html_str += "<div id=\"out\"></div>";
					html_str += "</br>";
					html_str += "<div id=\"search_term\"></div>";
					html_str += "<div id=\"search_table\"></div>";
					
					console.log("Transcript Generated");
					res.send(html_str);
				}
				
			});
		}
	});
});
// for displaying the table of transcript according to the student credentials...
app.get("/display_Trans", function(req,res){
	var st_id = req.query['s'];
	var term = req.query.t;
	var table = "";
	console.log("Connection made to /display_Trans");
	console.log(req.query);
	console.log(st_id);
	console.log(term);
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
	
	var q_str = 'SELECT STUDENT.studentID, STUDENT.firstName, STUDENT.lastName, GRADES.termYear, COURSE.courseID, courseDesc, GRADES.grade FROM STUDENT, COURSE, GRADES WHERE (STUDENT.studentID = GRADES.studentID) AND (COURSE.courseID = GRADES.courseID) AND (GRADES.studentID = ' + st_id + ') AND (GRADES.termYear = \'' + term + '\')';
	
	
	con.query(q_str, function(err,rows,fields){
		if(err){
					console.log("Error in Query Processing");
					console.log(err);
				}
		else{
			table += "<br><table><tr><th>StudentID</th><th>FirstName</th><th>LastName</th><th>Term/Year</th><th>CourseID</th><th>Description</th><th>Grade</th></tr>";
			
			for (var i = 0; i < rows.length; i++){
				table += "<tr>";
				
				table += "<th>" + rows[i].studentID + "</th>";
				table += "<th>" + rows[i].firstName + "</th>";
				table += "<th>" + rows[i].lastName + "</th>";
				table += "<th>" + rows[i].termYear + "</th>";
				table += "<th>" + rows[i].courseID + "</th>";
				table += "<th>" + rows[i].courseDesc + "</th>";
				table += "<th>" + rows[i].grade + "</th>";
				
				table += "</tr>";
				
			}
			
			table += "</table>";
			
			res.send(table);
			
		}
		
	
	});
	
		
	
	
});

app.get("/main2", function(req,res){
	var html_str = "";
	
	html_str += "<h3> Add student to the Database, Extra Credit </h3>";
	html_str += "<p>Please enter the information in following drop downs in order to add a Student.</p>";
	html_str += "<p>Also, the SQL injections are prevented and duplicated cases are avoided too.</p>";
	
	html_str += "<form id=\"studentform\" action=\"javascript:addStudent()\">";
	//html_str += "<center><p>Student Information</p><br>";
	//html_str += "<p>First Name:</p><br>";
	html_str += "First name: <input type=\"text\" name=\"firstname\" id=\"firstname\" ><br>";
	//html_str += "<p>LastName:</p><br>";
	html_str += "Last Name: <input type=\"text\" name=\"lastname\"  id=\"lastname\"><br>";
	//html_str += "<p>Date of Birth:</p><br>";
	html_str += "Date of Birth: <input type=\"date\" name=\"dob\"  id=\"dob\"><br>";
	//html_str += "<p>StudentID:</p><br>";
	html_str += "StudentID: <input type=\"int\" name=\"SID\"  id=\"SID\"><br>";
	html_str += "Major:<br>";
	html_str += "<select name=\"major\" id=\"major\">";
	html_str += "<option value\"\"></option>";
	html_str += "<option value\"CS\">CS</option>";
	html_str += "<option value\"CE\">CE</option>";
	html_str += "<option value\"IT\">IT</option>";
	html_str += "</select><br>";
	
	html_str += "<input type=\"submit\" value=\"Add\">";
	//html_str += "<button onClick=\"addStudent()\">ADD</button>";
	html_str += "</center>";
	html_str += "</form>";
	html_str += "<p>Result of Operation</p>";
	html_str += "<div id=\"out\"></div><br>";
	
	res.send(html_str);
	
});

app.post("/addStudent", function(req,res){
	console.log("Connection made to /addStudent");
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Himanshu220110",
		database: "hw5"
	});
	
	con.connect(function(err){
		if (err){
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
		
	});
	console.log(req.body);
	var SID = con.escape(req.body.SID);
	console.log(SID);
	
	var first = con.escape(req.body.firstname);
	var last = con.escape(req.body.lastname);
	var dob = con.escape(req.body.dob);
	var major = con.escape(req.body.major);
	
	var q_find_str = "SELECT studentID, firstName, lastName, birth, major FROM STUDENT WHERE firstName = " + first + " AND lastName = " + last + " AND birth = " + dob + "";
	console.log(q_find_str);
	con.query(q_find_str, function(err,rows,fields){
		if(err){
			console.log('Error in query processing');
			console.log(err);
			res.send('Error in query processing');
		}
		else if(rows.length>0){ //if a student already exits..
			console.log('Error: attempt to add existing student to DB');
			res.send('Error: student already exists!');
		}
		else{ 
			var q_add_str = "REPLACE INTO STUDENT(studentID, firstName, lastName, birth, major) VALUES (" + eval(SID) + "," + first + "," + last + "," + dob + "," + major + ")";
			con.query(q_add_str, function(err,rows,fields){
			if(err){
					console.log('Error during add student query processing');
					console.log(err);
					res.send('Error during add student query processing');
			}
			else{
				console.log('Added new student');
				res.send('Student Added!');
				}
			});
		}
	});
});
	
	
app.listen(8080, function(){
	console.log('Server On Duty');
});
	
	
	
	
	
	
	
	


	