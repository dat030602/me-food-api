const config = require("../DbConfig");
const sql = require("mssql");
class HomeController {
  async index(req, res) {}
  // [GET] /home/getBranch1
  getBranch1(req, res) {
    const func = async () => {
      try {
        let result;
        await sql.connect(config.config).then((conn) =>
          conn
            .request()
            .query(
              `SELECT TOP 8 DT.MaDoiTac, Dt.TenDoiTac, DT.LoaiAmThuc,TD.Rating
							FROM dbo.DOITAC DT, dbo.THUCDON TD
							where DT.MaDoiTac = TD.MaDoiTac`
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
      res?.json(ress?.recordset);
    });
  }
  // [GET] /home/getBranch2
  getBranch2(req, res) {
    const func = async () => {
      try {
        let result;
        await sql.connect(config.config).then((conn) =>
          conn
            .request()
            .query(
              `SELECT TOP 8 DT.MaDoiTac, Dt.TenDoiTac, DT.LoaiAmThuc,TD.Rating, CN.ThoiGianDoiTen
							FROM dbo.DOITAC DT, dbo.THUCDON TD, dbo.CHINHANH CN
							where DT.MaDoiTac = TD.MaDoiTac and CN.MaDoiTac = DT.MaDoiTac`
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
      res?.json(ress?.recordset);
    });
  }
}

module.exports = new HomeController();
