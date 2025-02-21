//const avsmisModel = require("../model/avsmis.model");
const ldap = require('ldapjs'); 
var AdminDN = 'CN=ithesis,CN=Users,DC=msu,DC=ac,DC=th';
var AdminPWD = 'ithesis@msu59';

class _authClass { 

signin = (username,password) => { // signin MSU Authentication 
	return new Promise(function(resolve,reject){
		var client = ldap.createClient({
			url: 'ldap://10.1.99.9:389',
			tlsOptions: tlsOptions
		});	
		var tlsOptions = {
			host: '10.1.99.9',
			port: '389'
		};
		try{
			client.bind(AdminDN, AdminPWD, (err) => { //admin binding
				if(err){
					console.log("admin binding error : "+err.message);
					unbind(client);
					return reject({"status":"error","message":err});
				}
				//console.log("admin binding success !!");
				let entries = [];
				let base = 'dc=msu,dc=ac,dc=th';
				let searchOption = {
					filter: '(&(objectClass=user)(sAMAccountName='+username+'))',
					scope: 'sub',
					attributes: ['dn', 'sn', 'cn', 'samAccountName','mail','description','uid','givenName']
				};
					client.search(base,searchOption,(err1,res) =>{
					if(err1){
						console.log("search error : "+err1.message);
						unbind(client);
						return reject({"status":"error","message":err1})
					}
						res.on('searchRequest', (searchRequest) => {
							//console.log('searchRequest: ', searchRequest.messageID);
						});
						res.on('searchEntry', (entry) => {
							//console.log('entry: ' + JSON.stringify(entry.object));
							entries.push(entry.object);
						});
						res.on('searchReference', (referral) => {
							//console.log('referral: ' + referral.uris.join());
						});
						res.on('error', (err1) => {
							//console.error('error: ' + err.message);
						});
						res.on('end', (result) => {
							//console.log('status: ' + result.status);
							if(entries.length!=1){
								//return reject("not found user!");
								//console.log("username: "+username);
								unbind(client);
								return reject({"status":"error","message":"invalid username or password"});
							}
							let dn = entries[0].dn;
							//console.log(dn);
							//test bind by dn
							client.bind(dn, password, (err2) => {
								if(err2){
									unbind(client);
									return reject({"status":"error","message":"invalid username or password"});
								}
								//console.log("success authorize user");
								let usertype = '';
								if(dn.search("OU=0_STUDENT")>0) usertype = 'student';
								else if(dn.search("OU=0_Students")>0) usertype = 'student';
								else if(dn.search("OU=1_Staffs")>0) usertype = 'staff';
								else if(dn.search("OU=2_Guest")>0) usertype = 'guest';
								else if(dn.search("OU=3_SATIT")>0) usertype = 'satit';
								else if(dn.search("OU=4_Disable")>0) usertype = 'disable';
								else if(dn.search("OU=5_Graduate")>0) usertype = 'student';
								unbind(client);
								return resolve({
									username: entries[0].sAMAccountName,
									fullname: entries[0].cn,
									usertype: usertype,
									//description:entries[0].description,
									//citizenid: entries[0].uid,
									mail: entries[0].mail,
									dn: entries[0].dn,
								});
							});

						}); 
					});

				
			});
		}catch(e){
			console.log("catch error : "+e);
			return reject(e);
		}
	})//return promise
}


ad_userinfo = (username) => { // get AD User info 
	console.log("model:ad_userinfo()");
	return new Promise(function(resolve,reject){
		var client = ldap.createClient({
			url: 'ldap://10.1.99.9:389',
			tlsOptions: tlsOptions
		});	
		var tlsOptions = {
			host: '10.1.99.9',
			port: '389'
		};
		try{
			client.bind(AdminDN, AdminPWD, (err) => { //admin binding
				if(err){
					console.log("admin binding error : "+err.message);
					unbind(client);
					return reject(err);
				}
				//console.log("admin binding success !!");
				let entries = [];
				let base = 'dc=msu,dc=ac,dc=th';
				let searchOption = {
					filter: '(&(objectClass=user)(sAMAccountName='+username+'))',
					scope: 'sub',
					attributes: ['dn', 'sn', 'cn', 'samAccountName','mail','description','uid','givenName']
				};
					client.search(base,searchOption,(err1,res) =>{
					if(err1){
						console.log("search error : "+err1.message);
						unbind(client);
						return reject(err1)
					}
						res.on('searchRequest', (searchRequest) => {
							//console.log('searchRequest: ', searchRequest.messageID);
						});
						res.on('searchEntry', (entry) => {
							//console.log('entry: ' + JSON.stringify(entry.object));
							entries.push(entry.object);
						});
						res.on('searchReference', (referral) => {
							//console.log('referral: ' + referral.uris.join());
						});
						res.on('error', (err1) => {
							//console.error('error: ' + err.message);
						});
						res.on('end', (result) => {
							//console.log('status: ' + result.status);
							if(entries.length!=1){
								//return reject("not found user!");
								unbind(client);
								return reject("invalid username or password");
							}
								let dn = entries[0].dn;
								
								let usertype = '';
								let faculty='';
								
								if(dn.search("OU=0_STUDENT")>0){
									usertype = 'student';
									let dn1 = dn.substring(0,dn.search(",OU=0_STUDENT"))
									faculty = dn1.substring(dn1.lastIndexOf("OU=")+3)
								}
								else if(dn.search("OU=0_Students")>0){
									usertype = 'student';
									let dn1 = dn.substring(0,dn.search(",OU=0_Students"))
									faculty = dn1.substring(dn1.lastIndexOf("OU=")+3)
								}
								else if(dn.search("OU=1_Staffs")>0) {
									usertype = 'staff';
									faculty = dn.substring(dn.search("OU=")+3,dn.search(",OU=1_Staffs"))
								}
								else if(dn.search("OU=2_Guest")>0) usertype = 'guest';
								else if(dn.search("OU=3_SATIT")>0) usertype = 'satit';
								else if(dn.search("OU=4_Disable")>0) usertype = 'disable';
								else if(dn.search("OU=5_Graduate")>0) usertype = 'student';
								unbind(client);

									return resolve({
										username: entries[0].sAMAccountName,
										//fullname: entries[0].cn,
										fullname:entries[0].givenName.trim()+' '+entries[0].sn.trim(),
										usertype: usertype,
										faculty: faculty,
										description:entries[0].description,
										citizenid: entries[0].uid,
										mail: entries[0].mail,
										//dn: entries[0].dn,									
									});								
								
							

						}); 
					});

				
			});
		}catch(e){
			console.log("catch error : "+e);
			return reject(e);
		}
	})//return promise
}



xx_entryFilter = (req,res) =>{
	return new Promise(function(resolve,reject){
		if(!req.body.ou) return reject("invalid parameter");
		

		var entries = []; // entry ที่กรองมาได้
		var client = ldap.createClient({
			url: 'ldap://10.1.99.9:389',
			tlsOptions: tlsOptions
		});	
		var tlsOptions = {
			host: '10.1.99.9',
			port: '389'
		};
		try{
		client.bind(adminUser, adminPass, (err) => {
			if (err) {
				console.log('Error occurred while binding');
				console.log(err);
				return reject('Error occurred while binding AD');
			} else {
				console.log('admin bind success');
				//var base = 'OU=สำนักคอมพิวเตอร์,OU=1_Staffs,DC=msu,DC=ac,DC=th';
				var base= req.body.ou+',DC=msu,DC=ac,DC=th';
				var search_options = {
					filter: '(objectClass=person)',
					scope: 'sub',
					attributes: ['dn', 'sn', 'cn', 'givenName', 'description', 'uid']
				};
				client.search(base, search_options, function (err, res) 
				{
					if (err) {
						console.log('Error occurred while ldap search ',err);
						return reject(err);
					} else {
						console.log("search success");
						res.on('searchEntry', function (entry) {
							console.log( JSON.stringify(entry.object));
							entries.push(entry.object);
						});
						res.on('searchReference', function (referral) {
							//console.log('Referral', referral);
						});
						res.on('error', function (err) {
							console.log('Error is', err.message);
							unbind(client);
							return reject(err)
						});
						res.on('end', function (result) {
							//console.log('Result is', result);
							unbind(client);
							return resolve(entries);
						});
					}
				});		
			}
		});	
		}catch(e){
			console.log(e);
		}
		

	}); //promise

}


entryFilter = (req,res) => {
    return new Promise(async function (resolve, reject) {
        try {
            //var response = {};
			//var entries={};
            setTimeout(function () {
                resolve('Not able to get Ldap details');
				}, 5000);
			var entries = []; // entry ที่กรองมาได้
			var client = ldap.createClient({
				url: 'ldap://10.1.99.9:389',
				tlsOptions: tlsOptions
			});	
			var tlsOptions = {
				host: '10.1.99.9',
				port: '389'
			};
            client.bind(adminUser, adminPass, (err, res) => {
                //console.log("In Ldap Bind and connection is establised :" + client.connected);
                if (err) {
                    //console.log(err);
                    return reject(err);
                }
            });
			var base= req.body.ou+',DC=msu,DC=ac,DC=th';			
            var search_options = {
					filter: '(objectClass=person)',
					scope: 'one',
					attributes: ['dn', 'sn', 'cn', 'givenName', 'description', 'uid']
            };
            client.search(base, search_options, function (err, res) {
                if (err) {
                    //console.log(err);
                    resolve(response);
                }
                res.on("searchEntry", function (entry, end) {
                    //response.mail = entry.object.mail;
                    //response.lastName = entry.object.sn;
                    //response.firstNme = entry.object.givenName;
                    //response.phone = entry.object.telephoneNumber;    
					//resolve(response);
					//console.log( JSON.stringify(entry.object));
					entries.push(entry.object);
					//resolve(entries);
                });
				res.on('searchReference', function (referral) {
					//console.log('Referral', referral);
				});
				res.on('error', function (err) {
					//console.log('Error is', err.message);
					//unbind(client);
					return reject(err)
				});				
				res.on('end', function (result) {
					//console.log('Result is', result);
					//unbind(client);
					resolve(entries);
				});
            });
        } catch (err) {
            console.log(err);
            return reject(err);
        } finally {
            client.unbind(function (err) {
                if (err) {
                    //console.log(err);
                    return reject(err);
                }else{
					console.log("Unbind success !!");
				}
            });
        }
    })
	//.catch((err) => {
    //    console.log(err.message);  //<---in case size limit exceeded 
    //    return (err);
    //});
}


entryFilterOrgUnit = (req,res) => {
    return new Promise(async function (resolve, reject) {
        try {
            //var response = {};
			//var entries={};
            setTimeout(function () {
                resolve('Not able to get Ldap details');
				}, 5000);
			var entries = []; // entry ที่กรองมาได้
			var client = ldap.createClient({
				url: 'ldap://10.1.99.9:389',
				tlsOptions: tlsOptions
			});	
			var tlsOptions = {
				host: '10.1.99.9',
				port: '389'
			};
            client.bind(adminUser, adminPass, (err, res) => {
                console.log("In Ldap Bind and connection is establised :" + client.connected);
                if (err) {
                    console.log(err);
                    return reject(err);
                }
            });
			var base= req.body.ou+',DC=msu,DC=ac,DC=th';			
            var search_options = {
					filter: '(objectClass=organizationalUnit)',
					scope: 'one',
					attributes: ['dn']
            };
            client.search(base, search_options, function (err, res) {
                if (err) {
                    console.log(err);
                    resolve(response);
                }
                res.on("searchEntry", function (entry, end) {
                    //response.mail = entry.object.mail;
                    //response.lastName = entry.object.sn;
                    //response.firstNme = entry.object.givenName;
                    //response.phone = entry.object.telephoneNumber;    
					//resolve(response);
					console.log( JSON.stringify(entry.object));
					let item=entry.object;
					
					
						
					
					
					
					item['subentries']=55;
					entries.push(item);
					//entries.push(entry.object,{sub:55});
					//resolve(entries);
                });
				res.on('searchReference', function (referral) {
					console.log('Referral', referral);
				});
				res.on('error', function (err) {
					console.log('Error is', err.message);
					//unbind(client);
					return reject(err)
				});				
				res.on('end', function (result) {
					//console.log('Result is', result);
					//unbind(client);
					resolve(entries);
				});
            });
        } catch (err) {
            console.log(err);
            return reject(err);
        } finally {
            client.unbind(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }else{
					console.log("Unbind success !!");
				}
            });
        }
    }).catch((err) => {
        console.log(err);
        return err;
    });
}


