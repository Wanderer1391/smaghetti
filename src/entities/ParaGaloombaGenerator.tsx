import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { TileSpace } from './TileSpace';
import { GiFactory } from 'react-icons/gi';

const ParaGaloombaGenerator: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-generator',
		title: 'Para Galoomba Generator',
		description: 'Will turn on when Mario is to the right and above it',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, 0, -1, -1, 6],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x6d,

	toSpriteBinary(x, y) {
		if (x % 2 === 1) {
			// if not at an even x, don't emit it, otherwise it will
			// be a bobomb generator. The user gets a warning so it's ok
			// to emit nothing here
			return [];
		}

		return [1, this.objectId, x, y, 5];
	},

	simpleRender(size) {
		return (
			<div
				className="relative GaloombaWithParachute-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: '50% 100%',
				}}
			>
				<GiFactory className="absolute bottom-0 right-0 p-0.5 bg-green-600 text-white text-xl rounded" />
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
			marginTop: -TILE_SIZE,
		};

		const spaceStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			top: TILE_SIZE,
		};

		const labelStyle = {
			fontSize: 2,
			width: TILE_SIZE / 2.5,
			height: TILE_SIZE / 2.5,
			padding: 1,
		};

		return (
			<div style={style} className="relative GaloombaWithParachute-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute" />
				<GiFactory
					style={labelStyle}
					className="absolute bottom-0 right-0 bg-green-600 text-white rounded-sm"
					title="generator"
				/>
			</div>
		);
	},

	getWarning(_settings, entity, room) {
		const player = room.actors.entities.find((e) => e.type === 'Player')!;

		const px = player.x / TILE_SIZE;
		const tx = entity.x / TILE_SIZE;
		const diff = tx - Math.max(px, 2);

		if (diff < 15) {
			const delta = 15 - diff;
			return `Must be ${delta} more tiles to the right of Mario's starting position to work`;
		}

		if (tx % 2 === 1) {
			return 'Must be placed on an even x tile';
		}
	},
};

export { ParaGaloombaGenerator };
