import React from 'react';
import type { Entity } from '../types';
import { encodeObjectSets, parseSimpleCheckeredTerrainObject } from '../util';
import { TILE_SIZE } from '../../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { objectSets } from './objectSets';

const CheckeredInnerCornerLowerLeft: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-checkered',
		title: 'Checkered Inner Corner - Lower Left',
	},

	layer: 'stage',
	editorType: 'cell',
	dimensions: 'none',
	param1: 'other',
	param2: 'other',
	objectId: 0x2e,
	emptyBank: 1,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x0,
				0x460c,
				0x5a91,
				0x6f35,
				0x7fdb,
				0x11b3,
				0x2a38,
				0x3abc,
				0x2260,
				0x2ac8,
				0x3b4c,
				0x47b0,
				0x2168,
				0x19f5,
			],
		],
		tiles: [
			[
				{
					romOffset: 1253344,
					tileIndex: 262,
				},
				502,
			],
			[478, 479],
		],
		romOffset: 1486172,
	},

	toObjectBinary({ x, y }) {
		// this is totally different from just about all objects
		// in the entire game
		// docs: https://github.com/city41/smaghetti/wiki/Checkered-terrain
		return [0x46, y, x, this.objectId, 1];
	},

	parseObject(data, offset) {
		return parseSimpleCheckeredTerrainObject(data, offset, 0x46, this);
	},

	simpleRender(size) {
		return (
			<div
				className="CheckeredInnerCornerLowerLeft-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render() {
		return this.simpleRender(TILE_SIZE);
	},
};

export { CheckeredInnerCornerLowerLeft };
