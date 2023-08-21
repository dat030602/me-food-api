const config = require("../DbConfig");
const sql = require("mssql");
class ManageCartController {
	async index(req, res) {}
	// [GET] /manage-cart/getCarts
	getCarts(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select PDH.MaPhieuDatHang, PDH.TongHoaDon, PDH.TinhTrangDonHang,
							DC.Xa + ', '+ DC.Huyen + ', ' + DC.ThanhPho as dc
							from PHIEUDATHANG PDH, DOITAC DT, CHINHANH CN, DIACHI DC
							where DT.MaDoiTac='${req.params.slug}' AND CN.MaChiNhanh=PDH.MaChiNhanh AND CN.MaDoiTac=DT.MaDoiTac and DC.MaDiaChi = PDH.DiaChiGH`
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
	// [GET] /manage-cart/getDetailCart/:slug
	getDetailCart(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select PDH.MaPhieuDatHang, PDH.TongHoaDon,CN.TenChiNhanh,
								DC1.Xa + ', '+ DC1.Huyen + ', ' + DC1.ThanhPho as dcgh,
								DC2.Xa + ', '+ DC2.Huyen + ', ' + DC2.ThanhPho as dccn,
							KH.TenKhachHang
							from dbo.PHIEUDATHANG PDH, dbo.CHINHANH CN, dbo.DIACHI DC1, dbo.DIACHI DC2, dbo.KHACHHANG KH
							where PDH.MaPhieuDatHang='${req.params.slug}' AND CN.MaChiNhanh=PDH.MaChiNhanh and DC1.MaDiaChi = PDH.DiaChiGH and DC2.MaDiaChi = CN.MaDiaChi and KH.MaKhachHang=PDH.MaKhachHang`
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
	// [GET] /manage-cart/products/:slug
	getProducts(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select MA.TenMonAn, CTPDH.SoLuongMonAn, MA.Gia from dbo.CHITIETPHIEUDATHANG CTPDH, dbo.MONAN MA where CTPDH.MaPhieuDatHang='${req.params.slug}' and CTPDH.MaMonAn = MA.MaMonAn`
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
	// [POST] /manage-cart/submit
	submitOrder(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`update dbo.PHIEUDATHANG set TinhTrangDonHang=N'${req.body.tinhtrang}' where MaPhieuDatHang='${req.body.pdh}'`
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

	// [POST] /manage-cart/deleteOrder
	deleteOrder(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`delete dbo.CHITIETPHIEUDATHANG where MaPhieuDatHang='${req.body.pdh}';
							delete dbo.PHIEUDATHANG where MaPhieuDatHang='${req.body.pdh}';
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

module.exports = new ManageCartController();
