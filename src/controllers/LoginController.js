const config = require("../DbConfig");
const sql = require("mssql");
const sqll = require("mssql");
class BranchController {
	// [POST] /
	index(req, res) {
		const func = async () => {
			try {
				let name_user;
				let result;
				await sql.connect(config.configLogin).then((conn) =>
					conn
						.request()
						.input("username", sql.VarChar(10), req.body.user)
						.input("pass", sql.VarChar(20), req.body.password)
						.execute("dbo.SP_DangNhap")
						.then((v) => {
							result = v;
						})
						.then(() => conn.close())
				);
				if (result.returnValue === 1) {
					const value = async () => {
						try {
							let name;

							await sql.connect(config.config).then((conn) =>
								conn
									.request()
									.query(
										`SELECT MaNhanVien as ma, TenNhanVien AS Ten FROM dbo.NHANVIEN WHERE DienThoaiNhanVien='${req.body.user}'`
									)
									.then((v) => {
										name = v;
									})
									.then(() => conn.close())
							);
							if (name.recordset[0] === undefined) {
								await sql.connect(config.config).then((conn) =>
									conn
										.request()
										.query(
											`SELECT MaTaiXe as ma, TenTaiXe AS Ten FROM dbo.TAIXE WHERE DienThoaiTaiXe='${req.body.user}'`
										)
										.then((v) => {
											name = v;
										})
										.then(() => conn.close())
								);
							}
							if (name.recordset[0] === undefined) {
								await sql.connect(config.config).then((conn) =>
									conn
										.request()
										.query(
											`SELECT MaDoiTac as ma, NguoiDaiDien AS Ten FROM dbo.DOITAC WHERE DienThoaiDoiTac='${req.body.user}'`
										)
										.then((v) => {
											name = v;
										})
										.then(() => conn.close())
								);
							}
							if (name.recordset[0] === undefined) {
								await sql.connect(config.config).then((conn) =>
									conn
										.request()
										.query(
											`SELECT MaKhachHang as ma, TenKhachHang AS Ten FROM dbo.KHACHHANG WHERE DienThoaiKhachHang='${req.body.user}'`
										)
										.then((v) => {
											name = v;
										})
										.then(() => conn.close())
								);
							}
							return name;
						} catch (error) {
							console.log(`Error: ${error}`);
						}
					};
					name_user = value();
				}
				if (result.returnValue === 0) {
					return result;
				} else {
					return name_user;
				}
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress);
		});
	}
	Logout(req, res) {
		const func = async () => {
			try {
				let result;
				console.log(req.body.user);
				await sql.connect(config.configLogin).then((conn) =>
					conn
						.request()
						.input("username", sql.VarChar(10), req.body.user)
						.execute("dbo.SP_DangXuat")
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

module.exports = new BranchController();