entryUpdate  = (req,res) =>{  // this function update UID or if entry not found UID this function add new UID 
	return new Promise(function(resolve,reject){
		if((!req.body.dn)||(!req.body.uid)) return reject("invalid parameter");

		var client = ldap.createClient({
			url: 'ldap://10.1.99.9:389',
			tlsOptions: tlsOptions
		});
		var tlsOptions = {
			host: '10.1.99.9',
			port: '389'
		};	
		client.bind(adminUser, adminPass, (err) => {
			if (err) {
				console.log('Error occurred while binding');
				return reject(err);
			} else {
				console.log('Admin bind success');	
				//----- modify replace
				var change = new ldap.Change({
						operation: 'replace',
						modification:{
							uid:req.body.uid
						}
				});
				client.modify(req.body.dn,change,(err) => {
					console.log("Now modifying ",req.body.dn);
					if(err){
						console.log("replace error");
						console.log(err.message);
						unbind(client);
						return reject(err);
					}else{
						console.log('replace success');
						unbind(client);
						return resolve({success:true});
					}
				});			

			}
		});
		
	});
}


entryDeleteUID  = (req,res) =>{  
	return new Promise(function(resolve,reject){
		if(!req.body.dn) return reject("invalid parameter");

		var client = ldap.createClient({
			url: 'ldap://10.1.99.9:389',
			tlsOptions: tlsOptions
		});
		var tlsOptions = {
			host: '10.1.99.9',
			port: '389'
		};
		client.bind(adminUser, adminPass, (err) => {
			if (err) {
				console.log('Error occurred while binding');
				return reject(err);
			} else {
				console.log('Admin bind success');
				//----- modify delete
				var change = new ldap.Change({
						operation: 'delete',
						modification:{
							uid: undefined 
						}
				});
				client.modify(req.body.dn,change,(err) => {
					console.log("Now modifying ",req.body.dn);
					if(err){
						console.log("delete error");
						console.log(err.message);
						unbind(client);
						return reject(err);
					}else{
						console.log('delete success');
						unbind(client);
						return resolve({success:true});
					}
				});			

			}
		});
		
	});
}




























