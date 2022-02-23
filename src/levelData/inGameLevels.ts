type InGameLevel = {
	name?: string;
	root?: number;
	sprites?: number;
};

type LoadableInGameLevel = Required<Omit<InGameLevel, 'sprites'>> &
	Pick<InGameLevel, 'sprites'>;

const potentialSpriteStarts = [
	{ offset: 0x15701c },
	{ offset: 0x15701e },
	{ offset: 0x157022 },
	{ offset: 0x157024 },
	{ offset: 0x157026 },
	{ offset: 0x157028 },
	{ offset: 0x15702a },
	{ offset: 0x15702c },
	{ offset: 0x15702e },
	{ offset: 0x157030 },
	{ offset: 0x157032 },
	{ offset: 0x157034 },
	{ offset: 0x157036 },
	{ offset: 0x157038 },
	{ offset: 0x15703a },
	{ offset: 0x157040 },
	{ offset: 0x157046 },
	{ offset: 0x157058 },
	{ offset: 0x15706a },
	{ offset: 0x157070 },
	{ offset: 0x1570b2 },
	{ offset: 0x1570c0 },
	{ offset: 0x1570c2 },
	{ offset: 0x1570c4 },
	{ offset: 0x1570c6 },
	{ offset: 0x1570c8 },
	{ offset: 0x1570ca },
	{ offset: 0x1570e4 },
	{ offset: 0x1570ee },
	{ offset: 0x15715c },
	{ offset: 0x157162 },
	{ offset: 0x157168 },
	{ offset: 0x15716e },
	{ offset: 0x157174 },
	{ offset: 0x15717a },
	{ offset: 0x157180 },
	{ offset: 0x157186 },
	{ offset: 0x15718c },
	{ offset: 0x157192 },
	{ offset: 0x157198 },
	{ offset: 0x15719e },
	{ offset: 0x1571a4 },
	{ offset: 0x1571aa },
	{ offset: 0x1571b0 },
	{ offset: 0x1571b6 },
	{ offset: 0x1571bc },
	{ offset: 0x1571c2 },
	{ offset: 0x1571c8 },
	{ offset: 0x1571ce },
	{ offset: 0x1571d4 },
	{ offset: 0x1571da },
	{ offset: 0x1571e0 },
	{ offset: 0x1571e6 },
	{ offset: 0x157200 },
	{ offset: 0x157269 },
	{ offset: 0x15726f },
	{ offset: 0x1572ad },
	{ offset: 0x157317 },
	// skipped: this is more likely 7-1 Outside Area
	{ offset: 0x157351, name: '7-1' },
	// skipped: have low confidence in 7-7 in general
	{ offset: 0x157361, name: '7-7' },
	{ offset: 0x1573db },
	{ offset: 0x15748f },
	{ offset: 0x157499 },
	{ offset: 0x1575ac },
	// skipped: have low confidence in 7-4 in general
	{ offset: 0x1575b8, name: '7-4' },
	{ offset: 0x157646 },
	{ offset: 0x157665 },
	{ offset: 0x157773 },
	{ offset: 0x157779 },
	{ offset: 0x1577c3 },
	{ offset: 0x15785b },
	{ offset: 0x157867 },
	{ offset: 0x157889 },
	{ offset: 0x157899 },
	{ offset: 0x1578c1 },
	{ offset: 0x1578c7 },
	{ offset: 0x157933 },
	{ offset: 0x157966 },
	{ offset: 0x1579d7 },
	{ offset: 0x1579e5 },
	{ offset: 0x157aff },
	{ offset: 0x157b71 },
	{ offset: 0x157ba3 },
	{ offset: 0x157bb1 },
	{ offset: 0x157bd3 },
	{ offset: 0x157c09 },
	{ offset: 0x157c63 },
	{ offset: 0x157c8d },
	{ offset: 0x157d01 },
	// skipped: 5-2 objects don't parse well
	{ offset: 0x157dad, name: '5-2' },
	{ offset: 0x157ec9 },
	{ offset: 0x157ee1 },
	{ offset: 0x157ee3 },
	{ offset: 0x157ee9 },
	{ offset: 0x157f0f },
	{ offset: 0x157f25 },
	{ offset: 0x157f2f },
	{ offset: 0x157f49 },
	{ offset: 0x157f77 },
	{ offset: 0x15805b },
	{ offset: 0x158093 },
	{ offset: 0x158135 },
	// skipped: 6-5 objects don't parse well
	{ offset: 0x15813b, name: '6-5' },
	{ offset: 0x158155 },
	{ offset: 0x1581d5 },
	{ offset: 0x1581e7 },
	{ offset: 0x158247 },
	{ offset: 0x1582bb },
	{ offset: 0x1582e9 },
	{ offset: 0x1583b5, name: 'unused level 7' },
	{ offset: 0x1583fb },
	// skipped: 6-6 objects don't parse well
	{ offset: 0x158409, name: '6-6' },
	{ offset: 0x158477 },
	// skipped: hmmm, doesn't seem right
	{ offset: 0x158481, name: '6-9' },
	{ offset: 0x15848b },
	{ offset: 0x1584c6 },
	{ offset: 0x158518 },
	{ offset: 0x158580 },
	{ offset: 0x158641 },
	{ offset: 0x158687 },
	{ offset: 0x15869b },
	{ offset: 0x1586d3 },
	{ offset: 0x1586dd },
	{ offset: 0x158733 },
	// skipped: 4-3 objects don't parse well
	{ offset: 0x1587bf, name: '4-3' },
	{ offset: 0x1588c1 },
	// skipped: seems to be empty
	{ offset: 0x1588c7, name: '1-3 Bonus Area' },
	{ offset: 0x1588cd },
	{ offset: 0x1588d3 },
	{ offset: 0x1588e3 },
	{ offset: 0x158959 },
	// skipped: seems to be empty
	{ offset: 0x15895f, name: '1-5 Bonus Area' },
	{ offset: 0x158965 },
	{ offset: 0x1589b2 },
	{ offset: 0x1589e4 },
	{ offset: 0x158a1a },
	{ offset: 0x158a38 },
	{ offset: 0x158a54 },
	{ offset: 0x158a66 },
	{ offset: 0x158a74 },
	{ offset: 0x158a88 },
	{ offset: 0x158a9c },
	{ offset: 0x158aa6 },
	// skipped: doesn't seem correct
	{ offset: 0x158aac, name: '2-Pyramid' },
	{ offset: 0x158aca },
	// skipped
	{ offset: 0x158b74, name: '2-Hammer Bros.' },
	// skipped
	{ offset: 0x158b82, name: '2-Hammer Bros.' },
	{ offset: 0x158b8c },
	{ offset: 0x158de6 },
	{ offset: 0x158e04 },
	{ offset: 0x158e0a },
	// skipped: not sure what this is
	{ offset: 0x158e10, name: 'Castle Room' },
	// skipped: doesn't seem right
	{ offset: 0x158e16, name: '5-Fortress 2' },
	{ offset: 0x158e21 },
	{ offset: 0x158ea3 },
	{ offset: 0x158ec1 },
	// skipped: doesn't seem right
	{ offset: 0x158f23, name: '3-Fortress 2' },
	{ offset: 0x158f5d },
	// skipped: doesn't seem right
	{ offset: 0x158f88, name: '3-Fortress 1' },
	{ offset: 0x158fd5 },
	{ offset: 0x159055 },
	{ offset: 0x159060 },
	{ offset: 0x1590f8 },
	{ offset: 0x159161 },
	{ offset: 0x1591a6 },
	{ offset: 0x1591e9 },
	{ offset: 0x159203 },
	{ offset: 0x1592f8 },
	{ offset: 0x159357 },
	{ offset: 0x1593ea },
	{ offset: 0x15943e },
	// skipped: not sure which anchors away this is
	{ offset: 0x1594c4, name: 'Anchors Away' },
	{ offset: 0x1594ca },
	{ offset: 0x1594d0 },
	// skipped: 2-Airship objects don't parse well
	{ offset: 0x159564, name: '2-Airship' },
	{ offset: 0x1595ae },
	{ offset: 0x159600 },
	{ offset: 0x159662 },
	{ offset: 0x15969c },
	{ offset: 0x159706 },
	{ offset: 0x159774 },
	{ offset: 0x1597da },
	{ offset: 0x159848 },
	// skipped: seems empty
	{ offset: 0x1598c2, name: '1-Airship (boss room)' },
	// skipped: seems empty
	{ offset: 0x1598c8, name: '2-Airship (boss room)' },
	{ offset: 0x1598ce },
	{ offset: 0x1598d4 },
	{ offset: 0x1598da },
	{ offset: 0x1598e0 },
	{ offset: 0x1598e6 },
	{ offset: 0x1598f4 },
	// skipped: seems empty
	{ offset: 0x159902 },
	{ offset: 0x159908 },
	{ offset: 0x15990e },
	{ offset: 0x159914 },
	{ offset: 0x159922 },
	{ offset: 0x15995c },
];

