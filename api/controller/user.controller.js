const userModel = require("../model/user.model");

exports.getall = (req, res) => {
    userModel.getall()
        .then(([row]) => {
            res.status(200).json(row);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
}

exports.getpage = async (req, res) => {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let orderby = req.query.orderby||"created_at";

    if (page < 1) page = 1;
    let offset = (page - 1) * limit;

    let [[result]] = await userModel.rowcount();
    let numrow = result.value;

    userModel.getpage({ limit: limit, offset: offset, orderby: orderby})
        .then(async ([row]) => {
            let items = row;
            res.status(200).json({ items: items, totalItems: numrow, totalPages: Math.ceil(numrow / limit) });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
}

exports.getbyusername = (req, res) => {
    let username = req.params.username;
    console.log("getbyusername() ",username)
    userModel.getbyusername({username:username})
        .then(([row]) => {
            res.status(200).json(row);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });    
}

exports.delete = (req, res) => {
	userModel
	.delete({ id: req.params.id })
	.then(([row]) => {
		res.status(200).json(row);
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
}

exports.insert = (req, res) => {
    let datas = req.body;
    console.log("insert() ",datas)
    if (datas.username) {
        userModel
          .insert({ datas: datas })
          .then(([row]) => {
            res.status(200).json(row);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } else {
        res.status(400).send({ message: "Invalid request parameter" });
      }
}

exports.update = (req, res) => {
    let datas = req.body;
    let id = datas.id;
    console.log(datas)
    if(Object.keys(datas).length === 0){
        res.status(400).send({message:"Invalid request parameter"})
    }Object
    if(id){
        userModel.update({datas: datas})
        .then(([row]) => {
            res.status(200).json(row);
        })
        .catch((error) => {
            res.status(400).send(error)
        })
    } else {
         res.status(400).send({message:"Invalid request parameter"})
    }
}

exports.delete = (req, res) => {
    let id = req.params.id
    console.log("id=",id)
	userModel
	.delete({ id: id })
	.then(([row]) => {
		res.status(200).json(row);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
}