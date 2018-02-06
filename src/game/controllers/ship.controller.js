const entityController = require("./entity.controller");
const Ship = require("../entities/ship");

exports = module.exports = ShipController;

function ShipController () {
    entityController.call(this);
}

ShipController.prototype = Object.create(entityController.prototype);
ShipController.prototype = {
    add: function (player, shipConfig) {
        let newShip = new Ship(player, shipConfig);
        this.entities.push(newShip);
    },
    remove: function (socket) {
        this.entities = this.entities.filter(function(item) {
            return item.captainUserId !== socket.client.id
        });
    },
    get: function (socket) {
         let ship = this.entities.filter(function(item) {
            return item.captainUserId === socket.client.id
        })[0];
        return ship.id;
    }
};


ShipController.prototype.addInput = function (id, inputName, input, time) {
    this.entities.some(function (ship) {
        if (ship.id === id) {
            input["time"] = time;
            ship.inputs.push(input);
            return true;
        }
    });
};

ShipController.prototype.GetAllShips = function () {
    let self = this;
    let shipList = [];
    self.entities.forEach(function (entity) {
        //TODO: Collision
        entity.moveForward();
        shipList.push({
            pos_x: entity.pos_x,
            pos_z: entity.pos_z,
            pos_y: entity.pos_y,
            viewAngle: entity.viewAngle,
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
            lastMoveUpdateTs: (new Date().getTime() / 1000.000).toFixed(3),
            inputs: entity.inputs,
            lastProcessedInputSeqId: entity.lastProcessedInputSeqId
        });
    });
    return shipList;
};