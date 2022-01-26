import React, { useEffect, useState } from 'react';
import { ECoinsPage, PublicECoinsPageProps } from './ECoinsPage';
import { client } from '../../../remoteData/client';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { CategoryUserOrder } from '../../levels/Levels2Page/categories';
import { ECoinTileData } from '../../../entities/ECoin/ECoinData';
import isEqual from 'lodash/isEqual';

type LoadingState = 'loading' | 'error' | 'success';

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & {
	username: string;
	total_vote_count: number;
};

const PAGE_SIZE = 20;

const userOrderToOrderColumn: Record<CategoryUserOrder, string> = {
	newest: 'updated_at',
	popular: 'total_vote_count',
};

// for now, not paging, need to figure out how to only get custom coins from the db
async function getLevels(
	_page: number,
	order: CategoryUserOrder
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	const { error, data, count } = await client
		.rpc('get_published_levels_that_have_ecoins', {}, { count: 'exact' })
		// .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
		.order(userOrderToOrderColumn[order], { ascending: false });

	if (error) {
		throw error;
	}

	return { levels: data ?? [], totalCount: count ?? 0 };
}

function isCustomECoin(data: number[] | undefined): boolean {
	if (!data) {
		return false;
	}

	return !isEqual(data, ECoinTileData);
}

function hasCustomECoin(level: Level): boolean {
	let eCoinEntity;

	for (let i = 0; i < level.data.rooms.length; ++i) {
		eCoinEntity = level.data.rooms[i].stage.entities.find(
			(e) => e.type === 'ECoin'
		);

		if (eCoinEntity) {
			return isCustomECoin(
				eCoinEntity?.settings?.coinData as number[] | undefined
			);
		}
	}

	return false;
}

function ConnectedECoinsPage(props: PublicECoinsPageProps) {
	const [page, setPage] = useState(0);
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<Level[]>([]);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		setPage(0);
		setLevels([]);
		setLoadingState('loading');
	}, [props.currentOrder]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(page, props.currentOrder)
			.then(({ levels: retrievedLevels, totalCount: retrievedTotalCount }) => {
				const convertedLevels = retrievedLevels.reduce<Level[]>(
					(building, rawLevel) => {
						const serializedLevel = {
							...rawLevel,
							user: {
								username: rawLevel.username,
							},
						};

						const convertedLevel = convertLevelToLatestVersion(serializedLevel);

						if (convertedLevel) {
							const level: Level = {
								...convertedLevel,
								data: deserialize(convertedLevel.data),
							};

							if (hasCustomECoin(level)) {
								return building.concat(level);
							} else {
								return building;
							}
						} else {
							return building;
						}
					},
					[]
				);

				setLevels(convertedLevels);
				setTotalCount(retrievedTotalCount);
				setLoadingState('success');
			})
			.catch(() => {
				setLoadingState('error');
			});
	}, [page, props.currentOrder, setLoadingState]);

	return (
		<ECoinsPage
			{...props}
			loadingState={loadingState}
			levels={levels}
			totalCount={totalCount}
			pageSize={PAGE_SIZE}
			currentPage={page}
			onPreviousClick={() => {
				setPage((p) => Math.max(0, p - 1));
			}}
			onNextClick={() => {
				setPage((p) => p + 1);
			}}
		/>
	);
}

export { ConnectedECoinsPage };
