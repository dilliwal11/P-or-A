var setting = require("./setting");
var StringBuilder = require("stringbuilder");
var fs = require("fs");
var csv = require('fast-csv');
exports.showHome = function (req,resp)
{
		var sb = new StringBuilder({newline:"\r\n"});
		resp.writeHead(200,{"Content-Type":"text/html"});
	    sb.appendLine("<html>");
	    sb.appendLine("<body>");
		sb.appendLine("<form action = '/home' method ='post'>");
		sb.appendLine("User name:<br>");
		sb.appendLine("<input type='text' name='userid' value=''>");
		sb.appendLine("<br>");
		sb.appendLine("User password:<br>");
		sb.appendLine("<input type='password' name='psw' value=''><br>");
		sb.appendLine("<input type = 'submit' value ='login' method ='post'><br>");
		sb.appendLine("<a href ='/signUp'>click here to register</a>");
		sb.appendLine("</form>");
		sb.appendLine("</body>");
		sb.appendLine("</html>");

	sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
	});
	};
	
	exports.csvfile = function(req,resp)
	{
		resp.writeHead(200,{"Content-Type":"text/html"});
    var sb = new StringBuilder({newline:"\r\n"});
    sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("<form action ='/already' method='post'>");
	sb.appendLine("file name :<input type ='file' name = 'csvName' value =''>");
	sb.appendLine("<input type = 'submit' value ='create' method ='post'><br>");
	sb.appendLine("</form>");
		sb.appendLine("</body>");
		sb.appendLine("</html>");
		
		sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
	});
	};
	
	
	
	
	

exports.regPage= function(req,resp){
	resp.writeHead(200,{"Content-Type":"text/html"});
    var sb = new StringBuilder({newline:"\r\n"});
    sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("<form action ='/signUp' method='post'>");
	sb.appendLine("<table>");
	sb.appendLine("<h3><center>New User ! ! throw your pen and paper</center></h3>");
	sb.appendLine("<tr><td>Name:<input type ='text' name ='facName' value=''></td></tr>");
	sb.appendLine("<tr><td>UserName:<input type ='text' name ='UsrName' value=''></td></tr>");
	sb.appendLine("<tr><td>Password:<input type ='password' name ='pswd' value=''></td></tr>");
	sb.appendLine("<tr><td><input type ='submit' value='register' method ='post'></td></tr>");
    sb.appendLine("</table>");
	sb.appendLine("</form>");
	sb.appendLine("</body>");
	sb.appendLine("</html>");
	sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
		
	});
	
	}









exports.showDone = function(req,resp)
{
	resp.writeHead(200,{"Content-Type":"text/html"});
var sb = new StringBuilder({newline:"\r\n"});
    sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("hurry ! ! you successfully registered now <a href = '/atsheet'>click here</a> to take attendance ");
	sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
		
	});

	};

exports.showList=function(req,resp,lData)
{
resp.writeHead(200,{"Content-Type":"text/html"});
var sb = new StringBuilder({newline:"\r\n"});
    sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("<form action ='/at' method ='post'>");
	console.log(lData);
sb.appendLine("<table>");
sb.appendLine("<tr><td><b>Student Name</b></td><td><b>enroll number</td><td><b>today attendance</b></td><td><b>application given ?</b></td></tr>");
for(var i=0;i<lData.stdNo;i++){
	if (lData.counter[i]>=3)
	{
		
	if(lData.counter[i]==3 ||lData.counter[i]==4)
	    sb.appendLine("<tr><td><font color ='green'>{0}</td>",lData.sName[i]);
     else if (lData.counter[i]==5 || lData.counter[i]==6)
	    sb.appendLine("<tr><td><font color ='voilet'>{0}</td>",lData.sName[i]);
else if (lData.counter[i]>=7)
	    sb.appendLine("<tr><td><font color ='red'><u>{0}</td>",lData.sName[i]);
else 
	    sb.appendLine("<tr><td>{0}</td>",lData.sName[i]);
        sb.appendLine("<td><input type ='text' name ='rollrst'  value = {0} readonly></td>",lData.roll[i]);
	if(lData.aten[i]>0)
		sb.appendLine("<td><font color ='blue'><b>P</td>");
	else
		sb.appendLine("<td><font color ='red'><b>A</td>");
	
        sb.appendLine("<td><input type ='checkbox' name ='rst' value = 0>Yes</td>");
        sb.appendLine("<td><input type ='checkbox' name ='rst' value = {0}>No</td>",lData.counter[i]);

	}


}

    sb.appendLine("</tr>");	
    sb.appendLine("<tr><td><input type ='submit' value='submit' method ='post'></td></tr>");
	sb.appendLine("<td><a href ='/atsheet'><input type ='button' value = 'next'/></a> </td>");
    sb.appendLine("</table>");
    sb.appendLine("</form>");
	sb.appendLine("</html>");
	sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
	});
};





