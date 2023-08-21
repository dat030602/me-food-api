var config = {
	user: `databasedat_QuanLyDatVaGiaoHang`,
	password: `123`,
	database: "databasedat_QuanLyDatVaGiaoHang",
	server: `sql.bsite.net\\MSSQL2016`,
	driver: "mssql",
	options: {
		trustedConnection: true,
		trustServerCertificate: true,
	},
};

var configLogin = {
	user: `databasedat_TaiKhoanMatKhauMeFood`,
	password: `123`,
	database: "databasedat_TaiKhoanMatKhauMeFood",
	server: `sql.bsite.net\\MSSQL2016`,
	driver: "mssql",
	options: {
		trustedConnection: true,
		trustServerCertificate: true,
	},
};

module.exports = { config, configLogin };
