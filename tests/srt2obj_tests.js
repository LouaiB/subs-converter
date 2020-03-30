import { Srt2Obj } from "../srt/srt2obj.js";

const tests = [];
const srt2obj = new Srt2Obj();

// SAMPLES
const srt = 
`1
00:00:02,569 --> 00:00:04,637  
（京子(きょうこ)たち）アッカリ～ン

2
00:00:04,738 --> 00:00:09,042  
（あかり）は～い！
「ゆるゆり」始まるよ～！

3
00:00:09,476 --> 00:00:14,681  
（目覚ましのアラーム）`

const srt2 = 
`00:00:02,569 --> 00:00:04,637  
（京子(きょうこ)たち）アッカリ～ン

00:00:04,738 --> 00:00:09,042  
（あかり）は～い！
「ゆるゆり」始まるよ～！

00:00:09,476 --> 00:00:14,681  
（目覚ましのアラーム）`

let test1 = function CONVERTSRT2OBJ_IDENTIFIEREXISTS_CORRECTIDENTIFIER(){
    const obj = srt2obj.convert(srt);

    console.table(obj);
    console.assert(obj.cuelist[0].identifier == 1, `Expected identifier 1 for cue 1, got ${obj.cuelist[0].identifier} instead`);
    console.assert(obj.cuelist[1].identifier == 2, `Expected identifier 2 for cue 2, got ${obj.cuelist[1].identifier} instead`);
    console.assert(obj.cuelist[2].identifier == 3, `Expected identifier 3 for cue 3, got ${obj.cuelist[2].identifier} instead`);
};
tests.push(test1);

let test2 = function CONVERTSRT2OBJ_TIMESTAMPS_CORRECTPARSING(){
    const obj = srt2obj.convert(srt);

    console.assert(obj.cuelist[0].startTime == 2569, `Expected startTime 2569, got ${obj.cuelist[0].startTime} instead`);
    console.assert(obj.cuelist[0].endTime == 4637, `Expected endTime 2569, got ${obj.cuelist[0].endTime} instead`);
    console.assert(obj.cuelist[1].startTime == 4738, `Expected startTime 4738, got ${obj.cuelist[1].startTime} instead`);
    console.assert(obj.cuelist[1].endTime == 9042, `Expected endTime 9042, got ${obj.cuelist[1].endTime} instead`);
    console.assert(obj.cuelist[2].startTime == 9476, `Expected startTime 9476, got ${obj.cuelist[2].startTime} instead`);
    console.assert(obj.cuelist[2].endTime == 14681, `Expected endTime 14681, got ${obj.cuelist[2].endTime} instead`);
};
tests.push(test2);

let test3 = function CONVERTSRT2OBJ_TEXTLINES_CORRECTPARSING(){
    const obj = srt2obj.convert(srt);

    console.assert(obj.cuelist[0].textLines.length == 1, `Expected 1 textline for cue 1, got ${obj.cuelist[0].textLines.length} instead`);
    console.assert(obj.cuelist[1].textLines.length == 2, `Expected 2 textline for cue 2, got ${obj.cuelist[1].textLines.length} instead`);
    console.assert(obj.cuelist[2].textLines.length == 1, `Expected 1 textline for cue 3, got ${obj.cuelist[2].textLines.length} instead`);
};
tests.push(test3);

let test4 = function CONVERTSRT2OBJ_IDENTIFIERDOESNOTEXIST_CONVERTIONSUCCEEDS(){
    const obj = srt2obj.convert(srt2);

    console.table(obj);
    console.assert(!obj.cuelist[0].identifier, `Expected null identifier for cue 1, got ${obj.cuelist[0].identifier} instead`);
    console.assert(!obj.cuelist[1].identifier, `Expected null identifier for cue 2, got ${obj.cuelist[1].identifier} instead`);
    console.assert(!obj.cuelist[2].identifier, `Expected null identifier for cue 3, got ${obj.cuelist[2].identifier} instead`);
};
tests.push(test4);

// Run tests
tests.forEach(test => {
    test();
});