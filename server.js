var http = require("http");
var std = require("./student");
var setting = require("./setting");
var httpMsgs=require("./httpMsgs");
var qs = require("queryString");
var fs = require('fs');
var csv = require('fast-csv');


http.createServer(function (req,resp){
switch(req.method){
	case "GET":
	if(req.url==="/home")
	{
		httpMsgs.showHome(req,resp);
	}
    else if(req.url ==="/signUp")
	{
		httpMsgs.regPage(req,resp);
    }
					 
	else if(req.url==="/students")
	    {
		httpMsgs.sendForm(req,resp);
		}
		else if(req.url==="/atsheet"){
			std.choose(req,resp,info);
		}
		else if(req.url==="/at"){
			httpMsgs.showDone(req,resp);
		}
		else if(req.url==="/already"){
			httpMsgs.csvfile(req,resp);
			
			
		}
		
	
	break;
	case "POST":
		if(req.url==="/home"){
		var reqBody ='';
		req.on("data",function(data)
		{
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		
		req.on("end",function()
		{
			
			var logData = qs.parse(reqBody);
			info =logData.userid+logData.psw;
		    std.choose(req,resp,logData);
		
	});
	}
	
	
	else if (req.url==="/signUp"){
		var reqBody ='';
		req.on("data",function(data)
		{
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		
		req.on("end",function()
		{
			
			var formdata = qs.parse(reqBody);
			
			info=formdata.UsrName+formdata.pswd;
			std.makeSheet(req,resp,formdata);
			
		
	});
	}
	else if (req.url ==="/already")
	{
		var reqBody ='';
		req.on("data",function(data)
		{
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		
		req.on("end",function()
		{
			
			var formdata = qs.parse(reqBody);
			var a= formdata.csvName;
			
			
			fs.createReadStream(a).pipe(csv()).on('data',function(data)
			{
				
        std.upload(req,resp,data,info);
		httpMsgs.showDone(req,resp);
				
	        });
			
			
	});
	}
	
	
	
	
	
	
	
	
	
	
	
	
	else if(req.url==="/students")
	{
	
		var reqBody ='';
		req.on("data",function(data)
		{
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		
		
		req.on("end",function()
		{
			
			var formdata = qs.parse(reqBody);
			
			if(formdata.limitno){
				store = formdata.limitno;
				
			httpMsgs.details(req,resp,formdata);
			
			}
			else if (formdata.stdName)
			{
				
				std.add(req,resp,formdata,store,info);
				
				if (formdata.file)
			    {
					
					var n=formdata.subcls;
				    n=n+'.csv';
					var ws=fs.createWriteStream(n);
				
					csv.write([
				[formdata.subcls,""]],
				{header :true}).pipe(ws);
					
					for(var i=0;i<store; i++){
				csv.write([
				[formdata.stdName[i],formdata.rollno[i],""]],
				{header :true}).pipe(ws);
				
				}
				}
				
				
				httpMsgs.showDone(req,resp);
			}
			
			
			
		});
		
	}
	else if(req.url==="/atsheet"){
		
			
			
			var reqBody ='';
		req.on("data",function(data)
		{
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		
		req.on("end",function()
		{
			
			var sheetData = qs.parse(reqBody);
			console.log(sheetData.branch);
			std.getSheet(req,resp,sheetData,info);
			
		});
	
	}
	else if(req.url==="/at"){
		var reqBody ='';
		
		req.on("data",function(data){
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		req.on("end",function(){
			var sheetData = qs.parse(reqBody);
			if(sheetData.rst){
				std.resetSheet(req,resp,sheetData,info);
			console.log(sheetData);
			}
			else 
			{
			std.update(req,resp,sheetData,info);
	
	        httpMsgs.showList(req,resp,sheetData);
			}
		});
	}
	else {
		httpMsgs.show404(req,resp);
	}
	
	break;
	case "DELETE":
	if(req.url==="/employees"){
		var reqBody ='';
		req.on("data",function(data){
			reqBody += data;
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		req.on("end",function(){
			emp.deletes(req,resp,reqBody);
		});
	}
	else {
		httpMsgs.show404(req,resp);
	}
	
	break;
	
	
	
	case "PUT":
	
	if(req.url==="/atsheet"){
		var reqBody ='';
		
		req.on("data",function(data){
			reqBody += data;
			
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		req.on("end",function(){
			var sheetData = qs.parse(reqBody);
			
			std.update(req,resp,sheetData);
		});
	}
	else {
		httpMsgs.show404(req,resp);
	}
	
	break;
	case "DELETE":
	if(req.url==="/employees"){
		var reqBody ='';
		req.on("data",function(data){
			reqBody += data;
			if(reqBody.length>1e7)
			{
				httpMsgs.show413(req,resp);
			}
			
		});
		req.on("end",function(){
			emp.deletes(req,resp,reqBody);
		});
	}
	else {
		httpMsgs.show404(req,resp);
	}
	
	break;
	default:
	httpMsgs.show405(req,resp);
	break;
}	
	
}).listen(9000,function(){
	console.log("started listning at :9000");
});