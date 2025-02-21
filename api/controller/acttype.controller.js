const acttypeModel = require("../model/acttype.model");
//const bcrypt = require("bcrypt");

exports.getitems = (req, res) => {
	var name = req.query.name||"";
	var page = req.query.page||0;
	var pagesize = req.query.size||10;
	var fillter = 1;
	if(name) fillter = "name like '%"+name+"%'";
	
  acttypeModel
    .getitems({fillter,page,pagesize})
    .then(([row]) => {
      
	  	
		acttypeModel
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
};

exports.create = (req, res) => {
	let datas = req.body;
	if(datas.code){
		acttypeModel
		.create({datas: datas})
		.then(([row])=>{
			res.status(200).json(row);
		})
		.catch((error)=> {
			res.status(400).send(error);
		});

	}
};

exports.delete = async (req, res) => {
	acttypeModel
	.delete({ id: req.params.id })
	.then(([row]) => {
		res.status(200).json(row);
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
}


exports.update = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  console.log(datas);
  if (Object.keys(datas).length === 0) { // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    acttypeModel
      .update({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};
