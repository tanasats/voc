const activityModel = require("../model/activity.model");
const bcrypt = require("bcrypt");


var multer = require('multer')
const maxSize = 5 * 1024 * 1024;
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'C:/services/uploadfile/uploads');
   },
   filename: function (req, file, cb) {
      //cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  not work
	const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
   }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }, // filesize in bytes
  fileFilter: (req, file, cb) => {
	  console.log(file);
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('File types allowed .jpeg, .jpg and .png!'));
      }
  }    
}).single('avatar');




exports.fillter = (req,res) => {
	var keyword = req.query.keyword||"";
	var page = req.query.page||0;
	var pagesize = req.query.size||10;
	var fillter = 1;
	if(keyword) fillter = "actcode like '%"+keyword+"%' or actname like '%"+keyword+"%'";
	
  activityModel
    .getall({fillter,page,pagesize})
    .then(([row]) => {
      
		activityModel
		.count(fillter)
		.then(([rowcount])=>{
			//console.log(rowcount[0].count);
			var itemscount = rowcount[0].count;	
			var result ={
				//"total": total,  
				"pagecurrent":page,
				"pagetotal": Math.ceil(itemscount/pagesize),
				"pagesize":pagesize,
				"fillter":fillter,
				"itemsfound":itemscount,
				"items": row };
			res.status(200).json(result);				
		})
		.catch((error)=>{
			console.log(error);
		});	
	  
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });	

}



exports.listActivity = (req, res) => {
  activityModel
    .listActivity()
    .then(([row]) => {
      //console.log(row);
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
};

exports.insert = async (req, res) => {
  const datas = req.body;
  if (datas.actname) {
    activityModel
      .insert({ datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.delete = async (req, res) => {
	activityModel
	.delete({ id: req.params.id })
	.then(([row]) => {
		res.status(200).json(row);
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
}

exports.findById = (req, res) => {
  activityModel
    .findById({ id: req.params.id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
}

exports.update = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  console.log(datas);
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    datas.mdate = new Date();
    activityModel
      .update({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};



exports.pictureupload = async (req, res)=>{	
		await upload(req,res,function(err){	
		    if (err instanceof multer.MulterError) {
			  // A Multer error occurred when uploading.
				if (err.code == "LIMIT_FILE_SIZE") {
				  return res.status(400).send({ message: "File size should be less than 5MB", });
				}else{
				  return res.status(400).send({ message: "Multer error :"+err.code, });
				}
			} else if (err) {
			  // An unknown muter error occurred when uploading.
			  return res.status(400).send({ message: `Error occured: ${err}`,});
				}
								
			//console.log(req.file)		
			if (!req.file == undefined) {
			  return res.status(400).send({ message: "Please upload a file!" });
			}
			//--success upload
			res.status(200).send({
			  message: "Uploaded the file successfully: " + req.file.originalname,
			});				

		});
};




/*
exports.listallRole = (req, res) => {
	console.log("xxxx");
  userModel
    .listallRole()
    .then(([row]) => {
      //console.log(row);
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
};
exports.findById = (req, res) => {
  userModel
    .findById({ id: req.params.id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
}; 

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    datas.mdate = new Date();
    userModel
      .updateUser({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};
exports.deleteUser = (req, res) => {
  if (req.params.id) {
    userModel
      .deleteUser({ id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};
*/
