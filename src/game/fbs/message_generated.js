// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @const
 * @namespace
 */
var SailorIO = SailorIO || {};

/**
 * @const
 * @namespace
 */
SailorIO.Models = SailorIO.Models || {};

/**
 * @enum
 */
SailorIO.Models.EventTypes = {
  UpdateModel: 0,
  WorldInfoUpdate: 1,
  NewPlayer: 2,
  BuyNewShip: 3,
  SailShip: 4,
  RemovePlayer: 5,
  PlayerDisconnect: 6
};

/**
 * @enum
 */
SailorIO.Models.SupplyTypes = {
  CRATE1: 0,
  CRATE2: 1,
  WOODENBARREL1: 2,
  WOODENBARREL2: 3
};

/**
 * @enum
 */
SailorIO.Models.ShipTypes = {
  RAFT1: 0
};

/**
 * @constructor
 */
SailorIO.Models.Vec3 = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.Vec3}
 */
SailorIO.Models.Vec3.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @returns {number}
 */
SailorIO.Models.Vec3.prototype.x = function() {
  return this.bb.readFloat32(this.bb_pos);
};

/**
 * @returns {number}
 */
SailorIO.Models.Vec3.prototype.y = function() {
  return this.bb.readFloat32(this.bb_pos + 4);
};

/**
 * @returns {number}
 */
SailorIO.Models.Vec3.prototype.z = function() {
  return this.bb.readFloat32(this.bb_pos + 8);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.Vec3.createVec3 = function(builder, x, y, z) {
  builder.prep(4, 12);
  builder.writeFloat32(z);
  builder.writeFloat32(y);
  builder.writeFloat32(x);
  return builder.offset();
};

/**
 * @constructor
 */
SailorIO.Models.Input = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.Input}
 */
SailorIO.Models.Input.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {SailorIO.Models.Vec3=} obj
 * @returns {SailorIO.Models.Vec3|null}
 */
SailorIO.Models.Input.prototype.pos = function(obj) {
  return (obj || new SailorIO.Models.Vec3).__init(this.bb_pos, this.bb);
};

/**
 * @returns {number}
 */
SailorIO.Models.Input.prototype.time = function() {
  return this.bb.readInt32(this.bb_pos + 12);
};

/**
 * @returns {number}
 */
SailorIO.Models.Input.prototype.deltaTime = function() {
  return this.bb.readInt32(this.bb_pos + 16);
};

/**
 * @returns {number}
 */
SailorIO.Models.Input.prototype.sequenceId = function() {
  return this.bb.readInt32(this.bb_pos + 20);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} pos_x
 * @param {number} pos_y
 * @param {number} pos_z
 * @param {number} time
 * @param {number} deltaTime
 * @param {number} sequenceId
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.Input.createInput = function(builder, pos_x, pos_y, pos_z, time, deltaTime, sequenceId) {
  builder.prep(4, 24);
  builder.writeInt32(sequenceId);
  builder.writeInt32(deltaTime);
  builder.writeInt32(time);
  builder.prep(4, 12);
  builder.writeFloat32(pos_z);
  builder.writeFloat32(pos_y);
  builder.writeFloat32(pos_x);
  return builder.offset();
};

/**
 * @constructor
 */
SailorIO.Models.Supply = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.Supply}
 */
SailorIO.Models.Supply.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {SailorIO.Models.Supply=} obj
 * @returns {SailorIO.Models.Supply}
 */
SailorIO.Models.Supply.getRootAsSupply = function(bb, obj) {
  return (obj || new SailorIO.Models.Supply).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {SailorIO.Models.Vec3=} obj
 * @returns {SailorIO.Models.Vec3|null}
 */
SailorIO.Models.Supply.prototype.pos = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? (obj || new SailorIO.Models.Vec3).__init(this.bb_pos + offset, this.bb) : null;
};

/**
 * @returns {SailorIO.Models.SupplyTypes}
 */
