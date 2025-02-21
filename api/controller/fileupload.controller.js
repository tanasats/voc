const uploadFile = require("../middleware/upload");

const test = (req,res) =>{
    res.status(200).send('test')
}
const test1 = (req,res)=>{
    res.status(200).send('test1')  
}

const upload = async (req, res) => {
	console.log(req.file);
	
	
  try {
    await uploadFile(req, res);
	console.log("after:",req.file);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size should be less than 5MB",
      });
    }

    res.status(500).send({
      message: `Error occured: ${err}`,
    });
  }
};
 
 
   

module.exports = {
    test : test,
    test1: test1,
	upload:upload
}


