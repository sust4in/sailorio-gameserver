var Supply = require("../entities/supply");
var entityController = require("./entity.controller");

exports = module.exports = SupplyController;

function SupplyController () {
    entityController.call(this);
    this.lastSupplySpawnTime = null;
    this.supplyItems = [];
}

SupplyController.prototype.spawnOneSupply = function (worldConfig, supplyConfig) {
    var self = this;
    let nowDt = new Date().getTime();
    if (nowDt - self.lastSupplySpawnTime > 1000.000 * worldConfig.supplyRespawnSec)
    {
        let i = getRandomInt(0,supplyConfig.length - 1 );
        let supplyItem = supplyConfig[i];
        if (self.supplyItems.length < supplyItem.maxSupplyCount){
            let newSupplyCrate = new Supply(supplyItem, worldConfig);
            self.supplyItems.push(newSupplyCrate);
            self.lastSupplySpawnTime = new Date().getTime();
            console.log("Supply Spawned => "+ newSupplyCrate.supplyName+ "  x : " + newSupplyCrate.pos_x + " z: " + newSupplyCrate.pos_z);
            return null;
        }

    }
};
SupplyController.prototype.GetAllSupplies = function () {
    var self = this;
    let supplyList = [];
    self.supplyItems.forEach(function (supplyCrateDict) {
        supplyList.push({
            pos_x: supplyCrateDict.pos_x,
            pos_z: supplyCrateDict.pos_z,
            pos_y: supplyCrateDict.pos_y,
            supplyId: supplyCrateDict.supplyId,
            supplyIncome: supplyCrateDict.supplyIncome,
            assetName: supplyCrateDict.assetName,
        });
        //TODO: check collision
    });
    return supplyList;
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}