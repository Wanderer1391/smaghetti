import 'ignore-styles';
import path from 'path';
import fs from 'fs';
import {
	extractCompressedTilesFromRom,
	TilePage,
} from '../../src/tiles/extractCompressedTilesFromRom';

function hex(num: number): string {
	return `0x` + num.toString(16);
}

// mem.createInitializedBlock("ROM", api.toAddr(0x8000000), provider.getInputStream(0), 0x1000000, monitor, false).setExecute(true);
function blockCall(
	name: string,
	start: number,
	size: number,
	executable: boolean
): string {
	const BASE = 0x8000000;

	return `mem.createInitializedBlock("${name}", api.toAddr(${hex(
		BASE + start
	)}), provider.getInputStream(${hex(start)}), ${hex(
		size
	)}, monitor, false).setExecute(${executable});`;
}

// when loading sma4.gba in a hex editor, this is the last byte with a value
// from 0x3e15fb on, it's just zeros. So assuming those zeros are unused space
// in the ROM
const ROM_SIZE = 0x3e15fa;

function generateJavaCalls(pages: TilePage[]): string {
	const initialCall = blockCall('code', 0, pages[0].address, true);

	const calls = pages.reduce<string>((building, page, i, a) => {
		const nextPage = a[i + 1];
		const gapStart = page.address + page.compressedLength;
		const gapSize = (nextPage?.address ?? Number.MAX_SAFE_INTEGER) - gapStart;

		const gapAdjustment = gapSize < 16 ? gapSize : 0;

		const call =
			blockCall(
				'LZ77 tiles',
				page.address,
				page.compressedLength + gapAdjustment,
				false
			) + '\n';
		let gapCall = '';

		if (nextPage && gapSize >= 16) {
			gapCall = blockCall('gap?', gapStart, gapSize, true) + '\n';
		}

		return building + call + gapCall;
	}, '');

	const lastPage = pages[pages.length - 1];
	const start = lastPage.address + lastPage.compressedLength;
	const remainingSpace = ROM_SIZE - start + 1;
	const finalCall = blockCall('code', start, remainingSpace, true);

	return initialCall + '\n' + calls + finalCall;
}

function getClassSrc(calls: string): string {
	return `// generated by ${__filename}

package ghidrasma4;

import ghidra.app.util.bin.ByteProvider;
import ghidra.program.model.mem.Memory;
import ghidra.program.flatapi.FlatProgramAPI;
import ghidra.util.task.TaskMonitor;

public class AddSMA4MemoryBlocks {
	public static void addCalls(Memory mem, FlatProgramAPI api, ByteProvider provider, TaskMonitor monitor) throws Exception {
${calls}
	}
}
`;
}

function main() {
	const romPath = process.argv[2];

	if (!romPath) {
		console.error(
			`usage: ${path.basename(process.argv[0])} ${path.basename(
				process.argv[1]
			)} <path-to-rom>`
		);
		process.exit(1);
	}

	const romBuffer = fs.readFileSync(path.resolve(process.cwd(), romPath));
	const romData = new Uint8Array(romBuffer);

	const pages = extractCompressedTilesFromRom(romData);
	const javaCalls = generateJavaCalls(pages);
	const classSrc = getClassSrc(javaCalls);

	const outPath = path.resolve(
		__dirname,
		'../tools/SMA4GhidraLoader/src/main/java/ghidrasma4/AddSMA4MemoryBlocks.java'
	);

	fs.writeFileSync(outPath, classSrc);

	console.log('written to', outPath);
}

main();
