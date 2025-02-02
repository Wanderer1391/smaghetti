// generated by /home/matt/dev/smaghetti/decomp/scripts/generateGhidraROMBlockHelperClass.ts

package ghidrasma4;

import ghidra.app.util.bin.ByteProvider;
import ghidra.program.model.mem.Memory;
import ghidra.program.flatapi.FlatProgramAPI;
import ghidra.util.task.TaskMonitor;

public class AddSMA4MemoryBlocks {
	public static void addCalls(Memory mem, FlatProgramAPI api, ByteProvider provider, TaskMonitor monitor) throws Exception {
mem.createInitializedBlock("rom", api.toAddr(0x80000c0), provider.getInputStream(0xc0), 0x131f20, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8131fe0), provider.getInputStream(0x131fe0), 0x2124, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8134104), provider.getInputStream(0x134104), 0x1714, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x8135818), provider.getInputStream(0x135818), 0x2df50, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8163768), provider.getInputStream(0x163768), 0x3f0c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8167674), provider.getInputStream(0x167674), 0x36e8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x816ad5c), provider.getInputStream(0x16ad5c), 0x3ce4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x816ea40), provider.getInputStream(0x16ea40), 0x3ab0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81724f0), provider.getInputStream(0x1724f0), 0x46f8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8176be8), provider.getInputStream(0x176be8), 0x3cac, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x817a894), provider.getInputStream(0x17a894), 0x38b8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x817e14c), provider.getInputStream(0x17e14c), 0x372c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8181878), provider.getInputStream(0x181878), 0xc3a, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81824b2), provider.getInputStream(0x1824b2), 0x802, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8182cb4), provider.getInputStream(0x182cb4), 0x3ad4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8186788), provider.getInputStream(0x186788), 0x3338, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8189ac0), provider.getInputStream(0x189ac0), 0xc24, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x818a6e4), provider.getInputStream(0x18a6e4), 0x6b8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x818ad9c), provider.getInputStream(0x18ad9c), 0x1e4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x818af80), provider.getInputStream(0x18af80), 0x1994, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x818c914), provider.getInputStream(0x18c914), 0x3184, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x818fa98), provider.getInputStream(0x18fa98), 0xd9c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8190834), provider.getInputStream(0x190834), 0x294, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8190ac8), provider.getInputStream(0x190ac8), 0x3f54, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8194a1c), provider.getInputStream(0x194a1c), 0x1b84, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81965a0), provider.getInputStream(0x1965a0), 0x2b14, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81990b4), provider.getInputStream(0x1990b4), 0x2e000, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81c70b4), provider.getInputStream(0x1c70b4), 0x2404, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81c94b8), provider.getInputStream(0x1c94b8), 0x2fc, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81c97b4), provider.getInputStream(0x1c97b4), 0x54c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81c9d00), provider.getInputStream(0x1c9d00), 0x7e4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81ca4e4), provider.getInputStream(0x1ca4e4), 0x2ee8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81cd3cc), provider.getInputStream(0x1cd3cc), 0x9c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81cd468), provider.getInputStream(0x1cd468), 0xb0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81cd518), provider.getInputStream(0x1cd518), 0x142c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81ce944), provider.getInputStream(0x1ce944), 0xc14, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81cf558), provider.getInputStream(0x1cf558), 0x404, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81cf95c), provider.getInputStream(0x1cf95c), 0x7b4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d0110), provider.getInputStream(0x1d0110), 0x654, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d0764), provider.getInputStream(0x1d0764), 0x3f4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d0b58), provider.getInputStream(0x1d0b58), 0x35c, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81d0eb4), provider.getInputStream(0x1d0eb4), 0x138, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d0fec), provider.getInputStream(0x1d0fec), 0x3f8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d13e4), provider.getInputStream(0x1d13e4), 0x3e5, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81d17c9), provider.getInputStream(0x1d17c9), 0x1003, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d27cc), provider.getInputStream(0x1d27cc), 0x3d4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d2ba0), provider.getInputStream(0x1d2ba0), 0x330, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d2ed0), provider.getInputStream(0x1d2ed0), 0x3a8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81d3278), provider.getInputStream(0x1d3278), 0x30e, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81d3586), provider.getInputStream(0x1d3586), 0x1e55e, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81f1ae4), provider.getInputStream(0x1f1ae4), 0x5f0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81f20d4), provider.getInputStream(0x1f20d4), 0xf6a, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81f303e), provider.getInputStream(0x1f303e), 0x561a, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81f8658), provider.getInputStream(0x1f8658), 0x118, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81f8770), provider.getInputStream(0x1f8770), 0x82c, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81f8f9c), provider.getInputStream(0x1f8f9c), 0x2ea, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81f9286), provider.getInputStream(0x1f9286), 0x392, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81f9618), provider.getInputStream(0x1f9618), 0x258f, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x81fbba7), provider.getInputStream(0x1fbba7), 0x801, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81fc3a8), provider.getInputStream(0x1fc3a8), 0x1024, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x81fd3cc), provider.getInputStream(0x1fd3cc), 0x32f0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82006bc), provider.getInputStream(0x2006bc), 0x3010, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82036cc), provider.getInputStream(0x2036cc), 0x614, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8203ce0), provider.getInputStream(0x203ce0), 0x2fa0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8206c80), provider.getInputStream(0x206c80), 0x2f3d, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x8209bbd), provider.getInputStream(0x209bbd), 0x1a07, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820b5c4), provider.getInputStream(0x20b5c4), 0x377, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x820b93b), provider.getInputStream(0x20b93b), 0xea1, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820c7dc), provider.getInputStream(0x20c7dc), 0x1105, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x820d8e1), provider.getInputStream(0x20d8e1), 0x173, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820da54), provider.getInputStream(0x20da54), 0x257, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x820dcab), provider.getInputStream(0x20dcab), 0x4f1, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820e19c), provider.getInputStream(0x20e19c), 0x354, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820e4f0), provider.getInputStream(0x20e4f0), 0x764, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820ec54), provider.getInputStream(0x20ec54), 0xd5, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x820ed29), provider.getInputStream(0x20ed29), 0x23, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820ed4c), provider.getInputStream(0x20ed4c), 0x66c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820f3b8), provider.getInputStream(0x20f3b8), 0x208, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820f5c0), provider.getInputStream(0x20f5c0), 0x538, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820faf8), provider.getInputStream(0x20faf8), 0x408, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x820ff00), provider.getInputStream(0x20ff00), 0x640, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8210540), provider.getInputStream(0x210540), 0x1b6c, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x82120ac), provider.getInputStream(0x2120ac), 0x4f48, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8216ff4), provider.getInputStream(0x216ff4), 0x704, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82176f8), provider.getInputStream(0x2176f8), 0x19f4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82190ec), provider.getInputStream(0x2190ec), 0x1f48, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x821b034), provider.getInputStream(0x21b034), 0x2208, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x821d23c), provider.getInputStream(0x21d23c), 0x2084, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x821f2c0), provider.getInputStream(0x21f2c0), 0x1a60, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8220d20), provider.getInputStream(0x220d20), 0x2140, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8222e60), provider.getInputStream(0x222e60), 0x1ff4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8224e54), provider.getInputStream(0x224e54), 0x23c8, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x822721c), provider.getInputStream(0x22721c), 0xfc, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8227318), provider.getInputStream(0x227318), 0xfcc, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82282e4), provider.getInputStream(0x2282e4), 0x2b74, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x822ae58), provider.getInputStream(0x22ae58), 0x3e58, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x822ecb0), provider.getInputStream(0x22ecb0), 0x91f, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x822f5cf), provider.getInputStream(0x22f5cf), 0x180d, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8230ddc), provider.getInputStream(0x230ddc), 0x294, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8231070), provider.getInputStream(0x231070), 0x3ac, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x823141c), provider.getInputStream(0x23141c), 0x310, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x823172c), provider.getInputStream(0x23172c), 0x3c4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8231af0), provider.getInputStream(0x231af0), 0x39c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8231e8c), provider.getInputStream(0x231e8c), 0x343, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x82321cf), provider.getInputStream(0x2321cf), 0xa79, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8232c48), provider.getInputStream(0x232c48), 0x18e, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x8232dd6), provider.getInputStream(0x232dd6), 0x47e, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8233254), provider.getInputStream(0x233254), 0x4d0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8233724), provider.getInputStream(0x233724), 0x421, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x8233b45), provider.getInputStream(0x233b45), 0x20c3, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8235c08), provider.getInputStream(0x235c08), 0x2000, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8237c08), provider.getInputStream(0x237c08), 0x8e4, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82384ec), provider.getInputStream(0x2384ec), 0x1684, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8239b70), provider.getInputStream(0x239b70), 0x108c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x823abfc), provider.getInputStream(0x23abfc), 0x1313, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x823bf0f), provider.getInputStream(0x23bf0f), 0x2169, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x823e078), provider.getInputStream(0x23e078), 0x388, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x823e400), provider.getInputStream(0x23e400), 0x7ed, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x823ebed), provider.getInputStream(0x23ebed), 0x89f, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x823f48c), provider.getInputStream(0x23f48c), 0x2237, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x82416c3), provider.getInputStream(0x2416c3), 0x629, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8241cec), provider.getInputStream(0x241cec), 0x752, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x824243e), provider.getInputStream(0x24243e), 0x102, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8242540), provider.getInputStream(0x242540), 0x15f, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x824269f), provider.getInputStream(0x24269f), 0x219, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82428b8), provider.getInputStream(0x2428b8), 0x99c, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8243254), provider.getInputStream(0x243254), 0xa98, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8243cec), provider.getInputStream(0x243cec), 0x120, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8243e0c), provider.getInputStream(0x243e0c), 0x18f1, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x82456fd), provider.getInputStream(0x2456fd), 0xa13, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8246110), provider.getInputStream(0x246110), 0x14dc, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x82475ec), provider.getInputStream(0x2475ec), 0x1437, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x8248a23), provider.getInputStream(0x248a23), 0x278d, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x824b1b0), provider.getInputStream(0x24b1b0), 0x238, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x824b3e8), provider.getInputStream(0x24b3e8), 0x1d0, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x824b5b8), provider.getInputStream(0x24b5b8), 0x270, monitor, false).setExecute(false);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x824b828), provider.getInputStream(0x24b828), 0x1b3, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x824b9db), provider.getInputStream(0x24b9db), 0x13b39, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x825f514), provider.getInputStream(0x25f514), 0x1626, monitor, false).setExecute(false);
mem.createInitializedBlock("gap?", api.toAddr(0x8260b3a), provider.getInputStream(0x260b3a), 0x2fba, monitor, false).setExecute(true);
mem.createInitializedBlock("LZ77 tiles", api.toAddr(0x8263af4), provider.getInputStream(0x263af4), 0x184, monitor, false).setExecute(false);
mem.createInitializedBlock("rom", api.toAddr(0x8263c78), provider.getInputStream(0x263c78), 0x17d983, monitor, false).setExecute(true);
	}
}
