const entityController = require("./entity.controller");
const ship = require("../entities/ship");

exports = module.exports = ShipController;

function ShipController () {
    entityController.call(this);
}

ShipController.prototype = Object.create(entityController.prototype);
ShipController.prototype = {
    add: function (player, shipConfig) {
        let newShip = new ship(player, shipConfig);
        this.entities.push(newShip);
    },
    remove: function (id) {
        for (var i = 0; i < this.entities.length; i ++) {
            if (this.entities[i].id === id) {
                this.entities.splice(i, 1)[0];
                return;
            }
        }
    }
};

ShipController.prototype.addInput = function (id, inputName, input, time) {
    this.entities.some(function (player) {
        if (player.id === id) {
            input["time"] = time;
            player.inputs.push(input);
            return true;
        }
    });
};
ShipController.prototype.GetAllShips = function () {
    var self = this;
    let shipList = [];
    self.entities.forEach(function (entity) {
        //TODO: Collision
        shipList.push({
            pos_x: entity.pos_x,
            pos_z: entity.pos_z,
            pos_y: entity.pos_y,
            Id: entity.id,
            assetName: entity.assetName,
            captainUserId: entity.captainUserId,
            maxSuppliesCount: entity.maxSuppliesCount,
            currentSuppliesCount: entity.currentSuppliesCount,
            maxSailorsCount: entity.maxSailorsCount,
            currentSailorsCount: entity.currentSailorsCount,
            maxHealth: entity.maxHealth,
            currentHealth: entity.currentHealth,
            slopeSpeed: entity.slopeSpeed,
            rotationSpeed: entity.rotationSpeed,
            movementSpeed: entity.movementSpeed,
        });
    });
    return shipList;
};