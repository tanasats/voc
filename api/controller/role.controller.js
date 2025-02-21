const roleModel = require("../model/role.model");
//const bcrypt = require("bcrypt");

exports.listallRole = (req, res) => {
  roleModel
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
  roleModel
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
exports.roleByUser = (req, res) => {
	console.log("roleByUserId");
  roleModel
    .roleByUser({ id: req.params.id })
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
exports.addRole = async (req, res) => {
  const datas = req.body;
  datas.name = req.body.name || req.body.email;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (datas.email) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    roleModel
      .addRole({ datas: datas })
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
exports.updateRole = async (req, res) => {
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
    roleModel
      .updateRole({ id: id, datas: datas })
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
exports.deleteRole = (req, res) => {
  if (req.params.id) {
    roleModel
      .deleteRole({ id: req.params.id })
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
