var db = require("./db");
var httpMsgs= require("./httpMsgs");
var util = require("util");
var qs = require("queryString");

exports.upload = function (req,resp,updata,tName)
{
	try
	{
		if(!updata) throw new Error("Input not valid");
		if(updata)
		{
			
		for(var i=1;i<updata.length-1;i++)
		{
			console.log(updata);
		var sql = "INSERT into "+tName+" (studentName,rollno,subjectClass) VALUES";
			sql += util.format("('%s',%d,'%s')",updata[i],updata[i+1],updata[0]);	
        i++;

		db.executeSql(sql,function(updata,err){
		if(err){
			httpMsgs.show500(req,resp,err);
		}
		
			
			});
		}}
		
	    else{
			throw new Error("Input not valid");
		}
		
	}
	catch(ex){
		httpMsgs.show500(req,resp,ex);
	}
	};







exports.makeSheet = function (req,resp,data){
	db.executeSql("create table "+data.UsrName+data.pswd+"(studentName varchar(25) ,subjectClass varchar(25),rollno int,present int,absent int,notify int)",function(data,err){
		if(err)
		{
			httpMsgs.show500(req,resp,err);
		}
		else
		{
			console.log(data);
			httpMsgs.sendForm(req,resp,data);
		}
	});
}




exports.createSheet = function (req,resp,data){
	console.log(data.userid+data.psw);
	db.executeSql("select * from "+data.userid+data.psw,function(data,err){
		if(err)
		{
			httpMsgs.show500(req,resp,err);
		}
		else
		{
			httpMsgs.sendForm(req,resp,data);
		}
	});
};


exports.getForm = function(req,resp){
	db.executeSql("Select * from sheet",function(data,err)
	{
		if(err)
		{
			httpMsgs.show500(req,resp,err);
		}
		else
		{
			httpMsgs.sendHtml(req,resp,data);
		}
		
	});
	
};

exports.getList = function (req,resp,lData)
{
	var sql ="select studentName ,rollno,present,absent,notify from sheet";
	sql += " where subjectClass = '" +lData.copy+"'";
	db.executeSql( sql ,function(ldata,err){
		if(err){
			httpMsgs.show500(req,resp,err);
		}
		else{
			httpMsgs.showList(req,resp,lData);
			}
		
	});
	
	
};

exports.resetSheet = function (req,resp,rData,tName)
{
	try
	{
		if(!rData) throw new Error("Input not valid");
		if(rData)
		{
		for(var i=0;i<rData.rst.length;i++){
		var sql ="update "+tName+" set notify = "+rData.rst[i];
		sql +="where rollno = "+rData.rollrst[i]; 	
        

		db.executeSql(sql,function(rData,err){
		if(err)
		{
			httpMsgs.show500(req,resp,err);
		}
		/*else
		{
			httpMsgs.show200(req,resp,rData);
	    }*/
		});
	
	}	
		
		
	}
	}
	
	catch(ex)
	{
		httpMsgs.show500(req,resp,ex);
	}

};

exports.getSheet= function(req,resp,data,tName){
	var sql = "select studentName,subjectClass,rollno,present,absent,notify from "+tName;
			
		sql += " where subjectClass = '" +data.branch+"'";
		db.executeSql( sql ,function(data,err){
		if(err){
			httpMsgs.show500(req,resp,err);
		}
		else{
			httpMsgs.showSheet(req,resp,data);
		}
		
	});
	
	
};
exports.choose=function(req,resp,data){
	var sql = "select distinct subjectClass from "+info;
	db.executeSql(sql,function (data,err){
		if(err)
		{
			httpMsgs.show500(req,resp,err);
		}
		else
		{
			httpMsgs.attsheet(req,resp,data);
		}
		
	});
	
		
};








exports.add = function(req,resp,reqBody,retrive,tName){
	try{
		if(!reqBody) throw new Error("Input not valid");
		
		if(reqBody){
			console.log(tName);
			for (var i =0;i<retrive;i++){
			var sql = "INSERT into "+tName+"(studentName,rollno,subjectClass) VALUES";
			sql +=util.format("('%s',%d,'%s')",reqBody.stdName[i],reqBody.rollno[i],reqBody.subcls);
			db.executeSql(sql,function(reqBody,err){
		if(err){
			httpMsgs.show500(req,resp,err);
		}
		/*else{
			httpMsgs.showDone(req,resp);
			}*/
			
			});
		}
		}
	    else{
			throw new Error("Input not valid");
		}
		
	}
	catch(ex){
		httpMsgs.show500(req,resp,ex);
	}
	};

exports.update = function(req,resp,reqBody,tName)
{
	try
	{
		
		if(!reqBody) throw new Error("Input not valid");
		
		if(reqBody)
		{
			
		for(var i =0;i<reqBody.stdNo;i++)
		{
			var sql = "UPDATE "+tName+" SET ";
			if(reqBody.aten[i]>0 )
		{
				sql += "present = " + reqBody.aten[i];
		}
		else
		{
			reqBody.counter[i]++;
			sql += "absent = " +reqBody.aten[i];
			sql +=","+"notify = "+reqBody.counter[i];
		} 
		
			sql += "WHERE rollno = " +reqBody.roll[i];
			
			db.executeSql(sql,function(reqBody,err)
			{
		if(err)
		{
			httpMsgs.show500(req,resp,err);
		}
		/*else
		{
			
			httpMsgs.show200(req,resp,reqBody);
	    }*/
			
	        });
	
			}
			
		
		
		}
	}
	catch(ex)
	{
		httpMsgs.show500(req,resp,ex);
	}
	
	
	
};

exports.deletes = function(req,resp,reqBody){
	
	try{
		if(!reqBody) throw new Error("Input not valid");
		var data = JSON.parse(reqBody);
		if(data){
			if(!data.empno) throw new Error("empno not provided");
			var sql = "DELETE FROM emp ";
			sql += " WHERE empno = " + data.empno;
		   db.executeSql(sql,function(data,err){
		if(err){
			httpMsgs.show500(req,resp,err);
		}
		else{
			httpMsgs.show200(req,resp);
		}
		
	});
			
		}
		else{
			throw new Error("Input not valid");
			
		}
		
	}
	catch(ex){
		httpMsgs.show500(req,resp,ex);
	}
	
	
};

