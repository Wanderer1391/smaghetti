import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ANY_BELOW_0x16, ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite, parseSimpleSpriteObjectIdOverride } from './util';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const GreenKoopaTroopa: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-common',
		title: 'Koopa Troopa - Green',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, ANY_BELOW_0x16],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6c,

	resource: {
		palettes: [
			[
				0x7f96,
				0x7fff,
				0x18c6,
				0x26b,
				0x1b10,
				0x13b4,
				0x25fd,
				0x369e,
				0x475f,
				0x1abf,
				0x1c,
				0x253f,
				0x463f,
				0x7ad1,
				0x6e2c,
				0x59a6,
			],
		],
		romOffset: 0x134104,
		tiles: [
			[258, 259],
			[290, 291],
			[322, 323],
			[354, 355],
		],
	},

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="GreenKoopaTroopa-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
			paddingTop: TILE_SIZE,
			backgroundPositionY: 2,
		};

		return (
			<div className="GreenKoopaTroopa-bg bg-cover bg-no-repeat" style={style}>
				<TileSpace />
			</div>
		);
	},

	parseSprite(data, offset) {
		// koopa troopa has an alternate version at [1, 0x18, x, y]
		// doesn't seem like we need that to be a full fledged entity in smaghetti,
		// as sprites are pretty universal, so if we hit that alternate version, we'll
		// just turn it into GreenKoopaTroopa
		return (
			parseSimpleSprite(data, offset, 0, this) ??
			parseSimpleSpriteObjectIdOverride(data, offset, 1, 0x18, this)
		);
	},
};

export { GreenKoopaTroopa };