exports.showSheet = function (req,resp,att){
	resp.writeHead(200,{"Content-Type":"text/html"});
	var sb = new StringBuilder({newline:"\r\n"});
	sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("<Form action = '/at' method = 'post'>");
	sb.appendLine("<h3><center>Take attendance</h3></center>");
	sb.appendLine("<hr>");
	sb.appendLine("<table>");
	sb.appendLine("<tr><td><b>student Name</td><td><b>Enrollment Number</td><td><b>Present</td><td><b>Absent</td>");
	sb.appendLine("<td><b>consecative absence</td></tr>");

	for(var i=0;i<att.length;i++)
	{
	sb.appendLine("<tr><td><input type ='text' name ='sName' value = {0} readonly ><vr></td>",att[i].studentName);
	sb.appendLine("<td><input type ='text' name ='roll' value = {0} readonly> </td>",att[i].rollno);
	sb.appendLine("<td><input type ='checkbox'  name = 'aten' value={0}> P</td>",att[i].present+1);
	sb.appendLine("<td><input type ='checkbox'  name = 'aten' value={0}> A </td>",att[i].absent-1);
	sb.appendLine("<td><input type ='text' name ='counter' value = {0} readonly></td>",att[i].notify+0);
	}	
	sb.appendLine("</tr>");	
    sb.appendLine("<tr><td><input type ='submit' value='submit' method ='post'></td></tr>");
	sb.appendLine("<tr><td>class&subject:<input type ='text' name ='copy' value = {0} readonly > </td>",att[0].subjectClass);
	sb.appendLine("<td>strength:<input type ='text' name ='stdNo' value = {0} readonly ></td></tr>",att.length);
    sb.appendLine("</table>");
    sb.appendLine("</form>");
	sb.appendLine("</body>");
	sb.appendLine("</html>");
	
	sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
	});
};


exports.attsheet = function(req,resp,attdata)
{
	resp.writeHead(200,{"Content-Type":"text/html"});
	var sb = new StringBuilder({newline:"\r\n"});
	sb.appendLine("<html>");
	sb.appendLine("<body>");
	sb.appendLine("<h3>choose the class and subject from menu</h3><br>");
	sb.appendLine("<Form action = '/atsheet' method ='post'>");
	sb.appendLine("<select name ='branch'><br>");
	for (var i =0;i<attdata.length;i++)
	{
		sb.appendLine("<option value ='{0}'>{0}</option>",attdata[i].subjectClass); 
	}
	sb.appendLine("</select>");
	sb.appendLine("<input type = 'submit' value ='go' method ='post'><br>");
	sb.appendLine("<a href='/students'>click here to add new records</a>");
	sb.appendLine("</form>");
	sb.appendLine("</body>");
	sb.appendLine("</html>");
	    sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
	});
};
exports.show500 = function(req,resp,err){
	if(setting.httpMsgsFormat==="HTML"){
		resp.writeHead(500,"Internal error occured",{"Content-Type": "text/html"});
		resp.write("<html><head><title>error 500</title></head><body>500 error details"+err+"</body></html>");
	}
	else{
		resp.writeHead(500,"Internal error occured",{"Content-Type":"application/json"});
	resp.write(JSON.stringify({data:"error occuered"+err }));
	}
	resp.end();
};



exports.already = function(req,resp){
	var sb = new StringBuilder({newline:"\r\n"});
	
	
	resp.writeHead(200,{"Content-Type":"text/html"});
	    sb.appendLine("<html>");
	    sb.appendLine("<body>");
		sb.appendLine("<Form action = '/students' method ='post'>");
		sb.appendLine("<table>");
		sb.appendLine("<tr><td>class name and subject name</td></tr>");
		sb.appendLine("<tr><input type ='text' name ='subcls' value ''/></tr></td>");
		sb.appendLine("<tr><td>student names</td> <td>enrollno.</td></tr>");
		
			
			
			
		
		
		sb.appendLine("<tr>file name :<input type ='checkbox' name ='file' value ='yes'/>yes</tr></td>");
		sb.appendLine("<tr><td><input type = 'submit' value ='save' method ='post'></td></tr>"); 
		
		sb.appendLine("</table>");
		sb.appendLine("</form>");
		
		sb.appendLine("</body>");
		sb.appendLine("</html>");
		
		sb.build(function (err,result)
	       {
		resp.write(result);
		resp.end();
		   });
	
};