const inGameLevels: InGameLevel[] = [
	{
		root: 0x1408c7,
		name: '1-1',
		sprites: 0x157811,
	},
	{ root: 0x141db8, name: '1-2', sprites: 0x157a93 },
	{ root: 0x13f7da, name: '1-3', sprites: 0x157451 },
	{ root: 0x145b80, name: '1-4', sprites: 0x158321 },
	{ root: 0x1432b4, name: '1-5', sprites: 0x157e5d },
	{ root: 0x145a11, name: '1-6', sprites: 0x1582ef },
	{ root: 0x14a99b, name: '1-Fortress', sprites: 0x158ecf },
	{ root: 0x14c9a2, name: '1-Airship', sprites: 0x159526 },
	{ root: 0x140a24, name: '1-1 Bonus Area' },
	{ root: 0x140690, name: '1-2 Bonus Area' },
	{ root: 0x14841d, name: '1-3 Bonus Area' },
	{ root: 0x140cbc, name: '1-4 Ending', sprites: 0x15788f },
	{ root: 0x14883f, name: '1-5 Bonus Area' },
	{
		root: 0x140b6c,
		name: '1-5 Ending, 5-2 Ending, 5-3 Ending',
		sprites: 0x157861,
	},
	{ root: 0x14aaac, name: '1-Fortress Spike Room', sprites: 0x158efe },
	{ root: 0x14d9be, name: '1-Airship Boss Room' },
	{ root: 0x142362, name: '1-Hammer Bros. 1', sprites: 0x157b67 },
	{ root: 0x142383, name: '1-Hammer Bros. 2' },
	{ root: 0x14a824, name: '1-Castle Room' },
	{ root: 0x14c7c8, name: '1-Anchors Away' },
	{ root: 0x14dac2, name: 'Coin Ship' },
	{ root: 0x14db9d, name: 'Coin Ship Boss Room' },
	{ root: 0x1498d2, name: '2-1', sprites: 0x158c0c },
	{ root: 0x142991, name: '2-2', sprites: 0x157d73 },
	{ root: 0x149dc3, name: '2-3', sprites: 0x158c94 },
	{ root: 0x14a247, name: '2-4', sprites: 0x158d8a },
	{
		root: 0x149b7a,
		name: '2-5',
		sprites: 0x158c56,
	},
	{ root: 0x149fdf, name: '2-Fortress', sprites: 0x158d24 },
	{
		root: 0x1425e8,
		name: '2-Desert',
		sprites: 0x157cd7,
	},
	{ root: 0x140f04, name: '2-Pyramid' },
	{ root: 0x14cae6, name: '2-Airship' },
	{ root: 0x149aaa, name: '2-1 Bonus Area' },
	{ root: 0x14a580, name: '2-2 Ending' },
	{ root: 0x14a594, name: '2-3 Ending' },
	{ root: 0x149d0b, name: '2-5 Bonus Area' },
	{ root: 0x14a1a3, name: '2-Fortress Spike Room', sprites: 0x158d77 },
	{ root: 0x1491ac, name: '2-Pyramid Outside' },
	{ root: 0x14d9de, name: '2-Airship Boss Room' },
	{ root: 0x1495b2, name: '2-Hammer Bros.' },
	{ root: 0x14a7c0, name: '2-Castle Room' },
	{ root: 0x14c788, name: '2-Anchors Away' },
	{ root: 0x14717f, name: '3-1', sprites: 0x158655 },
	{ root: 0x144c93, name: '3-2', sprites: 0x158015 },
	{ root: 0x140cf2, name: '3-3', sprites: 0x15789b },
	{ root: 0x144689, name: '3-4', sprites: 0x157f81 },
	{ root: 0x146e32, name: '3-5', sprites: 0x1585bb },
	{ root: 0x144e48, name: '3-6', sprites: 0x158069 },
	{ root: 0x140526, name: '3-7', sprites: 0x157711 },
	{ root: 0x143567, name: '3-8', sprites: 0x157eab },
	{ root: 0x13fb9a, name: '3-9', sprites: 0x157528 },
	{ root: 0x14ac78, name: '3-Fortress 1' },
	{ root: 0x14ab15, name: '3-Fortress 2' },
	{ root: 0x14ccb4, name: '3-Airship' },
	{ root: 0x140673, name: '3-1 Ending, 7-2 Ending' },
	{ root: 0x144db7, name: '3-2 Ending' },
	{ root: 0x140e53, name: '3-3 Ending' },
	{ root: 0x13f921, name: '3-5 Ending' },
	{ root: 0x144f50, name: '3-6 Ending' },
	{ root: 0x147b11, name: '3-7 Bonus Area' },
	{ root: 0x140b24, name: '3-8 Ending' },
	{ root: 0x143daa, name: '3-9 Bonus Area' },
	{ root: 0x13fe12, name: '3-9 Ending' },
	{ root: 0x14ad72, name: '3-Fortress 1 Water Room' },
	{ root: 0x14abe2, name: '3-Fortress 2 Water Room' },
	{ root: 0x14da0a, name: '3-Airship Boss Room' },
	{ root: 0x13fef9, name: '3-Hammer Bros. 1' },
	{ root: 0x13ff1a, name: '3-Hammer Bros. 2' },
	{ root: 0x140c2c, name: '3-Hammer Bros. 3' },
	{ root: 0x140c51, name: '3-Hammer Bros. 4' },
	{ root: 0x14a7d4, name: '3-Castle Room' },
	{ root: 0x14c7a8, name: '3-Anchors Away' },
	{ root: 0x147b42, name: '4-1', sprites: 0x1586ef },
	{ root: 0x147f8c, name: '4-2', sprites: 0x1587c9 },
	{ root: 0x142707, name: '4-3' },
	{ root: 0x1481d7, name: '4-4', sprites: 0x1588a7 },
	{ root: 0x148686, name: '4-5', sprites: 0x1588ed },
	{ root: 0x13f434, name: '4-6', sprites: 0x157371 },
	{ root: 0x14ba92, name: '4-Fortress 1', sprites: 0x159263 },
	{ root: 0x14b979, name: '4-Fortress 2', sprites: 0x159213 },
	{ root: 0x14ce4b, name: '4-Airship' },
	{ root: 0x148918, name: '4-1 Bonus Area' },
	{
		root: 0x140bcb,
		name: '4-1 Ending, 4-2 Ending, 4-3 Ending, 4-4 Ending, 4-5 Ending',
	},
	{ root: 0x147f1c, name: '4-3 Beginning' },
	{ root: 0x14075e, name: '4-4 Bonus Area' },
	{ root: 0x13f962, name: '4-5 Bonus Area' },
	{ root: 0x13f18c, name: '4-6 Small Side' },
	{ root: 0x143c13, name: '4-Fortress 1 Underground Room' },
	{ root: 0x1470b7, name: '4-Fortress 2 Pipe Room' },
	{ root: 0x143fda, name: '4-Fortress 2 Bonus Room' },
	{ root: 0x14c7e8, name: '4-Airship Boss Room' },
	{ root: 0x148fe7, name: '4-Hammer Bros.' },
	{ root: 0x14a7e8, name: '4-Castle Room' },
	{ root: 0x14d22b, name: '4-Anchors Away' },
	{ root: 0x13ff57, name: '5-1', sprites: 0x1575ce },
	{ root: 0x142cea, name: '5-2' },
	{ root: 0x13f581, name: '5-3' },
	{ root: 0x1489e7, name: '5-4', sprites: 0x158974 },
	{ root: 0x14550f, name: '5-5', sprites: 0x158197 },
	{ root: 0x1480b9, name: '5-6', sprites: 0x158807 },
	{ root: 0x147dee, name: '5-7', sprites: 0x15875d },
	{ root: 0x147a90, name: '5-8', sprites: 0x1586bd },
	{ root: 0x1481b7, name: '5-9', sprites: 0x158855 },
	{ root: 0x14ae91, name: '5-Fortress 1', sprites: 0x158ff7 },
	{ root: 0x14b7d5, name: '5-Tower Part 1' },
	{ root: 0x14b8ad, name: '5-Tower Part 2' },
	{ root: 0x14a8bb, name: '5-Fortress 2' },
	{ root: 0x14c82c, name: '5-Airship' },
	{ root: 0x140185, name: '5-1 Bonus Area' },
	{ root: 0x141209, name: '5-2 Bonus Area, 5-5 Bonus Area' },
	{ root: 0x147370, name: '5-2 Pipe Room' },
	{
		root: 0x13f3c0,
		name: '5-4 Ending, 5-6 Ending, 5-8 Ending, 5-9 Ending',
	},
	{ root: 0x13ed58, name: '5-7 Bonus Area' },
	{ root: 0x14b083, name: '5-Fortress 1 Bonus Area' },
	{ root: 0x148576, name: '5-Tower Outside Part 1' },
	{ root: 0x14852e, name: '5-Tower Outside Part 2' },
	{ root: 0x1484f6, name: '5-Tower Going Down' },
	{ root: 0x14a84c, name: '5-Fortress 2 Beginning/End' },
	{ root: 0x14da36, name: '5-Airship Boss Room' },
	{ root: 0x141a02, name: '5-Hammer Bros. 1' },
	{ root: 0x1423a8, name: '5-Hammer Bros. 2' },
	{ root: 0x148961, name: '5-Hammer Bros. 3' },
	{ root: 0x149034, name: '5-Hammer Bros. 4' },
	{ root: 0x14a7fc, name: '5-Castle Room' },
	{ root: 0x14d24b, name: '5-Anchors Away' },
	{ root: 0x145870, name: '6-1', sprites: 0x15828d },
	{ root: 0x145738, name: '6-2', sprites: 0x1581f9 },
	{ root: 0x144f8b, name: '6-3', sprites: 0x15809d },
	{ root: 0x145c88, name: '6-4', sprites: 0x15836f },
	{ root: 0x141354, name: '6-5' },
	{ root: 0x141a3d, name: '6-6' },
	{ root: 0x1461b8, name: '6-7', sprites: 0x158461 },
	{ root: 0x14489f, name: '6-8', sprites: 0x157fc3 },
	{ root: 0x141610, name: '6-9' },
	{ root: 0x146028, name: '6-10', sprites: 0x15841d },
	{ root: 0x14b3d6, name: '6-Fortress 1', sprites: 0x159173 },
	{ root: 0x1450cb, name: '6-Fortress 2', sprites: 0x1580e7 },
	{ root: 0x14b28d, name: '6-Fortress 3', sprites: 0x15911e },
	{ root: 0x14d03d, name: '6-Airship' },
	{ root: 0x146641, name: '6-1 Bonus Area' },
	{ root: 0x1459bf, name: '6-2 Ending' },
	{
		root: 0x1441f5,
		name: '6-3 Bonus Area, 6-9 Bonus Area, 6-10 Bonus Area',
	},
	{ root: 0x14880a, name: '6-4 Bonus Area' },
	{ root: 0x1452b3, name: '6-5 Outside Area' },
	{ root: 0x145fb3, name: '6-6 Outside Area' },
	{ root: 0x1463d0, name: '6-7 Ending' },
	{ root: 0x146421, name: '6-9 Outside Area' },
	{ root: 0x14b4be, name: '6-Fortress 1 Spike Room' },
	{ root: 0x14522f, name: '6-Fortress 2 Boss Room' },
	{ root: 0x14b3b5, name: '6-Fortress 3 Falling Room' },
	{ root: 0x14da5a, name: '6-Airship Boss Room' },
	{ root: 0x146629, name: '6-Hammer Bros. 1' },
	{ root: 0x1466b9, name: '6-Hammer Bros. 2' },
	{ root: 0x14a810, name: '6-Castle Room' },
	{ root: 0x14d26b, name: '6-Anchors Away' },
	{ root: 0x146870, name: '7-1' },
	{ root: 0x1492f0, name: '7-2', sprites: 0x158ad0 },
	{ root: 0x142190, name: '7-3', sprites: 0x157b1d },
	{ root: 0x146bb0, name: '7-4' },
	{ root: 0x13ee5c, name: '7-5' },
	{ root: 0x1475e1, name: '7-6', sprites: 0x15869b },
	{ root: 0x14647e, name: '7-7' },
	{ root: 0x13f9d7, name: '7-8', sprites: 0x1574a8 },
	{ root: 0x1495fe, name: '7-9', sprites: 0x158b92 },
	{ root: 0x148bb9, name: '7-Piranha Plant 1' },
	{ root: 0x14b57b, name: '7-Fortress 1', sprites: 0x1591c8 },
	{ root: 0x14b0f6, name: '7-Fortress 2', sprites: 0x159082 },
	{ root: 0x148a59, name: '7-Piranha Plant 2' },
	{ root: 0x14d2ab, name: '7-Airship' },
	{ root: 0x13f374, name: '7-1 Outside Area' },
	{ root: 0x13fe87, name: '7-4 Outside Area' },
	{ root: 0x140ad8, name: '7-5 Outside Area', sprites: 0x15784b },
	{ root: 0x13fe33, name: '7-6 Outside Area', sprites: 0x1575b2 },
	{ root: 0x13f3dd, name: '7-7 Beginning/End' },
	{ root: 0x148fff, name: '7-8 Bonus Area 1' },
	{
		root: 0x144440,
		name: '7-8 Bonus Area 2, 7-Fortress 1 Bonus Area',
	},
	{ root: 0x1492dc, name: '7-9 Ending' },
	{ root: 0x148e77, name: '7-Piranha Plant 1 Ending' },
	{ root: 0x14b716, name: '7-Fortress 1 Lonely Room' },
	{ root: 0x14b220, name: '7-Fortress 2 Boss Room' },
	{ root: 0x148e77, name: '7-Piranha Plant 2 Ending' },
	{ root: 0x14da8a, name: '7-Airship Boss Room' },
	{ root: 0x13ff38, name: '7-Hammer Bros.' },
	{ root: 0x14a838, name: '7-Castle Room' },
	{ root: 0x14d28b, name: '7-Anchors Away' },
	{ root: 0x1403a1, name: '8-1', sprites: 0x15766b },
	{ root: 0x143009, name: '8-2', sprites: 0x157e23 },
	{ root: 0x14d859, name: '8-Tanks 1' },
	{ root: 0x14d56c, name: '8-Battleship' },
	{ root: 0x148d28, name: '8-Hand Trap 1' },
	{ root: 0x148ca9, name: '8-Hand Trap 2' },
	{ root: 0x148d8d, name: '8-Hand Trap 3' },
	{ root: 0x14d4b9, name: '8-Air Force' },
	{ root: 0x14bca9, name: '8-Fortress', sprites: 0x15929f },
	{ root: 0x14d6f2, name: '8-Tanks 2' },
	{ root: 0x14c19d, name: "8-Bowser's Castle" },
	{ root: 0x1441f5, name: '8-1 Bonus Area' },
	{ root: 0x140210, name: '8-2 Bonus Area' },
	{ root: 0x14dc95, name: '8-Tanks 1 Boss Room' },
	{ root: 0x14dbd5, name: '8-Battleship Boss Room' },
	{ root: 0x148e3f, name: '8-Hand Trap Ending' },
	{ root: 0x14dc55, name: '8-Air Force Boss Room' },
	{ root: 0x14bfb7, name: '8-Fortress Back Side' },
	{ root: 0x14dbd5, name: '8-Tanks 2 Boss Room' },
	{ root: 0x14c448, name: "8-Bowser's Lair" },
	{ root: 0x1436f9, name: 'Pipe 1 (forward)' },
	{ root: 0x143765, name: 'Pipe 1 (backward)' },
	{ root: 0x1438df, name: 'Pipe 2 (forward)' },
	{ root: 0x143a35, name: 'Pipe 2 (backward)' },
	{ root: 0x1437d1, name: 'Pipe 3 (forward)' },
	{ root: 0x143858, name: 'Pipe 3 (backward)' },
	{ root: 0x1438df, name: 'Pipe 4 (forward)' },
	{ root: 0x143946, name: 'Pipe 4 (backward)' },
	{ root: 0x143abd, name: 'Pipe 5 (forward)' },
	{ root: 0x143b14, name: 'Pipe 5 (backward)' },
	{ root: 0x143b6b, name: 'Pipe 6 (forward)' },
	{ root: 0x143bbf, name: 'Pipe 6 (backward)' },
	{
		name: '3-2castle: room 1',

		sprites: 0x158f5d,
	},
	{
		name: '3-2castle: room 2 (stretch boos)',

		sprites: 0x158f23,
	},
	{
		name: '3-7',

		sprites: 0x157711,
	},
	{
		name: 'hammer bros fight',

		sprites: 0x1579d7,
	},
	{
		name: 'hammer bros fight 2',

		sprites: 0x158b74,
	},
	{
		name: 'hammer bros fight 3',

		sprites: 0x158b82,
	},
];

const loadableLevels = inGameLevels.filter(
	(igl) => !!(igl.name && igl.root)
) as LoadableInGameLevel[];

export { inGameLevels, loadableLevels, potentialSpriteStarts };
export type { InGameLevel };