entryCountFilter = (req,res) => {
    return new Promise(async function (resolve, reject) {
        try {
            //var response = {};
			
            setTimeout(function () {
                resolve('Not able to get Ldap details');
				}, 5000);
			var entries = []; // entry ที่กรองมาได้
			var counter=0;
			var client = ldap.createClient({
				url: 'ldap://10.1.99.9:389',
				tlsOptions: tlsOptions
			});	
			var tlsOptions = {
				host: '10.1.99.9',
				port: '389'
			};
            client.bind(adminUser, adminPass, (err, res) => {
                console.log("In Ldap Bind and connection is establised :" + client.connected);
                if (err) {
                    console.log(err);
                    return reject(err);
                }
            });
			var base= req.body.ou+',DC=msu,DC=ac,DC=th';			
            var search_options = {
					filter: '(objectClass=*)',
					scope: 'one',
					attributes: ['dn', 'sn', 'cn', 'givenName', 'description', 'uid']
            };
            client.search(base, search_options, function (err, res) {
                if (err) {
                    console.log(err);
                    resolve(response);
                }
                res.on("searchEntry", function (entry, end) {
                    //response.mail = entry.object.mail;
                    //response.lastName = entry.object.sn;
                    //response.firstNme = entry.object.givenName;
                    //response.phone = entry.object.telephoneNumber;    
					//resolve(response);
					//console.log( JSON.stringify(entry.object));
					//entries.push(entry.object);
					//resolve(entries);
					counter++;
                });
				res.on('searchReference', function (referral) {
					console.log('Referral', referral);
				});
				res.on('error', function (err) {
					console.log('Error is', err.message);
					//unbind(client);
					return reject(err)
				});				
				res.on('end', function (result) {
					//console.log('Result is', result);
					//unbind(client);
					//resolve(entries);
					resolve(counter);
				});
            });
        } catch (err) {
            console.log(err);
            return reject(err);
        } finally {
            client.unbind(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }else{
					console.log("Unbind success !!");
				}
            });
        }
    }).catch((err) => {
        console.log(err);
        return err;
    });
}










