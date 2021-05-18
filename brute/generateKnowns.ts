import * as path from 'path';
import * as fs from 'fs';
import without from 'lodash/without';

type ObjectSetRecord = Record<number, number[]>;

function processObjectDir(objectDirPath: string): ObjectSetRecord {
	const pngs = fs.readdirSync(objectDirPath).filter((f) => f.endsWith('.png'));

	function parseObjectPngFilename(
		filename: string
	): { objectSet: number; objectId: number } {
		// obj_0e_gfx_3_id_50.png
		const splits = filename.split('_');
		return {
			objectSet: parseInt(splits[1], 16),
			objectId: parseInt(splits[5], 16),
		};
	}

	return pngs.reduce<Record<number, number[]>>((building, png) => {
		const { objectSet, objectId } = parseObjectPngFilename(png);
		const objectIds = (building[objectSet] = building[objectSet] ?? []);
		objectIds.push(objectId);
		return building;
	}, {});
}

function processSpriteDir(spriteDirPath: string): ObjectSetRecord {
	const pngs = fs.readdirSync(spriteDirPath).filter((f) => f.endsWith('.png'));

	function parseSpritePngFilename(
		filename: string
	): { paramCount: number; objectId: number } {
		// gfx_00_00_00_00_00_00_params_01_01_id_1d.png

		//_id_18.png
		//01_id_0a.png
		//01_01_id_1d.png
		const paramSide = filename.split('_params_')[1];

		let paramCount = 0;

		if (paramSide[0] !== '_' && paramSide.split('_').length === 3) {
			paramCount = 1;
		}

		if (paramSide[0] !== '_' && paramSide.split('_').length === 4) {
			paramCount = 2;
		}

		const paramSideUnderscoreSplits = paramSide.split('_');
		const objectId = parseInt(
			paramSideUnderscoreSplits[paramSideUnderscoreSplits.length - 1],
			16
		);

		return {
			paramCount,
			objectId,
		};
	}

	return pngs.reduce<ObjectSetRecord>((building, png) => {
		const { paramCount, objectId } = parseSpritePngFilename(png);
		const byteSize = 4 + paramCount;
		const objectIds = (building[byteSize] = building[byteSize] ?? []);
		objectIds.push(objectId);
		return building;
	}, {});
}

function filterLowerPriority(
	lower: ObjectSetRecord,
	higher: ObjectSetRecord
): ObjectSetRecord {
	Object.keys(lower).forEach((objectSetKeyStr) => {
		const objectSetKey = parseInt(objectSetKeyStr);

		if (higher[objectSetKey]) {
			const lowerObjectIds = lower[objectSetKey];
			const higherObjectIds = higher[objectSetKey];

			lower[objectSetKey] = without(lowerObjectIds, ...higherObjectIds);
		}
	});

	return lower;
}

const TS_TEMPLATE = `
// generated by ${__filename}
export const knownFourByteBank0ObjectIds: Record<number, number[]> = KNOWN_FOUR_BYTE_BANK0_OBJECT_IDS;

export const knownFourByteBank1ObjectIds: Record<number, number[]> = KNOWN_FOUR_BYTE_BANK1_OBJECT_IDS;

export const knownFiveByteBank1ObjectIds: Record<number, number[]> = KNOWN_FIVE_BYTE_BANK1_OBJECT_IDS;

export const knownBank0SpriteIds: Record<number, number[]> = KNOWN_BANK0_SPRITE_IDS;

export const knownBank1SpriteIds: Record<number, number[]> = KNOWN_BANK1_SPRITE_IDS;
`;

function writeTsFile({
	fourByteBank0Objects,
	fourByteBank1Objects,
	fiveByteBank1Objects,
	spritesBank0,
	spritesBank1,
}: {
	fourByteBank0Objects: ObjectSetRecord;
	fourByteBank1Objects: ObjectSetRecord;
	fiveByteBank1Objects: ObjectSetRecord;
	spritesBank0: ObjectSetRecord;
	spritesBank1: ObjectSetRecord;
}) {
	const code = TS_TEMPLATE.replace(
		'KNOWN_FOUR_BYTE_BANK0_OBJECT_IDS',
		JSON.stringify(fourByteBank0Objects, null, 2)
	)
		.replace(
			'KNOWN_FOUR_BYTE_BANK1_OBJECT_IDS',
			JSON.stringify(fourByteBank1Objects, null, 2)
		)
		.replace(
			'KNOWN_FIVE_BYTE_BANK1_OBJECT_IDS',
			JSON.stringify(fiveByteBank1Objects, null, 2)
		)
		.replace('KNOWN_BANK0_SPRITE_IDS', JSON.stringify(spritesBank0, null, 2))
		.replace('KNOWN_BANK1_SPRITE_IDS', JSON.stringify(spritesBank1, null, 2));

	fs.writeFileSync(
		'/home/matt/dev/smaghetti/src/levelData/knownIds/generated_knownIds.ts',
		code
	);
}

/**
 * this is not a general purpose script. It assumes there is a set of files
 * from brute forcing in directories named this:
 *
 * fiveByteBank1Objects
 * fourByteBank0Objects
 * fourByteBank1Objects
 * spritesBank0
 * spritesBank1
 */
function main(rootDir: string) {
	const fourByteBank0Objects = processObjectDir(
		path.join(rootDir, 'fourByteBank0Objects/results_bank0_4bytes___uniques')
	);

	const fourByteBank1Objects = processObjectDir(
		path.join(rootDir, 'fourByteBank1Objects/results_bank1_4bytes___uniques')
	);

	const fiveByteBank1Objects = processObjectDir(
		path.join(rootDir, 'fiveByteBank1Objects/results_bank1_5bytes___uniques')
	);

	const finalFiveByteBank1Objects = filterLowerPriority(
		fiveByteBank1Objects,
		fourByteBank1Objects
	);

	const spritesBank0 = processSpriteDir(
		path.join(rootDir, 'spritesBank0/results_sprites_bank0___uniques')
	);
	const spritesBank1 = processSpriteDir(
		path.join(rootDir, 'spritesBank1/results_sprites_bank1___uniques')
	);

	writeTsFile({
		fourByteBank0Objects,
		fourByteBank1Objects,
		fiveByteBank1Objects: finalFiveByteBank1Objects,
		spritesBank0,
		spritesBank1,
	});
}

const rootDir = process.argv[2];

if (!rootDir) {
	console.error('usage: node generateKnowns <root-dir>');
	process.exit(1);
}

main(rootDir);
