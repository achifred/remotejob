const DbConnector = require("../config/connector");

const con = new DbConnector();

const addJob = async (req, res) => {
	try {
		const {
			title,
			company,
			company_url,
			location,
			type,
			description,
			salary,
			id
		} = req.body;
		// console.log(req.body)
		const sql = "SELECT * FROM dev.add_job($1,$2,$3,$4,$5,$6,$7,$8)";
		const result = await con.Query(sql, [
			title,
			company,
			company_url,
			location,
			type,
			description,
			salary,
			id
		]);
		res.send({ message: "success" }).status(200);
	} catch (error) {
		console.log(error.message);
	}
};

const fetchJob = async (req, res) => {
	try {
		const sql = "SELECT * FROM dev.all_jobs";
		const result = await con.fetchAll(sql);
		res.send(result.rows);
	} catch (error) {
		console.log(error.message);
	}
};

const jobByUser = async (req, res) => {
	try {
		const id = req.params.id;
		const sql = "SELECT * FROM dev.jobbyuser($1)";
		const result = await con.Query(sql, [id]);
		res.send(result.rows);
	} catch (error) {
		console.log(error.message);
	}
};
const singleJob = async (req, res) => {
	try {
		const id = req.params.id;
		const sql = "SELECT * FROM dev.single_job($1)";
		const result = await con.Query(sql, [id]);
		res.send(result.rows);
	} catch (error) {
		console.log(error.message);
	}
};
const updateJob = async (req, res) => {
	try {
		const {
			title,
			company,
			company_url,
			location,
			type,
			description,
			salary,
			id
		} = req.body;
		console.log(req.body);
		const sql = "SELECT * FROM dev.update_job($1,$2,$3,$4,$5,$6,$7,$8)";
		const result = await con.Query(sql, [
			id,
			title,
			company,
			company_url,
			location,
			type,
			description,
			salary
		]);

		//console.log(result.rows);

		res.send({ message: "success" });
	} catch (error) {
		console.log(error.message);
	}
};
const deleteJob = async (req, res) => {
	try {
		const id = req.params.id;
		const sql = "SELECT * FROM dev.delete_job($1)";
		const result = await con.Query(sql, [id]);
		res.send({ message: "success" });
	} catch (error) {
		console.log(error.message);
	}
};
module.exports = {
	addJob,
	fetchJob,
	jobByUser,
	singleJob,
	updateJob,
	deleteJob
};
