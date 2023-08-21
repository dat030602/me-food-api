const config = require("../DbConfig");
const sql = require("mssql");
class ContactController {
	async index(req, res) {}
	// [GET] /contact/getBranch/:slug
	getBranch(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT HP.MaHopDong, HP.NgayKichHoat, HP.NgayHetHan, DT.MaSoThue, DT.NguoiDaiDien,
									DT.SoLuongChiNhanh, DT.Diachikinhdoanh, DT.STKNganHang, DT.NganHang, HP.NhanVienXacNhan
							FROM dbo.DOITAC DT, dbo.HOPDONG HP
							where DT.MaDoiTac=HP.MaDoiTac and DT.MaDoiTac='${req.params.slug}'`
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
	// [POST] /contact/updateDateline/:slug
	updateDateline(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MAHD", sql.VarChar(10), req.params.slug)
						.input("NGAYHETHAN", sql.Date, req.body.date)
						.execute("dbo.SP_UPDATE_HOPDONG")
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
			res.json(ress);
		});
	}
	// [GET] /contact/getDateline/:slug
	getDateline(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MAHD", sql.VarChar(10), req.params.slug)
						.output("NGAYHETHAN", sql.Date)
						.execute("dbo.SP_SELECT_HOPDONG")
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
			res.json(ress);
		});
	}
	// [GET] /contact/getDatelineFix/:slug
	getDatelineFix(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MAHD", sql.VarChar(10), req.params.slug)
						.output("NGAYHETHAN", sql.Date)
						.execute("dbo.SP_SELECT_HOPDONG_FIX")
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
			res.json(ress);
		});
	}
	submit(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`update HOPDONG set NhanVienXacNhan='${req.body.nv}'
							where MaHopDong='${req.body.hd}'`
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
			res.json(ress);
		});
	}
	deleteContract(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`declare @MaDoiTac varchar(10)=(select MaDoiTac from dbo.HOPDONG where MaHopDong='${req.params.slug}')
							delete dbo.HOPDONG where MaDoiTac=@MaDoiTac;
							`
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
			res.json(ress);
		});
	}
}

module.exports = new ContactController();
