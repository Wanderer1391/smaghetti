import { TilePage } from '../../tiles/extractCompressedTilesFromRom';

export type BaseRomSection = {
	label?: string;
	start: number;
	size: number;
};

export type CompressedTilesRomSection = BaseRomSection & {
	type: 'compressed-tiles';
	page: TilePage;
};

export type LevelObjectsRomSection = BaseRomSection & {
	type: 'level-objects';
};

export type LevelSpritesRomSection = BaseRomSection & {
	type: 'level-sprites';
};

export type LevelNameTableSection = BaseRomSection & {
	type: 'level-name-table';
};

export type CompressELevelSection = BaseRomSection & {
	type: 'compressed-e-level';
};

export type ECoinSection = BaseRomSection & {
	type: 'e-coin';
};

export type RomSection =
	| CompressedTilesRomSection
	| LevelObjectsRomSection
	| LevelSpritesRomSection
	| LevelNameTableSection
	| CompressELevelSection
	| ECoinSection;
export type RomSectionType = RomSection['type'];