//----------test-----------------------------------------------
Example_getUserLdapDetails(id) {
    return new Promise(async function (resolve, reject) {
        var client;
        try {
            var response = {};
            setTimeout(function () {
                resolve('Not able to get Ldap details');
            }, 5000);
            var tlsOption = {
                'rejectUnauthorized': true
            }
            client = ldap.createClient({
                url: server,
                tlsOptions: tlsOption
            });
            client.bind(userPrincipalName, password, (err, res) => {
                console.log("In Ldap Bind and connection is establised :" + client.connected);
                if (err) {
                    console.log(err);
                    return reject(err);
                }
            });
            var opts = {
                filter: "id=" + id,
                scope: "sub",
                attributes: [
                    "mail",
                    "sn",
                    "telephoneNumber",
                    "givenName"                   
                ]
            };
            client.search(searchOption, opts, function (err, res) {
                if (err) {
                    console.log(err);
                    resolve(response);
                }
                res.on("searchEntry", function (entry, end) {
                    response.mail = entry.object.mail;
                    response.lastName = entry.object.sn;
                    response.firstNme = entry.object.givenName;
                    response.phone = entry.object.telephoneNumber;
                    resolve(response);
                });
            });
        } catch (err) {
            console.log(err);
            return reject(err);
        } finally {
            client.unbind(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
            });
        }
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

test = (req,res) =>{
	return new Promise(function(resolve,reject){
		var tlsOptions = {
			host: '10.1.99.9',
			port: '389'
		};		
		var client = ldap.createClient({
			url: 'ldap://10.1.99.9:389',
			tlsOptions: tlsOptions
		});		
		var entries=[];
		
		client.bind(username, adminPass, (err) => {
			if (err) {
				console.log('Error occurred while binding');
				return reject('Error occurred while binding AD');
			} else {
				//console.log('bind success');
				var base = 'OU=สำนักคอมพิวเตอร์,OU=1_Staffs,DC=msu,DC=ac,DC=th';
				var search_options = {
					filter: '(objectClass=person)',
					scope: 'sub',
					attributes: ['dn', 'sn', 'cn', 'description']
				};
				client.search(base, search_options, function (err, res) 
				{
					if (err) {
						console.log('Error occurred while ldap search');
						return reject('Error occurred while AD search');
					} else {
						res.on('searchEntry', function (entry) {
							//console.log( JSON.stringify(entry.object));
							//console.log(entry['dn'])
							//entries=JSON.stringify(entry.object);
							//console.log(entries);
							//console.log((i++)+" "+JSON.stringify(entry.object));
							entries.push(entry.object);
						});
						res.on('searchReference', function (referral) {
							//console.log('Referral', referral);
						});
						res.on('error', function (err) {
							console.log('Error is', err);
							return reject(err)
						});
						res.on('end', function (result) {
							//console.log('Result is', result);
							unbind(client);
							return resolve(entries);
						});
					}
				});		
			}
		});	
	});
}


		
} // class



function unbind(client){
	client.unbind((err) => {
			if (err) {
				console.log('Error occurred while binding');
			} else {
				console.log('unbind success');
			}
		});		
}

function entryHasUID(ou){
	
}


let authClassModel = new _authClass();
module.exports = authClassModel;


