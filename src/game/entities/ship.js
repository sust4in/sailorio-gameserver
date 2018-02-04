const Entity = require("./entity");
const uuidv4 = require('uuid/v4');
const config = require('../../config/game');

exports = module.exports = Ship;

function Ship (player, shipConfig) {
    this.currentCrewMembersIds = [];
    this.shipName = player.Username+ "'s Ship";
    //using for making unique object
    let uniqueId = this.shipName+ "#" + uuidv4();
    Entity.call(this, uniqueId);
    this.assetName = shipConfig.assetName;
    this.captainUserId = player.Id;
    this.slopeSpeed = shipConfig.slopeSpeed;
    this.maxSuppliesCount = shipConfig.maxSuppliesCount;
    this.currentSuppliesCount = 0;
    this.maxSailorsCount = shipConfig.maxSailorsCount;
    this.currentSailorsCount = 0;
    this.marketPrice = shipConfig.marketPrice;
    this.maxHealth = shipConfig.maxHealth;
    this.currentHealth = shipConfig.maxHealth;
    this.rotationSpeed = shipConfig.rotationSpeed;
    this.movementSpeed = shipConfig.movementSpeed;
    this.absSpeed = shipConfig.absSpeed;
    this.pos_x = 0;
    this.pos_y = 0;
    this.pos_z = 0;
    this.inputs = [];
}

Ship.prototype = Object.create(Entity.prototype);

Ship.prototype.validateInput = function(dt_time) {
    if (Math.abs(dt_time) > 0.2) {
        return false;
    }
    return true;
};

Ship.prototype.moveForward = function () {
    //if it has an index about given input. it return > -1 index number.
    //TODO:0.02 must be on game.yaml
    this.pos_z += (this.absSpeed * config.game.absolute_delta_time * this.movementSpeed);
};

// Ship.prototype.moveTo = function (data) {
//     var dt_time = parseFloat(data.deltaTime);
//     if(this.validateInput(dt_time)){
//
//         var max_vector_poss = [0, -1, 1];
//         //if it has an index about given input. it return > -1 index number.
//         var x_is_valid = max_vector_poss.indexOf(data.vcX) > -1;
//         var y_is_valid = max_vector_poss.indexOf(data.vcZ) > -1;
//         var inputVc = new vector2(data.vcX, data.vcY);
//         var charVc = new vector2(this.pos_x, this.pos_y);
//
//         if(x_is_valid && y_is_valid)
//         {
//             if(inputVc.x !== 0 || inputVc.y !== 0)
//             {
//                 //TODO:0.02 must be on game.yam
//                 this.pos_x += (inputVc.x * dt_time * this.state.baseSpeed);
//                 this.pos_y += (inputVc.y * dt_time * this.state.baseSpeed);
//             }
//         }
//     }
// };