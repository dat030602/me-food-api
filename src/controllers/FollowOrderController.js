const config = require("../DbConfig");
const sql = require("mssql");
class FollowOrderController {
	// [GET] /follow-order/getDonHang/:slug
	getDonHang(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select DH.MaPhieuDatHang, DH.TongHoaDon, DH.TinhTrangDonHang
							from PHIEUDATHANG DH
							where MaKhachHang='${req.params.slug}'`
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

	// [POST] /follow-order/getTenKH
	getTenKH(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select distinct(KH.TenKhachHang),
							DC1.Xa + ', '+ DC1.Huyen + ', ' + DC1.ThanhPho as dcgh
						from CHITIETPHIEUDATHANG CTDH
							join PHIEUDATHANG DH on DH.MaPhieuDatHang=CTDH.MaPhieuDatHang
							join KHACHHANG KH on KH.MaKhachHang=DH.MaKhachHang
							join DIACHI DC1 on DH.DiaChiGH=DC1.MaDiaChi --Địa chỉ giao hàng
							where CTDH.MaPhieuDatHang='${req.body.pdh}'`
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

	// [POST] /follow-order/getDetail
	getDetail(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select MA.TenMonAn, CTDH.SoLuongMonAn, MA.Gia, CTDH.Ghichu, MA.MaMonAn
							from CHITIETPHIEUDATHANG CTDH
								join MONAN MA on CTDH.MaMonAn=MA.MaMonAn
								join PHIEUDATHANG DH on DH.MaPhieuDatHang=CTDH.MaPhieuDatHang
							where CTDH.MaPhieuDatHang='${req.body.pdh}'`
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
	// [POST] /follow-order/submit
	submit(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`insert into PHANHOI values('${req.body.mamonan}', '${req.body.ma}',
							'${req.body.binhluan}', '${req.body.danhgia}')`
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

	// [POST] /follow-order/deleteOrder
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

module.exports = new FollowOrderController();
