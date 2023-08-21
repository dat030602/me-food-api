const express = require("express");
const router = express.Router();

const BranchController = require("../controllers/BranchController");

router.get("/getBranch/:slug", BranchController.getBranch);
router.get("/getMenu/:slug", BranchController.getMenu);
router.get("/getName/:slug", BranchController.getName);
router.post("/add/:slug", BranchController.add);
router.post("/updatePrice", BranchController.updatePrice);
router.post("/updateStoreOpenTime", BranchController.updateStoreOpenTime);
router.post("/updateStoreCloseTime", BranchController.updateStoreCloseTime);
router.post("/updateStoreStatus", BranchController.updateStoreStatus);
router.post("/updateStoreName", BranchController.updateStoreName);
router.put("/updateName/:slug", BranchController.updateName);
router.post("/saleoff/:slug", BranchController.saleoff);
router.delete("/delete/:slug", BranchController.remove);
router.get("/", BranchController.index);

module.exports = router;
