const config = require("../DbConfig");
const sql = require("mssql");
class StatisticsController {
	async index(req, res) {}

	getOrder(req, res) {
		const func = async () => {
			try {
				let results;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT PDH.MaPhieuDatHang, CN.MaChiNhanh, CN.TenChiNhanh, PDH.TinhTrangDonHang, PDH.TongHoaDon
							FROM PHIEUDATHANG PDH, CHINHANH CN
							WHERE PDH.MaChiNhanh = CN.MaChiNhanh AND CN.MaDoiTac = '${req.params.slug}'`
						)
						.then((v) => {
							results = v;
						})
						.then(() => conn.close())
				);
				return results;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress.recordset);
		});
	}

	compareOrderPerMonth(req, res) {
		const func = async () => {
			try {
				let results;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT COUNT(MaPhieuDatHang) AS SoLuongDonHang, MONTH(PDH.NgayGiaoHang) AS Thang
							FROM PHIEUDATHANG PDH, CHINHANH CN
							WHERE YEAR(PDH.NgayGiaoHang)= '2013' AND CN.MaChiNhanh = PDH.MaChiNhanh AND CN.MaDoiTac = '${req.params.slug}'
							GROUP BY MONTH(PDH.NgayGiaoHang)
							ORDER BY MONTH(PDH.NgayGiaoHang) ASC`
						)
						.then((v) => {
							results = v;
						})
						.then(() => conn.close())
				);
				return results;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress.recordset);
		});
	}
	
	getUnprocessOrder(req, res) {
		const func = async () => { 
			try {
				let results;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT PDH.MaPhieuDatHang AS DonHangChuaXuLy, CN.MaChiNhanh, CN.TenChiNhanh
							FROM PHIEUDATHANG PDH, CHINHANH CN
							WHERE PDH.MaChiNhanh = CN.MaChiNhanh AND PDH.TinhTrangDonHang like N'Chờ xử lý' AND CN.MaDoiTac = '${req.params.slug}'`
						)
						.then((v) => {
							results = v;
						})
						.then(() => conn.close())
				);
				return results;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress?.recordset);
		});
	}
	getTrendOrder(req, res) {
		const func = async () => {
			try {
				let results;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`SELECT SUM(CTPDH.SoLuongMonAn) AS SoLuong, CTPDH.MaMonAn
							FROM CHITIETPHIEUDATHANG CTPDH, PHIEUDATHANG PDH, CHINHANH CN
							WHERE CTPDH.MaPhieuDatHang = PDH.MaPhieuDatHang AND PDH.MaChiNhanh = CN.MaChiNhanh AND CN.MaDoiTac = '${req.params.slug}'
							GROUP BY CTPDH.MaMonAn
							ORDER BY SoLuong DESC`
						)
						.then((v) => {
							results = v;
						})
						.then(() => conn.close())
				);
				return results;
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		func().then((ress) => {
			res.json(ress?.recordset);
		});
	}
	
}

module.exports = new StatisticsController()