exports.details = function (req,resp,reqBody){
	var sb = new StringBuilder({newline:"\r\n"});
	
	
	resp.writeHead(200,{"Content-Type":"text/html"});
	    sb.appendLine("<html>");
	    sb.appendLine("<body>");
		sb.appendLine("<Form action = '/students' method ='post'>");
		sb.appendLine("<table>");
		sb.appendLine("<tr><td>class name and subject name</td></tr>");
		sb.appendLine("<tr><input type ='text' name ='subcls' value ''/></tr></td>");
		sb.appendLine("<tr><td>student names</td> <td>enrollno.</td></tr>");
		for(var i=0;i<reqBody.limitno;i++)
		{
			
			
			
		sb.appendLine("<tr><td><input type ='text'  name='stdName' value=''/></td>");
		sb.appendLine("<td><input type ='text'  name='rollno' value=''/><td></tr>");
		}
		sb.appendLine("<tr>file name :<input type ='checkbox' name ='file' value ='yes'/>yes</tr></td>");
		sb.appendLine("<tr><td><input type = 'submit' value ='save' method ='post'></td></tr>"); 
		sb.appendLine("<tr><td><a href ='/already'>click here for csv</a></td></tr>");
		sb.appendLine("</table>");
		sb.appendLine("</form>");
		
		sb.appendLine("</body>");
		sb.appendLine("</html>");
		
		sb.build(function (err,result)
	       {
		resp.write(result);
		resp.end();
		   });
};

exports.sendForm = function (req,resp,data){
	//console.log(data);
	var sb = new StringBuilder({newline:"\r\n"});
	resp.writeHead(200,{"Content-Type":"text/html"});
	    sb.appendLine("<html>");
	    sb.appendLine("<body>");
		sb.appendLine("<form action ='/students' method ='post'>");
		sb.appendLine("number of students: <br>");
		sb.appendLine("<input type ='text'  name='limitno' value=''> <br>");
		sb.appendLine("<input type = 'submit' value ='submit' method ='post'>"); 
		sb.appendLine("<br><a href ='/already'>click here for csv</a><br>");
		sb.appendLine("<a href = '/atsheet'>click here </a>to go to take attendance ");
		sb.appendLine("</table>");
		sb.appendLine("</form>");
		sb.appendLine("</body>");
		sb.appendLine("</html>");
	sb.build(function (err,result)
	{
		resp.write(result);
		resp.end();
		
	});
	};


exports.show405 = function(req,resp){
	if(setting.httpMsgsFormat==="HTML"){
		resp.writeHead(405,"Method not support",{"Content-Type": "text/html"});
		resp.write("<html><head><title>error 405</title></head><body>405 error details</body></html>");
	}
	else{
		resp.writeHead(405,"Method not support",{"Content-Type":"application/json"});
	resp.write(JSON.stringify({data:"Method not support"}));
	}
	resp.end();
};


exports.show404 = function(req,resp){
	if(setting.httpMsgsFormat==="HTML"){
		resp.writeHead(404,"Resource not found",{"Content-Type": "text/html"});
		resp.write("<html><head><title>error 404</title></head><body>404 error details</body></html>");
	}
	else{
		resp.writeHead(404,"Resource not found",{"Content-Type":"application/json"});
	resp.write(JSON.stringify({data:"Resource not found" }));
	}
	resp.end();
};

exports.show413 = function(req,resp){
	if(setting.httpMsgsFormat==="HTML"){
		resp.writeHead(413,"Request entity too large",{"Content-Type": "text/html"});
		resp.write("<html><head><title>error 404</title></head><body>413 error details</body></html>");
	}
	else{
		resp.writeHead(413,"Request entity too large",{"Content-Type":"application/json"});
	resp.write(JSON.stringify({data:"Request entity too large" }));
	}
	resp.end();
};

exports.show200 = function(req,resp){
	resp.writeHead(200,{"Content-Type":"application/json"});
	};





