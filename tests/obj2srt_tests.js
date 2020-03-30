import { Obj2Srt } from "../srt/obj2srt.js";
import { Subs, Cue } from "../models/subs.js";

const tests = [];
const obj2srt = new Obj2Srt();

// SAMPLES
const sampleSrt = 
`1
00:00:02,569 --> 00:00:04,637
（京子(きょうこ)たち）アッカリ～ン

2
00:00:04,738 --> 00:00:09,042
（あかり）は～い！
「ゆるゆり」始まるよ～！

3
00:00:09,476 --> 00:00:14,681
（目覚ましのアラーム）

4
01:02:09,476 --> 01:03:14,681
（目覚ましのアラーム）`

const sampleObj = new Subs();
sampleObj.cuelist.push(new Cue(
    1, 2569, 4637, ['（京子(きょうこ)たち）アッカリ～ン']
));
sampleObj.cuelist.push(new Cue(
    2, 4738, 9042, ['（あかり）は～い！', '「ゆるゆり」始まるよ～！']
));
sampleObj.cuelist.push(new Cue(
    3, 9476, 14681, ['（目覚ましのアラーム）']
));
sampleObj.cuelist.push(new Cue(
    4, 3729476, 3794681, ['（目覚ましのアラーム）']
));

let test1 = function CONVERTOBJ2SRT_STRINGRESULT_CORRECTMATCH(){
    const srt = obj2srt.convert(sampleObj);

    console.log(srt);
    console.assert(srt.length == sampleSrt.length, `Expected converted srt length(${srt.length}) to be equal to sample srt length(${sampleSrt.length})`);
    console.assert(srt == sampleSrt, `Expected:\n\n${sampleSrt}\n\nGot instead:\n\n${srt}`);
};
tests.push(test1);

// Run tests
tests.forEach(test => {
    test();
});