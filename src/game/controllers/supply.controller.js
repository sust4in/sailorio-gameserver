var Supply = require("../entities/supply");
var entityController = require("./entity.controller");
var Sugar = require('sugar');
exports = module.exports = SupplyController;

function SupplyController () {
    entityController.call(this);
    this.lastSupplySpawnTime = null;
    this.supplyItems = new Sugar.Array([]);
}

SupplyController.prototype.spawnOneSupply = function (worldConfig, supplyConfig) {
    let self = this;
    let nowDt = new Date().getTime();
    if (nowDt - self.lastSupplySpawnTime > 1000.000 * worldConfig.supplyRespawnSec)
    {
        let i = getRandomInt(0, supplyConfig.length - 1 );
        let supplyItem = supplyConfig[i];
        if (self.supplyItems.count() < supplyItem.maxSupplyCount)  {
            let newSupplyCrate = new Supply(supplyItem, worldConfig);
            self.supplyItems.push(newSupplyCrate);
            self.lastSupplySpawnTime = new Date().getTime();
            console.log("Supply Spawned => "+ newSupplyCrate.supplyName+ "  x: " + newSupplyCrate.pos_x + " z: " + newSupplyCrate.pos_z);
            return null;
        }
    }
};

SupplyController.prototype.spawnOneSupplyWithInterval = function (worldConfig, supplyConfig) {
    let self = this;
        let i = getRandomInt(0, supplyConfig.length - 1 );
        let supplyItem = supplyConfig[i];
        if (self.supplyItems.count() < supplyItem.maxSupplyCount)  {
            let newSupplyCrate = new Supply(supplyItem, worldConfig);
            self.supplyItems.push(newSupplyCrate);
            return null;
        }
};

SupplyController.prototype.GetAllSupplies = function () {
    let self = this;
    let supplyList = [];
    self.supplyItems.forEach(function (supplyCrate) {
        supplyList.push({
            pos_x: supplyCrate.pos_x,
            pos_z: supplyCrate.pos_z,
            pos_y: supplyCrate.pos_y,
            supplyId: supplyCrate.supplyId,
            supplyIncome: supplyCrate.supplyIncome,
            assetName: supplyCrate.assetName,
            isDeath: supplyCrate.isDeath
        });
    });
    return supplyList;
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}