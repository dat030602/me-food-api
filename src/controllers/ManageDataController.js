const config = require("../DbConfig");
const sql = require("mssql");
class ManageCoopController {
	async index(req, res) {}
	// [GET] /manage-data/get1
	get1(req, res) {
		const func = async () => {
			try {
				let result;
				if (req.body.status == 0)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_orderStatistics")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 1)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_orderStatistics1")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 2)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_orderStatistics2")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 3)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_orderStatistics3")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				return result;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress.recordset);
		});
	}
	// [GET] /manage-data/get2
	get2(req, res) {
		const func = async () => {
			try {
				let result;
				if (req.body.status == 0)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_orderTrend_DESC")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 1)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_orderTrend_ASC")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				return result;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress.recordset);
		});
	}
	// [GET] /manage-data/get3
	get3(req, res) {
		const func = async () => {
			try {
				let result;
				if (req.body.status == 0)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_Total_Revenue")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 1)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_Total_Revenue1")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 2)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_Total_Revenue2")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 3)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.input("MaDoiTac", sql.VarChar(10), req.body.ma)
							.execute("dbo.SP_Total_Revenue3")
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				return result;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress.recordset);
		});
	}
}

module.exports = new ManageCoopController();
