module.exports = {
	user : process.env.NODE_ORACLEDB_USER || "avsmis",
	password : process.env.NODE_ORACLEDB_PASSWORD || "simusm@2024.",
	connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 202.28.32.213)(PORT = 1521))(CONNECT_DATA =(SERVICE_NAME= AVSMIS)))",
	externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
/*
module.exports = {
user : process.env.NODE_ORACLEDB_USER || "AVSMIS",
password : process.env.NODE_ORACLEDB_PASSWORD || "Oracle123",
connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 202.28.32.213)(PORT = 1521))(CONNECT_DATA =(SERVICE_NAME= AVSMIS)))",
externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
*/
