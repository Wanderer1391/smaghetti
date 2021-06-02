import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { TransportSource } from '../components/Transport/TransportSource';
import { TransportEditDetails } from '../components/details/TransportEditDetails';
import { encodeObjectSets } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const DOOR_LOCK_OBJECT_ID = 0xce;

const SimpleBlackDoor: Entity = {
	paletteCategory: 'transport',
	paletteInfo: {
		title: 'Simple Black Door',
	},

	objectSets: encodeObjectSets([
		[2, 0],
		[2, 10],
		[2, 11],
		[2, 12],
		[2, 13],
		[2, 14],
		[2, 15],
		[2, 1],
		[2, 2],
		[2, 3],
		[2, 4],
		[2, 5],
		[2, 6],
		[2, 8],
		[2, 9],
	]),
	// this is for the lock sprite, which truly is universal
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x5,
	width: 1,
	height: 2,

	resource: {
		palette: [
			0x23df,
			0x7fff,
			0x0,
			0x4e71,
			0x5ef5,
			0x6f79,
			0x7bdd,
			0x13,
			0x19,
			0x1f,
			0x112,
			0x5a1f,
			0x6ebf,
			0x7f9f,
			0x579f,
			0x6fff,
		],
		romOffset: 0x16ad5c,
		tiles: [
			[{ tileIndex: 474 }, { tileIndex: 474, flip: 'h' }],
			[{ tileIndex: 475 }, { tileIndex: 475, flip: 'h' }],
			[{ tileIndex: 475 }, { tileIndex: 475, flip: 'h' }],
			[
				{ tileIndex: 474, flip: 'v' },
				{ tileIndex: 474, flip: 'hv' },
			],
		],
	},

	getTransports(room, _rooms, x, y, settings) {
		const dest = settings.destination;

		if (dest) {
			return [
				{
					destRoom: dest.room as number,
					destX: dest.x as number,
					destY: dest.y as number,
					x,
					y,
					room,
					exitCategory: 'door',
					exitType: 'door',
				},
			];
		}

		return [];
	},

	toObjectBinary(x, y) {
		return [0x40, y, x, this.objectId];
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		if (settings.locked) {
			return [0, DOOR_LOCK_OBJECT_ID, x, y];
		} else {
			return [];
		}
	},

	simpleRender(size) {
		const style = {
			width: size,
			height: size,
			backgroundSize: '50% 100%',
		};

		return (
			<div
				className="SimpleBlackDoor-bg bg-center bg-no-repeat"
				style={style}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const style = {
			width: TILE_SIZE,
			height: TILE_SIZE * 2,
		};

		const body = (
			<div
				className="relative SimpleBlackDoor-bg bg-cover bg-no-repeat"
				style={style}
			>
				<TileSpace />
				{settings.locked && (
					<div
						className="DoorLock-bg absolute left-0 top-3"
						style={{ width: TILE_SIZE / 2, height: TILE_SIZE }}
					/>
				)}
				{settings.destination && (
					<TransportSource
						className="absolute top-0 left-0"
						destRoom={settings.destination.room}
						destX={settings.destination.x}
						destY={settings.destination.y}
						exitCategory="door"
					/>
				)}
			</div>
		);

		if (showDetails) {
			return (
				<TransportEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE * 2}
					onDestinationSet={(newDestination) => {
						onSettingsChange({ ...settings, destination: newDestination });
					}}
					locked={!!settings.locked}
					onLockChange={(locked) => {
						onSettingsChange({ ...settings, locked });
					}}
				>
					{body}
				</TransportEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { SimpleBlackDoor };
