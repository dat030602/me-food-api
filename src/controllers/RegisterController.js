const config = require("../DbConfig");
const sql = require("mssql");
class RegisterController {
	// [POST] /register/customer
	registerCustomer(req, res) {
		const func = async () => {
			try {
				var ma =
					"KH" +
					Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
					10000000;
				var madc =
					"DC" +
					Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
					10000000;
				ma = ma.slice(0, 10);
				madc = madc.slice(0, 10);
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MaKhachHang", sql.VarChar(10), ma)
						.input("TenKhachHang", sql.NVarChar(50), req.body.name)
						.input(
							"DienThoaiKhachHang",
							sql.VarChar(10),
							req.body.dienthoai
						)
						.input(
							"EmailKhachHang",
							sql.VarChar(50),
							req.body.email
						)
						.input("MaDiaChi", sql.VarChar(10), madc)
						.input("ThanhPho", sql.NVarChar(20), req.body.tinh)
						.input("Huyen", sql.NVarChar(20), req.body.huyen)
						.input("Xa", sql.NVarChar(20), req.body.xa)
						.execute("dbo.SP_DangKy_KH")
						.then((v) => {
							result = v;
						})
						.then(() => conn.close())
				);

				let result2;
				await sql.connect(config.configLogin).then((conn) =>
					conn
						.request()
						.input("username", sql.VarChar(10), req.body.dienthoai)
						.input("pass", sql.VarChar(20), req.body.matkhau)
						.execute("dbo.SP_DangKy")
						.then((v) => {
							result2 = v;
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

	// [POST] /register/driver
	registerDriver(req, res) {
		const func = async () => {
			try {
				var ma =
					"TX" +
					Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
					10000000;
				var madc =
					"DC" +
					Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
					10000000;
				ma = ma.slice(0, 10);
				madc = madc.slice(0, 10);
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MaTaiXe", sql.VarChar(10), ma)
						.input("TenTaiXe", sql.NVarChar(50), req.body.name)
						.input("CMND", sql.VarChar(12), req.body.cmnd)
						.input("DienThoaiTaiXe", sql.VarChar(10), req.body.dienthoai)
						.input("EmailTaiXe", sql.VarChar(50), req.body.email)
						.input("BIENSOXE", sql.VarChar(20), req.body.bienso)
						.input("Diachinhataixe", sql.NVarChar(50), req.body.diachinha)
						.input("STKNG", sql.VarChar(20), req.body.stk)
						.input("NganHang", sql.VarChar(20), req.body.nganhang)
						.input("PhiTheChan", sql.Int, req.body.phithechan)
						.input("KVucHD", sql.Int, req.body.madc)
						.input("ThanhPho", sql.VarChar(20), req.body.tinh)
						.input("Huyen", sql.VarChar(20), req.body.huyen)
						.input("Xa", sql.VarChar(20), req.body.xa)
						.execute("dbo.SP_DangKy_TX")
						.then((v) => {
							result = v;
						})
						.then(() => conn.close())
				);

				let result2;
				await sql.connect(config.configLogin).then((conn) =>
					conn
						.request()
						.input("username", sql.VarChar(10), req.body.dienthoai)
						.input("pass", sql.VarChar(20), req.body.matkhau)
						.execute("dbo.SP_DangKy")
						.then((v) => {
							result2 = v;
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

	// [POST] /register/coop
	registerCoop(req, res) {
		const func = async () => {
			try {
				var ma =
					"DT" +
					Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
					10000000;
				var madc =
					"DC" +
					Math.floor(Math.random() * (99999999 - 10000000 + 1)) +
					10000000;
				ma = ma.slice(0, 10);
				madc = madc.slice(0, 10);
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.input("MaDoiTac", sql.VarChar(10), ma)
						.input("NguoiDaiDien", sql.NVarChar(50), req.body.name)
						.input("Email", sql.VarChar(50), req.body.email)
						.input("DienThoaiDoiTac", sql.VarChar(10), req.body.dienthoai)
						.input("MaSoThue", sql.VarChar(20), req.body.masothue)
						.input("SoLuongChiNhanh", sql.Int, req.body.soluongchinhanh)
						.input("LoaiAmThuc", sql.NVarChar(20), req.body.loaiamthuc)
						.input("STKNganHang", sql.VarChar(20), req.body.stk)
						.input("NganHang", sql.VarChar(20), req.body.nganhang)
						.input("Diachikinhdoanh", sql.NVarChar(100), req.body.diachikinhdoanh)
						.input("TenDoiTac", sql.VarChar(50), req.body.tendt)
						.execute("dbo.SP_DangKy_DT")
						.then((v) => {
							result = v;
						})
						.then(() => conn.close())
				);

				let result2;
				await sql.connect(config.configLogin).then((conn) =>
					conn
						.request()
						.input("username", sql.VarChar(10), req.body.dienthoai)
						.input("pass", sql.VarChar(20), req.body.matkhau)
						.execute("dbo.SP_DangKy")
						.then((v) => {
							result2 = v;
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

module.exports = new RegisterController();
