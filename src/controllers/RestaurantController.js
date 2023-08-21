const config = require("../DbConfig");
const sql = require("mssql");
class RestaurantController {
	async index(req, res) {}
	// [GET] /restaurant/getName/:slug
	getName(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT DT.TenDoiTac, DT.LoaiAmThuc, DT.Email, TD.MaThucDon, TD.Rating
							FROM dbo.DOITAC DT, dbo.THUCDON TD
							where TD.MaDoiTac='${req.params.slug}' and DT.MaDoiTac=TD.MaDoiTac`
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
			res?.json(ress.recordset);
		});
	}

	getOption(req, res) {
		console.log("CCCCCC")
		const func = async () => {
			try {
				let products;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT NoiDungTuyChon
							FROM dbo.TUYCHON T
							where T.MaMonAn='${req.params.slug}'`
						)
						.then((v) => {
							products = v;
						})
						.then(() => conn.close())
				);
				return products;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res?.json(ress?.recordset);
			console.log(ress);
		});
	}

	getMenu(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MaTD", sql.VarChar(10), req.params.slug)
						.execute("dbo.Xem_Thuc_Don")
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
	getComment(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select TenMonAn, TenKhachHang, PH.Rating, PH.BinhLuan
							from THUCDON TD join MONAN MA on MA.MaThucDon=TD.MaThucDon
										join PHANHOI PH on PH.MaMonAn=MA.MaMonAn
										join KHACHHANG KH on KH.MaKhachHang=PH.MaKhachHang
							where TD.MaThucDon='${req.params.slug}'`
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

module.exports = new RestaurantController();
