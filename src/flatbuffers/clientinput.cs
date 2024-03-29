// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace SailorIO.ClientInputModel
{

using global::System;
using global::FlatBuffers;

public enum ClientEventTypes : byte
{
 NONE = 0,
 GetWorldInfo = 1,
 NewPlayer = 2,
 BuyNewShip = 3,
 SailShip = 4,
 FeedShip = 5,
};

public enum ShipTypes : sbyte
{
 RAFT1 = 0,
};

public struct Vec3 : IFlatbufferObject
{
  private Struct __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public Vec3 __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public float X { get { return __p.bb.GetFloat(__p.bb_pos + 0); } }
  public float Y { get { return __p.bb.GetFloat(__p.bb_pos + 4); } }
  public float Z { get { return __p.bb.GetFloat(__p.bb_pos + 8); } }

  public static Offset<Vec3> CreateVec3(FlatBufferBuilder builder, float X, float Y, float Z) {
    builder.Prep(4, 12);
    builder.PutFloat(Z);
    builder.PutFloat(Y);
    builder.PutFloat(X);
    return new Offset<Vec3>(builder.Offset);
  }
};

public struct BuyNewShip : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static BuyNewShip GetRootAsBuyNewShip(ByteBuffer _bb) { return GetRootAsBuyNewShip(_bb, new BuyNewShip()); }
  public static BuyNewShip GetRootAsBuyNewShip(ByteBuffer _bb, BuyNewShip obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public BuyNewShip __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public ShipTypes Ship { get { int o = __p.__offset(4); return o != 0 ? (ShipTypes)__p.bb.GetSbyte(o + __p.bb_pos) : ShipTypes.RAFT1; } }

  public static Offset<BuyNewShip> CreateBuyNewShip(FlatBufferBuilder builder,
      ShipTypes ship = ShipTypes.RAFT1) {
    builder.StartObject(1);
    BuyNewShip.AddShip(builder, ship);
    return BuyNewShip.EndBuyNewShip(builder);
  }

  public static void StartBuyNewShip(FlatBufferBuilder builder) { builder.StartObject(1); }
  public static void AddShip(FlatBufferBuilder builder, ShipTypes ship) { builder.AddSbyte(0, (sbyte)ship, 0); }
  public static Offset<BuyNewShip> EndBuyNewShip(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<BuyNewShip>(o);
  }
};

public struct SailShip : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static SailShip GetRootAsSailShip(ByteBuffer _bb) { return GetRootAsSailShip(_bb, new SailShip()); }
  public static SailShip GetRootAsSailShip(ByteBuffer _bb, SailShip obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public SailShip __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }


  public static void StartSailShip(FlatBufferBuilder builder) { builder.StartObject(0); }
  public static Offset<SailShip> EndSailShip(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<SailShip>(o);
  }
};

public struct GetWorldInfo : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static GetWorldInfo GetRootAsGetWorldInfo(ByteBuffer _bb) { return GetRootAsGetWorldInfo(_bb, new GetWorldInfo()); }
  public static GetWorldInfo GetRootAsGetWorldInfo(ByteBuffer _bb, GetWorldInfo obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public GetWorldInfo __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }


  public static void StartGetWorldInfo(FlatBufferBuilder builder) { builder.StartObject(0); }
  public static Offset<GetWorldInfo> EndGetWorldInfo(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<GetWorldInfo>(o);
  }
};

public struct NewPlayer : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static NewPlayer GetRootAsNewPlayer(ByteBuffer _bb) { return GetRootAsNewPlayer(_bb, new NewPlayer()); }
  public static NewPlayer GetRootAsNewPlayer(ByteBuffer _bb, NewPlayer obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public NewPlayer __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public string AccessToken { get { int o = __p.__offset(4); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
  public ArraySegment<byte>? GetAccessTokenBytes() { return __p.__vector_as_arraysegment(4); }

  public static Offset<NewPlayer> CreateNewPlayer(FlatBufferBuilder builder,
      StringOffset accessTokenOffset = default(StringOffset)) {
    builder.StartObject(1);
    NewPlayer.AddAccessToken(builder, accessTokenOffset);
    return NewPlayer.EndNewPlayer(builder);
  }

  public static void StartNewPlayer(FlatBufferBuilder builder) { builder.StartObject(1); }
  public static void AddAccessToken(FlatBufferBuilder builder, StringOffset accessTokenOffset) { builder.AddOffset(0, accessTokenOffset.Value, 0); }
  public static Offset<NewPlayer> EndNewPlayer(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<NewPlayer>(o);
  }
};

public struct FeedShip : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static FeedShip GetRootAsFeedShip(ByteBuffer _bb) { return GetRootAsFeedShip(_bb, new FeedShip()); }
  public static FeedShip GetRootAsFeedShip(ByteBuffer _bb, FeedShip obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public FeedShip __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public Vec3? SupplyPos { get { int o = __p.__offset(4); return o != 0 ? (Vec3?)(new Vec3()).__assign(o + __p.bb_pos, __p.bb) : null; } }
  public int ShipId { get { int o = __p.__offset(6); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }

  public static void StartFeedShip(FlatBufferBuilder builder) { builder.StartObject(2); }
  public static void AddSupplyPos(FlatBufferBuilder builder, Offset<Vec3> supplyPosOffset) { builder.AddStruct(0, supplyPosOffset.Value, 0); }
  public static void AddShipId(FlatBufferBuilder builder, int shipId) { builder.AddInt(1, shipId, 0); }
  public static Offset<FeedShip> EndFeedShip(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<FeedShip>(o);
  }
};

public struct ClientInput : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static ClientInput GetRootAsClientInput(ByteBuffer _bb) { return GetRootAsClientInput(_bb, new ClientInput()); }
  public static ClientInput GetRootAsClientInput(ByteBuffer _bb, ClientInput obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p.bb_pos = _i; __p.bb = _bb; }
  public ClientInput __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public ClientEventTypes EventType { get { int o = __p.__offset(4); return o != 0 ? (ClientEventTypes)__p.bb.Get(o + __p.bb_pos) : ClientEventTypes.NONE; } }
  public TTable? Event<TTable>() where TTable : struct, IFlatbufferObject { int o = __p.__offset(6); return o != 0 ? (TTable?)__p.__union<TTable>(o) : null; }

  public static Offset<ClientInput> CreateClientInput(FlatBufferBuilder builder,
      ClientEventTypes Event_type = ClientEventTypes.NONE,
      int EventOffset = 0) {
    builder.StartObject(2);
    ClientInput.AddEvent(builder, EventOffset);
    ClientInput.AddEventType(builder, Event_type);
    return ClientInput.EndClientInput(builder);
  }

  public static void StartClientInput(FlatBufferBuilder builder) { builder.StartObject(2); }
  public static void AddEventType(FlatBufferBuilder builder, ClientEventTypes EventType) { builder.AddByte(0, (byte)EventType, 0); }
  public static void AddEvent(FlatBufferBuilder builder, int EventOffset) { builder.AddOffset(1, EventOffset, 0); }
  public static Offset<ClientInput> EndClientInput(FlatBufferBuilder builder) {
    int o = builder.EndObject();
    return new Offset<ClientInput>(o);
  }
  public static void FinishClientInputBuffer(FlatBufferBuilder builder, Offset<ClientInput> offset) { builder.Finish(offset.Value); }
};


}
