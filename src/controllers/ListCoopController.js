const config = require("../DbConfig");
const sql = require("mssql");
const sqll = require("mssql");
class ListCoopController {
	getNull(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 8 MaHopDong, MaDoiTac, NgayHetHan
							from dbo.HOPDONG HD
							where NhanVienXacNhan is null and MaDoiTac is not null`
						)
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
	getNotNull(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 8 MaHopDong, MaDoiTac, NgayHetHan
							from dbo.HOPDONG HD
							where NhanVienXacNhan is not null and MaDoiTac is not null`
						)
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
	getDeadline(req, res) {
		const func = async () => {
			try {
				let result;
				const today = new Date();
				const yyyy = today.getFullYear();
				let mm = today.getMonth() + 1; // Months start at 0!

				if (mm < 10) mm = "0" + mm;

				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 100 MaHopDong, MaDoiTac, NgayHetHan
							from dbo.HOPDONG HD
							where month(NgayHetHan)='${mm}' and year(NgayHetHan)='${yyyy}'`
						)
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

module.exports = new ListCoopController();
