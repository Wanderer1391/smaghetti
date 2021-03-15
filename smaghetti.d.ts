type Bounds = {
	upperLeft: Point;
	lowerRight: Point;
};

type IDable = { id: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntitySettings = Record<string, any>;

type NewEntity = {
	x: number;
	y: number;
	type: import('./src/entities/entityMap_generated').EntityType;
	disableDrag?: boolean;
	settings?: EntitySettings;
};

type Entity = NewEntity & IDable;

type NewTile = {
	x: number;
	y: number;
	tileType: import('./src/tiles/constants').TileType;
	tileIndex: number;
	entityGroupId?: number;
	entitySettings?: EntitySettings;
};

type Tile = NewTile & IDable;

type TileEntity = Entity & { tileIndices: number[] };

type Point = {
	x: number;
	y: number;
};

type TileMatrix = Array<null | Array<null | Tile>>;

type TileLayer = {
	width: number;
	height: number;
	data: TileMatrix;
};

// the string is the short id for the tile type, ie "metal" -> "me"
type SerializedTileMatrix = Array<string | Array<string>>;

type SerializedTileLayer = {
	width: number;
	height: number;
	data: SerializedTileMatrix;
};

type LevelData = {
	entities: Entity[];
	tileLayer: TileLayer;
};

type SerializedTileEntity = {
	x: number;
	y: number;
	s: EntitySettings;
};

type SerializedLevelData = Omit<LevelData, 'tileLayer'> & {
	tileLayer: SerializedTileLayer;
	tileEntities: SerializedTileEntity[];
};

type LevelPlaySession = {
	user: User;
	duration: number;
	cleared: boolean;
	deaths: number;
	created_at: string;
};

type NewLevel = {
	name: string;
	data: LevelData;
	created_at: string;
	level_play_sessions: LevelPlaySession[];
};

type Level = NewLevel & { id: string };

type SerializedLevel = Omit<Level, 'data'> & { data: SerializedLevelData };

type User = { id: string; username: string };
