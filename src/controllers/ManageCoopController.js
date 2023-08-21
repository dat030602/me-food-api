const config = require("../DbConfig");
const sql = require("mssql");
class ManageCoopController {
	async index(req, res) {}
	// [POST] /manage-coop/get1
	get1(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 10 dt.TenDoiTac, count (cn.MaDoiTac) as slcn, sum(cn.DoanhThu) as doanhso, sum(cn.DoanhThu) * 0.1 as hoahong, hd.NgayHetHan
								from PHIEUDATHANG dh
								join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
								join DOITAC dt on cn.MaDoiTac=dt.MaDoiTac
								join HOPDONG hd on hd.MaDoiTac=dt.MaDoiTac
								group by dt.TenDoiTac, dt.MaDoiTac, hd.NgayHetHan`
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
	// [POST] /manage-coop/get2
	get2(req, res) {
		const func = async () => {
			try {
				let result;
				if (req.body.status == 0)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`select top 10 dt.MaDoiTac, dt.TenDoiTac, count (dh.MaKhachHang) as slkh,Year(dh.NgayGiaoHang) as NgayGiaoHang
						from PHIEUDATHANG dh
						join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
						join DOITAC dt on cn.MaDoiTac=dt.MaDoiTac
						group by dt.TenDoiTac, dt.MaDoiTac, Year(dh.NgayGiaoHang)`
							)
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 1)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`select top 10 dt.MaDoiTac, dt.TenDoiTac, count (dh.MaKhachHang) as slkh,Month(dh.NgayGiaoHang) as NgayGiaoHang
						from PHIEUDATHANG dh
						join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
						join DOITAC dt on cn.MaDoiTac=dt.MaDoiTac
						group by dt.TenDoiTac, dt.MaDoiTac, Month(dh.NgayGiaoHang)`
							)
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 2)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`select top 10 dt.MaDoiTac, dt.TenDoiTac, count (dh.MaKhachHang) as slkh,day(dh.NgayGiaoHang) as NgayGiaoHang
						from PHIEUDATHANG dh
						join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
						join DOITAC dt on cn.MaDoiTac=dt.MaDoiTac
						group by dt.TenDoiTac, dt.MaDoiTac, day(dh.NgayGiaoHang)`
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
	// [POST] /manage-coop/get3
	get3(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 10 dt.MaDoiTac, dt.TenDoiTac, count (dh.MaPhieuDatHang) as sldh, sum(cn.DoanhThu) as doanhso
								from PHIEUDATHANG dh
								join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
								join DOITAC dt on cn.MaDoiTac=dt.MaDoiTac
								group by dt.TenDoiTac, dt.MaDoiTac`
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
	// [POST] /manage-coop/get4
	get4(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 10 dt.MaDoiTac, dt.TenDoiTac, count (dh.MaPhieuDatHang) as sldh, sum(cn.DoanhThu)/10 as doanhso
								from PHIEUDATHANG dh
								join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
								join DOITAC dt on cn.MaDoiTac=dt.MaDoiTac
								group by dt.TenDoiTac, dt.MaDoiTac`
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
	// [POST] /manage-coop/get5
	get5(req, res) {
		const func = async () => {
			try {
				let result;
				if (req.body.status == 0)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`select top 10 datepart(yyyy, NgayGiaoHang) as [Nam], sum(TongHoaDon) * 0.1 as TongHoaDon
								from PHIEUDATHANG dh join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
								group by datepart(yyyy, NgayGiaoHang)
								order by [Nam] desc`
							)
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 1)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`select top 12 datepart(mm, NgayGiaoHang) as [Thang], datepart(yyyy, NgayGiaoHang) as [Nam],sum(TongHoaDon) * 0.1 as TongHoaDon
								from PHIEUDATHANG dh join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
								group by datepart(mm, NgayGiaoHang), datepart(yyyy, NgayGiaoHang)
								order by [Nam] desc`
							)
							.then((v) => {
								result = v;
							})
							.then(() => conn.close())
					);
				else if (req.body.status == 2)
					await sql.connect(config.config).then((conn) =>
						conn
							.request()
							.query(
								`select top 100 datepart(dd, NgayGiaoHang) as [Ngay], datepart(mm, NgayGiaoHang) as [Thang], datepart(yyyy, NgayGiaoHang) as [Nam],
								sum(TongHoaDon) * 0.1 as TongHoaDon
								from PHIEUDATHANG dh join CHINHANH cn on dh.MaChiNhanh=cn.MaChiNhanh
								group by datepart(dd, NgayGiaoHang), datepart(mm, NgayGiaoHang), datepart(yyyy, NgayGiaoHang)
								order by [Nam] desc`
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
	// [POST] /manage-coop/get6
	get6(req, res) {
		const func = async () => {
			try {
				let result;
				await sql.connect(config.config).then((conn) =>
					conn
						.request()
						.query(
							`select top 10 dt.MaDoiTac, dt.TenDoiTac, td.Rating
								from THUCDON td
								join DOITAC dt on td.MaDoiTac=dt.MaDoiTac
								group by dt.MaDoiTac, dt.TenDoiTac, td.Rating
								having td.Rating=1`
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

module.exports = new ManageCoopController();
