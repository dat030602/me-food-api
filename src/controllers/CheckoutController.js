const config = require("../DbConfig");
const sql = require("mssql");
class CheckoutController {
	async index(req, res) {}
	// [POST] /checkout/order
	order(req, res) {
		const func = async () => {
			try {
				var ma =
					"PDH" +
					Math.floor(Math.random() * (9999999 - 1000000 + 1)) +
					1000000;
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
						.input("MaPhieuDatHang", sql.VarChar(10), ma)
						.input("MaKhachHang", sql.VarChar(10), req.body.makh)
						.input("DiaChiGH", sql.VarChar(10), madc)
						.input("ThanhPho", sql.NVarChar(20), req.body.tinh)
						.input("Huyen", sql.NVarChar(20), req.body.huyen)
						.input("Xa", sql.NVarChar(20), req.body.xa)
						.input(
							"HinhThucThanhToan",
							sql.NVarChar(20),
							req.body.hinhthuc
						)
						.input("TongHoaDon", sql.Int, req.body.tong)
						.input("PhiVanChuyen", sql.Int, req.body.phi)

						.execute("dbo.SP_addOrder")
						.then((v) => {
							result = v;
						})
						.then(() => conn.close())
				);
				const value = req.body.products;
				for (let index = 0; index < value.length; index++) {
					const element = value[index];
					let result2;
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`insert into dbo.CHITIETPHIEUDATHANG values('${ma}', '${element.ma}', ${element.sl}, null)`
							)
							.then((v) => {
								result2 = v;
							})
							.then(() => conn.close())
					);
				}

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

module.exports = new CheckoutController();
