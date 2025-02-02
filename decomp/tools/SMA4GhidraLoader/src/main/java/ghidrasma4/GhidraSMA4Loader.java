/* ###
 * 
 * GhidraSMA4Loader: based on the general Ghidra GBA loader found here:
 * https://github.com/SiD3W4y/GhidraGBA
 *
 * IP: GHIDRA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ghidrasma4;

import java.io.IOException;
import java.util.*;

import ghidra.app.util.Option;
import ghidra.app.util.bin.ByteProvider;
import ghidra.app.util.importer.MessageLog;
import ghidra.app.util.opinion.AbstractLibrarySupportLoader;
import ghidra.app.util.opinion.LoadSpec;
import ghidra.framework.store.LockException;
import ghidra.program.flatapi.FlatProgramAPI;
import ghidra.program.model.address.Address;
import ghidra.program.model.address.AddressFactory;
import ghidra.program.model.address.AddressOutOfBoundsException;
import ghidra.program.model.address.AddressOverflowException;
import ghidra.program.model.address.AddressSet;
import ghidra.program.model.address.AddressSpace;
import ghidra.program.model.lang.LanguageCompilerSpecPair;
import ghidra.program.model.listing.Program;
import ghidra.program.model.mem.Memory;
import ghidra.program.model.mem.MemoryConflictException;
import ghidra.program.model.symbol.SourceType;
import ghidra.util.exception.CancelledException;
import ghidra.util.exception.DuplicateNameException;
import ghidra.util.task.TaskMonitor;

public class GhidraSMA4Loader extends AbstractLibrarySupportLoader {

	@Override
	public String getName() {
		return "SMA4 1.1 US ROM";
	}

	@Override
	public Collection<LoadSpec> findSupportedLoadSpecs(ByteProvider provider) throws IOException {
		List<LoadSpec> loadSpecs = new ArrayList<>();
		
		// Too small to contain header
		if(provider.length() < 0xc0)
			return loadSpecs;
		
		// Invalid magic byte
		if(provider.readByte(0xb2) != (byte)0x96)
			return loadSpecs;
		
		loadSpecs.add(new LoadSpec(this, 0, new LanguageCompilerSpecPair("ARM:LE:32:v4t", "default"), true));

		return loadSpecs;
	}

	@Override
	protected void load(ByteProvider provider, LoadSpec loadSpec, List<Option> options,
			Program program, TaskMonitor monitor, MessageLog log)
			throws CancelledException, IOException {
		Memory mem = program.getMemory();
		FlatProgramAPI api = new FlatProgramAPI(program);
				
		try {
			mem.createUninitializedBlock("WRAM", api.toAddr(0x2000000), 0x40000, false).setExecute(true);
			mem.createUninitializedBlock("IRAM", api.toAddr(0x3000000), 0x08000, false).setExecute(true);
			mem.createUninitializedBlock("IO", api.toAddr(0x4000000), 0x003ff, false).setWrite(true);
			mem.createUninitializedBlock("PAL", api.toAddr(0x5000000), 0x00400, false).setWrite(true);
			mem.createUninitializedBlock("VRAM", api.toAddr(0x6000000), 0x18000, false).setExecute(true);
			mem.createUninitializedBlock("OBJ", api.toAddr(0x7000000), 0x400, false).setExecute(true);
            
            AddSMA4MemoryBlocks.addCalls(mem, api, provider, monitor);

			
			
			// Create GBA I/O Map			
			api.createLabel(api.toAddr(0x4000000), "DISPCNT", true);
			api.createLabel(api.toAddr(0x4000004), "DISPSTAT", true);
			api.createLabel(api.toAddr(0x4000006), "VCOUNT", true);
			api.createLabel(api.toAddr(0x4000008), "BG0CNT", true);
			api.createLabel(api.toAddr(0x400000A), "BG1CNT", true);
			api.createLabel(api.toAddr(0x400000C), "BG2CNT", true);
			api.createLabel(api.toAddr(0x400000E), "BG3CNT", true);
			api.createLabel(api.toAddr(0x4000010), "BG0HOFS", true);
			api.createLabel(api.toAddr(0x4000012), "BG0VOFS", true);
			api.createLabel(api.toAddr(0x4000014), "BG1HOFS", true);
			api.createLabel(api.toAddr(0x4000016), "BG1VOFS", true);
			api.createLabel(api.toAddr(0x4000018), "BG2HOFS", true);
			api.createLabel(api.toAddr(0x400001A), "BG2VOFS", true);
			api.createLabel(api.toAddr(0x400001C), "BG3HOFS", true);
			api.createLabel(api.toAddr(0x400001E), "BG3VOFS", true);
			api.createLabel(api.toAddr(0x4000020), "BG2PA", true);
			api.createLabel(api.toAddr(0x4000022), "BG2PB", true);
			api.createLabel(api.toAddr(0x4000024), "BG2PC", true);
			api.createLabel(api.toAddr(0x4000026), "BG2PD", true);
			api.createLabel(api.toAddr(0x4000028), "BG2X", true);
			api.createLabel(api.toAddr(0x400002C), "BG2Y", true);
			api.createLabel(api.toAddr(0x4000030), "BG3PA", true);
			api.createLabel(api.toAddr(0x4000032), "BG3PB", true);
			api.createLabel(api.toAddr(0x4000034), "BG3PC", true);
			api.createLabel(api.toAddr(0x4000036), "BG3PD", true);
			api.createLabel(api.toAddr(0x4000038), "BG3X", true);
			api.createLabel(api.toAddr(0x400003C), "BG3Y", true);
			api.createLabel(api.toAddr(0x4000040), "WIN0H", true);
			api.createLabel(api.toAddr(0x4000042), "WIN1H", true);
			api.createLabel(api.toAddr(0x4000044), "WIN0V", true);
			api.createLabel(api.toAddr(0x4000046), "WIN1V", true);
			api.createLabel(api.toAddr(0x4000048), "WININ", true);
			api.createLabel(api.toAddr(0x400004A), "WINOUT", true);
			api.createLabel(api.toAddr(0x400004C), "MOSAIC", true);
			api.createLabel(api.toAddr(0x4000050), "BLDCNT", true);
			api.createLabel(api.toAddr(0x4000052), "BLDALPHA", true);
			api.createLabel(api.toAddr(0x4000054), "BLDY", true);
			api.createLabel(api.toAddr(0x4000060), "SOUND1CNT_L", true);
			api.createLabel(api.toAddr(0x4000062), "SOUND1CNT_H", true);
			api.createLabel(api.toAddr(0x4000064), "SOUND1CNT_X", true);
			api.createLabel(api.toAddr(0x4000068), "SOUND2CNT_L", true);
			api.createLabel(api.toAddr(0x400006C), "SOUND2CNT_H", true);
			api.createLabel(api.toAddr(0x4000070), "SOUND3CNT_L", true);
			api.createLabel(api.toAddr(0x4000072), "SOUND3CNT_H", true);
			api.createLabel(api.toAddr(0x4000074), "SOUND3CNT_X", true);
			api.createLabel(api.toAddr(0x4000078), "SOUND4CNT_L", true);
			api.createLabel(api.toAddr(0x400007C), "SOUND4CNT_H", true);
			api.createLabel(api.toAddr(0x4000080), "SOUNDCNT_L", true);
			api.createLabel(api.toAddr(0x4000082), "SOUNDCNT_H", true);
			api.createLabel(api.toAddr(0x4000084), "SOUNDCNT_X", true);
			api.createLabel(api.toAddr(0x4000088), "SOUNDBIAS", true);
			api.createLabel(api.toAddr(0x4000090), "WAVE_RAM", true);
			api.createLabel(api.toAddr(0x40000A0), "FIFO_A", true);
			api.createLabel(api.toAddr(0x40000A4), "FIFO_B", true);
			api.createLabel(api.toAddr(0x40000B0), "DMA0SAD", true);
			api.createLabel(api.toAddr(0x40000B4), "DMA0DAD", true);
			api.createLabel(api.toAddr(0x40000B8), "DMA0CNT_L", true);
			api.createLabel(api.toAddr(0x40000BA), "DMA0CNT_H", true);
			api.createLabel(api.toAddr(0x40000BC), "DMA1SAD", true);
			api.createLabel(api.toAddr(0x40000C0), "DMA1DAD", true);
			api.createLabel(api.toAddr(0x40000C4), "DMA1CNT_L", true);
			api.createLabel(api.toAddr(0x40000C6), "DMA1CNT_H", true);
			api.createLabel(api.toAddr(0x40000C8), "DMA2SAD", true);
			api.createLabel(api.toAddr(0x40000CC), "DMA2DAD", true);
			api.createLabel(api.toAddr(0x40000D0), "DMA2CNT_L", true);
			api.createLabel(api.toAddr(0x40000D2), "DMA2CNT_H", true);
			api.createLabel(api.toAddr(0x40000D4), "DMA3SAD", true);
			api.createLabel(api.toAddr(0x40000D8), "DMA3DAD", true);
			api.createLabel(api.toAddr(0x40000DC), "DMA3CNT_L", true);
			api.createLabel(api.toAddr(0x40000DE), "DMA3CNT_H", true);
			api.createLabel(api.toAddr(0x4000100), "TM0CNT_L", true);
			api.createLabel(api.toAddr(0x4000102), "TM0CNT_H", true);
			api.createLabel(api.toAddr(0x4000104), "TM1CNT_L", true);
			api.createLabel(api.toAddr(0x4000106), "TM1CNT_H", true);
			api.createLabel(api.toAddr(0x4000108), "TM2CNT_L", true);
			api.createLabel(api.toAddr(0x400010A), "TM2CNT_H", true);
			api.createLabel(api.toAddr(0x400010C), "TM3CNT_L", true);
			api.createLabel(api.toAddr(0x400010E), "TM3CNT_H", true);
			api.createLabel(api.toAddr(0x4000120), "SIODATA32", true);
			api.createLabel(api.toAddr(0x4000120), "SIOMULTI0", true);
			api.createLabel(api.toAddr(0x4000122), "SIOMULTI1", true);
			api.createLabel(api.toAddr(0x4000124), "SIOMULTI2", true);
			api.createLabel(api.toAddr(0x4000126), "SIOMULTI3", true);
			api.createLabel(api.toAddr(0x4000128), "SIOCNT", true);
			api.createLabel(api.toAddr(0x400012A), "SIOMLT_SEND", true);
			api.createLabel(api.toAddr(0x400012A), "SIODATA8", true);
			api.createLabel(api.toAddr(0x4000130), "KEYINPUT", true);
			api.createLabel(api.toAddr(0x4000132), "KEYCNT", true);
			api.createLabel(api.toAddr(0x4000200), "IE", true);
			api.createLabel(api.toAddr(0x4000202), "IF", true);
			api.createLabel(api.toAddr(0x4000204), "WAITCNT", true);
			api.createLabel(api.toAddr(0x4000208), "IME", true);
			api.createLabel(api.toAddr(0x4000300), "POSTFLG", true);
			api.createLabel(api.toAddr(0x4000301), "HALTCNT", true);
			api.createLabel(api.toAddr(0x4000134), "RCNT", true);
			api.createLabel(api.toAddr(0x4000136), "IR", true);
			api.createLabel(api.toAddr(0x4000140), "JOYCNT", true);
			api.createLabel(api.toAddr(0x4000150), "JOY_RECV", true);
			api.createLabel(api.toAddr(0x4000154), "JOY_TRANS", true);
			api.createLabel(api.toAddr(0x4000158), "JOYSTAT", true);
			

			// GBA ROM header
			mem.createInitializedBlock("Header: Nintendo Logo", api.toAddr(0x8000004), provider.getInputStream(0x4), 156, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Game Title", api.toAddr(0x80000a0), provider.getInputStream(0xa0), 12, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Game Code", api.toAddr(0x80000ac), provider.getInputStream(0xac), 4, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Maker Code", api.toAddr(0x80000b0), provider.getInputStream(0xb0), 2, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Magic Number", api.toAddr(0x80000b2), provider.getInputStream(0xb2), 1, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Main Unit Code", api.toAddr(0x80000b3), provider.getInputStream(0xb3), 1, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Device Type", api.toAddr(0x80000b4), provider.getInputStream(0xb4), 1, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Reserved", api.toAddr(0x80000b5), provider.getInputStream(0xb5), 7, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Software Version", api.toAddr(0x80000bc), provider.getInputStream(0xbc), 1, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Checksum", api.toAddr(0x80000bd), provider.getInputStream(0xbd), 1, monitor, false).setExecute(false);
			mem.createInitializedBlock("Header: Reserved", api.toAddr(0x80000be), provider.getInputStream(0xbe), 2, monitor, false).setExecute(false);
			
			// IRAM values, from addresses.txt created by FL4SHK
			// https://www.smwcentral.net/?p=viewthread&t=62530&page=1&pid=1020242#p1020242
			api.createLabel(api.toAddr(0x3003d0b), "TIMER_HUNDREDS", true);
			api.createLabel(api.toAddr(0x3003d0c), "TIMER_TENS", true);
			api.createLabel(api.toAddr(0x3003d0d), "TIMER_ONES", true);
			api.createLabel(api.toAddr(0x3003d0e), "TIMER_UNKNOWN", true);

			api.createLabel(api.toAddr(0x3004034), "MARIO_CARRY_ITEM_FLAG", true);
			api.createLabel(api.toAddr(0x3004d21), "MARIO_CARRY_ITEM_FLAG_MIRROR1", true);
			api.createLabel(api.toAddr(0x3003f50), "MARIO_CARRY_ITEM_FLAG_MIRROR2", true);
			api.createLabel(api.toAddr(0x3003f77), "MARIO_CARRY_ITEM_FLAG_MIRROR3", true);
			api.createLabel(api.toAddr(0x3004035), "MARIO_CARRY_BOOMERANG_FLAG", true);
			api.createLabel(api.toAddr(0x3003f70), "MARIO_DUCKING_FLAG", true);
			api.createLabel(api.toAddr(0x3003f5d), "MARIO_IN_AIR_FLAG", true);
			api.createLabel(api.toAddr(0x3003f5f), "MARIO_POWERUP", true);
			api.createLabel(api.toAddr(0x3003fb4), "MARIO_COLLIDING_BITMASK", true);
			api.createLabel(api.toAddr(0x3003f60), "MARIO_SPRITE_FRAME", true);
			api.createLabel(api.toAddr(0x3003f5e), "MARIO_SPRITE_FRAME_RELATED", true);

			api.createLabel(api.toAddr(0x3002dd0), "BOOMERANGE_Y", true);
			api.createLabel(api.toAddr(0x3003350), "BOOMERANGE_Y_MIRROR1", true);

			api.createLabel(api.toAddr(0x3004c76), "SPRITE_SLOT_1", true);
			api.createLabel(api.toAddr(0x30046c8), "SPRITE_ID_RELATED", true);

			api.createLabel(api.toAddr(0x3003754), "SCROLL_Y_RELATED", true);
			api.createLabel(api.toAddr(0x3003758), "SCROLL_X_RELATED", true);
			
			// entry point
			mem.createInitializedBlock("Entry branch", api.toAddr(0x8000000), provider.getInputStream(0), 4, monitor, false).setExecute(true);
			api.addEntryPoint(api.toAddr(0x8000000));
			api.createFunction(api.toAddr(0x8000000), "_entry");

		} catch (Exception e) {
			log.appendException(e);
		}
	}
}