SailorIO.Models.Supply.prototype.assetId = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? /** @type {SailorIO.Models.SupplyTypes} */ (this.bb.readInt8(this.bb_pos + offset)) : SailorIO.Models.SupplyTypes.CRATE1;
};

/**
 * @returns {boolean}
 */
SailorIO.Models.Supply.prototype.isDeath = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns {boolean}
 */
SailorIO.Models.Supply.prototype.isNew = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
};

/**
 * @param {flatbuffers.Builder} builder
 */
SailorIO.Models.Supply.startSupply = function(builder) {
  builder.startObject(4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} posOffset
 */
SailorIO.Models.Supply.addPos = function(builder, posOffset) {
  builder.addFieldStruct(0, posOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {SailorIO.Models.SupplyTypes} assetId
 */
SailorIO.Models.Supply.addAssetId = function(builder, assetId) {
  builder.addFieldInt8(1, assetId, SailorIO.Models.SupplyTypes.CRATE1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {boolean} isDeath
 */
SailorIO.Models.Supply.addIsDeath = function(builder, isDeath) {
  builder.addFieldInt8(2, +isDeath, +false);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {boolean} isNew
 */
SailorIO.Models.Supply.addIsNew = function(builder, isNew) {
  builder.addFieldInt8(3, +isNew, +false);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.Supply.endSupply = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
SailorIO.Models.Ship = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.Ship}
 */
SailorIO.Models.Ship.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {SailorIO.Models.Ship=} obj
 * @returns {SailorIO.Models.Ship}
 */
SailorIO.Models.Ship.getRootAsShip = function(bb, obj) {
  return (obj || new SailorIO.Models.Ship).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {SailorIO.Models.Vec3=} obj
 * @returns {SailorIO.Models.Vec3|null}
 */
SailorIO.Models.Ship.prototype.pos = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? (obj || new SailorIO.Models.Vec3).__init(this.bb_pos + offset, this.bb) : null;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.viewAngle = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.Id = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {SailorIO.Models.ShipTypes}
 */
SailorIO.Models.Ship.prototype.assetType = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? /** @type {SailorIO.Models.ShipTypes} */ (this.bb.readInt8(this.bb_pos + offset)) : SailorIO.Models.ShipTypes.RAFT1;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.captainUserId = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.currentSuppliesCount = function() {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.currentSailorsCount = function() {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.currentHealth = function() {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.slopeSpeed = function() {
  var offset = this.bb.__offset(this.bb_pos, 20);
  return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.rotationSpeed = function() {
  var offset = this.bb.__offset(this.bb_pos, 22);
  return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
};

/**
 * @returns {number}
 */
SailorIO.Models.Ship.prototype.movementSpeed = function() {
  var offset = this.bb.__offset(this.bb_pos, 24);
  return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
SailorIO.Models.Ship.startShip = function(builder) {
  builder.startObject(11);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} posOffset
 */
SailorIO.Models.Ship.addPos = function(builder, posOffset) {
  builder.addFieldStruct(0, posOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} viewAngle
 */
SailorIO.Models.Ship.addViewAngle = function(builder, viewAngle) {
  builder.addFieldFloat32(1, viewAngle, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} Id
 */
SailorIO.Models.Ship.addId = function(builder, Id) {
  builder.addFieldInt32(2, Id, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {SailorIO.Models.ShipTypes} assetType
 */
SailorIO.Models.Ship.addAssetType = function(builder, assetType) {
  builder.addFieldInt8(3, assetType, SailorIO.Models.ShipTypes.RAFT1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} captainUserId
 */
SailorIO.Models.Ship.addCaptainUserId = function(builder, captainUserId) {
  builder.addFieldInt32(4, captainUserId, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} currentSuppliesCount
 */
SailorIO.Models.Ship.addCurrentSuppliesCount = function(builder, currentSuppliesCount) {
  builder.addFieldInt32(5, currentSuppliesCount, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} currentSailorsCount
 */
SailorIO.Models.Ship.addCurrentSailorsCount = function(builder, currentSailorsCount) {
  builder.addFieldInt32(6, currentSailorsCount, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} currentHealth
 */
SailorIO.Models.Ship.addCurrentHealth = function(builder, currentHealth) {
  builder.addFieldInt32(7, currentHealth, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} slopeSpeed
 */
SailorIO.Models.Ship.addSlopeSpeed = function(builder, slopeSpeed) {
  builder.addFieldFloat32(8, slopeSpeed, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} rotationSpeed
 */
SailorIO.Models.Ship.addRotationSpeed = function(builder, rotationSpeed) {
  builder.addFieldFloat32(9, rotationSpeed, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} movementSpeed
 */
SailorIO.Models.Ship.addMovementSpeed = function(builder, movementSpeed) {
  builder.addFieldFloat32(10, movementSpeed, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.Ship.endShip = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
SailorIO.Models.WorldInfoTable = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.WorldInfoTable}
 */
SailorIO.Models.WorldInfoTable.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {SailorIO.Models.WorldInfoTable=} obj
 * @returns {SailorIO.Models.WorldInfoTable}
 */
SailorIO.Models.WorldInfoTable.getRootAsWorldInfoTable = function(bb, obj) {
  return (obj || new SailorIO.Models.WorldInfoTable).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.userSlotId = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.height = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.width = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.length = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.offSetX = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.offSetZ = function() {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.WorldInfoTable.prototype.offSetY = function() {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
SailorIO.Models.WorldInfoTable.startWorldInfoTable = function(builder) {
  builder.startObject(7);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} userSlotId
 */
SailorIO.Models.WorldInfoTable.addUserSlotId = function(builder, userSlotId) {
  builder.addFieldInt32(0, userSlotId, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} height
 */
SailorIO.Models.WorldInfoTable.addHeight = function(builder, height) {
  builder.addFieldInt32(1, height, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} width
 */
SailorIO.Models.WorldInfoTable.addWidth = function(builder, width) {
  builder.addFieldInt32(2, width, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} length
 */
SailorIO.Models.WorldInfoTable.addLength = function(builder, length) {
  builder.addFieldInt32(3, length, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} offSetX
 */
SailorIO.Models.WorldInfoTable.addOffSetX = function(builder, offSetX) {
  builder.addFieldInt32(4, offSetX, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} offSetZ
 */
SailorIO.Models.WorldInfoTable.addOffSetZ = function(builder, offSetZ) {
  builder.addFieldInt32(5, offSetZ, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} offSetY
 */
SailorIO.Models.WorldInfoTable.addOffSetY = function(builder, offSetY) {
  builder.addFieldInt32(6, offSetY, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.WorldInfoTable.endWorldInfoTable = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
SailorIO.Models.RemovePlayerInfoTable = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.RemovePlayerInfoTable}
 */
SailorIO.Models.RemovePlayerInfoTable.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {SailorIO.Models.RemovePlayerInfoTable=} obj
 * @returns {SailorIO.Models.RemovePlayerInfoTable}
 */
SailorIO.Models.RemovePlayerInfoTable.getRootAsRemovePlayerInfoTable = function(bb, obj) {
  return (obj || new SailorIO.Models.RemovePlayerInfoTable).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
SailorIO.Models.RemovePlayerInfoTable.prototype.userSlotId = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
SailorIO.Models.RemovePlayerInfoTable.startRemovePlayerInfoTable = function(builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} userSlotId
 */
SailorIO.Models.RemovePlayerInfoTable.addUserSlotId = function(builder, userSlotId) {
  builder.addFieldInt32(0, userSlotId, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.RemovePlayerInfoTable.endRemovePlayerInfoTable = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
SailorIO.Models.UpdateModel = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {SailorIO.Models.UpdateModel}
 */
SailorIO.Models.UpdateModel.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {SailorIO.Models.UpdateModel=} obj
 * @returns {SailorIO.Models.UpdateModel}
 */
SailorIO.Models.UpdateModel.getRootAsUpdateModel = function(bb, obj) {
  return (obj || new SailorIO.Models.UpdateModel).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {SailorIO.Models.EventTypes}
 */
SailorIO.Models.UpdateModel.prototype.eventType = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {SailorIO.Models.EventTypes} */ (this.bb.readInt8(this.bb_pos + offset)) : SailorIO.Models.EventTypes.UpdateModel;
};

/**
 * @returns {number}
 */
SailorIO.Models.UpdateModel.prototype.updatePassTime = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
SailorIO.Models.UpdateModel.prototype.updateTime = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} index
 * @param {SailorIO.Models.Supply=} obj
 * @returns {SailorIO.Models.Supply}
 */
SailorIO.Models.UpdateModel.prototype.supplyCrates = function(index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? (obj || new SailorIO.Models.Supply).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
SailorIO.Models.UpdateModel.prototype.supplyCratesLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @param {SailorIO.Models.Ship=} obj
 * @returns {SailorIO.Models.Ship}
 */
SailorIO.Models.UpdateModel.prototype.shipModels = function(index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? (obj || new SailorIO.Models.Ship).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
SailorIO.Models.UpdateModel.prototype.shipModelsLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {SailorIO.Models.WorldInfoTable=} obj
 * @returns {SailorIO.Models.WorldInfoTable|null}
 */
SailorIO.Models.UpdateModel.prototype.worldInfo = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? (obj || new SailorIO.Models.WorldInfoTable).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @param {SailorIO.Models.RemovePlayerInfoTable=} obj
 * @returns {SailorIO.Models.RemovePlayerInfoTable|null}
 */
SailorIO.Models.UpdateModel.prototype.removePlayerInfo = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? (obj || new SailorIO.Models.RemovePlayerInfoTable).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
SailorIO.Models.UpdateModel.startUpdateModel = function(builder) {
  builder.startObject(7);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {SailorIO.Models.EventTypes} eventType
 */
SailorIO.Models.UpdateModel.addEventType = function(builder, eventType) {
  builder.addFieldInt8(0, eventType, SailorIO.Models.EventTypes.UpdateModel);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} updatePassTime
 */
SailorIO.Models.UpdateModel.addUpdatePassTime = function(builder, updatePassTime) {
  builder.addFieldInt16(1, updatePassTime, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} updateTime
 */
SailorIO.Models.UpdateModel.addUpdateTime = function(builder, updateTime) {
  builder.addFieldFloat64(2, updateTime, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} supplyCratesOffset
 */
SailorIO.Models.UpdateModel.addSupplyCrates = function(builder, supplyCratesOffset) {
  builder.addFieldOffset(3, supplyCratesOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.UpdateModel.createSupplyCratesVector = function(builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
SailorIO.Models.UpdateModel.startSupplyCratesVector = function(builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} shipModelsOffset
 */
SailorIO.Models.UpdateModel.addShipModels = function(builder, shipModelsOffset) {
  builder.addFieldOffset(4, shipModelsOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.UpdateModel.createShipModelsVector = function(builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
SailorIO.Models.UpdateModel.startShipModelsVector = function(builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} worldInfoOffset
 */
SailorIO.Models.UpdateModel.addWorldInfo = function(builder, worldInfoOffset) {
  builder.addFieldOffset(5, worldInfoOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} removePlayerInfoOffset
 */
SailorIO.Models.UpdateModel.addRemovePlayerInfo = function(builder, removePlayerInfoOffset) {
  builder.addFieldOffset(6, removePlayerInfoOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
SailorIO.Models.UpdateModel.endUpdateModel = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
SailorIO.Models.UpdateModel.finishUpdateModelBuffer = function(builder, offset) {
  builder.finish(offset);
};

// Exports for Node.js and RequireJS
this.SailorIO = SailorIO;
