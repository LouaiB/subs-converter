import { Obj2Webvtt } from "../webvtt/obj2webvtt.js";
import { Subs, Cue } from "../models/subs.js";

const tests = [];
const obj2webvtt = new Obj2Webvtt();

// SAMPLES
const sampleWebvtt = 
`WEBVTT

1
00:00:02.569 --> 00:00:04.637
（京子(きょうこ)たち）アッカリ～ン

2
00:00:04.738 --> 00:00:09.042
（あかり）は～い！
「ゆるゆり」始まるよ～！

3
00:00:09.476 --> 00:00:14.681
（目覚ましのアラーム）

4
01:02:09.476 --> 01:03:14.681
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

let test1 = function CONVERTOBJ2WEBVTT_STRINGRESULT_CORRECTMATCH(){
    const webvtt = obj2webvtt.convert(sampleObj);

    console.log(webvtt);
    console.assert(webvtt.length == sampleWebvtt.length, `Expected converted webvtt length(${webvtt.length}) to be equal to sample webvtt length(${sampleWebvtt.length})`);
    console.assert(webvtt == sampleWebvtt, `Expected:\n\n${sampleWebvtt}\n\nGot instead:\n\n${webvtt}`);
};
tests.push(test1);

// Run tests
tests.forEach(test => {
    test();
});