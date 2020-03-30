import { SubsConverter } from "../subs-converter.js";

const tests = [];
const subsConverter = new SubsConverter();

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
（目覚ましのアラーム）`;

let test1 = function CONVERTSRT2WEBVTT_STRINGRESULT_CORRECTMATCH(){
    const ass = subsConverter.convert(sampleSrt, {
        from: subsConverter.Formats.SRT,
        to: subsConverter.Formats.ASS
    });

    console.log(ass);
};
tests.push(test1);

// Run tests
tests.forEach(test => {
    test();
});