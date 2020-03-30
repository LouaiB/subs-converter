import { SubsConverter } from "../subs-converter.js";

const tests = [];
const subsConverter = new SubsConverter();

// SAMPLES
const sampleAss = 
`[Script Info]
; Script generated by Aegisub 2.1.8
; http://www.aegisub.org/
Title:漫游字幕
Original Script:漫游字幕组
Synch Point:0
ScriptType: v4.00+
Collisions:Normal
PlayResX:1280
PlayResY:720
Video Zoom Percent: 0.5
Scroll Position: 18
Active Line: 23
YCbCr Matrix: TV.601
Video Aspect Ratio: 0
Video Position: 0
Audio URI: [ohys] Rou Kyuu Bu! SS - 10 (ATXHD 1280x720 x264 AAC).mp4
Timer:100.0000
Video Zoom: 6
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Non Non Biyori,浪漫雅圆,50,&H00FFFFFF,&H30000000,&H30000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,2,2,20,20,36,134
Style: staff,微软雅黑,40,&H00FFFFFF,&H00C81938,&H00C92F4A,&H00E0526B,0,0,0,0,100,100,0,0,1,2,0,5,5,5,0,134
Style: staff0,微软雅黑,75,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00FFFFFF,-1,0,0,0,100,100,0,0,1,2,0,2,5,5,5,1
Style: music,浪漫雅圆,40,&H00FFFFFF,&HF0FF9999,&H00FF00FF,&H8000CCFF,0,0,0,0,100,100,0,0,1,3,0,2,10,10,10,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text


Dialogue: 0,0:02:26.31,0:02:27.68,Non Non Biyori,NTP,0000,0000,0000,,ここがうちの村
Dialogue: 0,0:02:28.53,0:02:30.64,Non Non Biyori,NTP,0000,0000,0000,,のんびり長閑なところまん
Dialogue: 0,0:02:32.06,0:02:34.84,Non Non Biyori,NTP,0000,0000,0000,,でも　時々思うのん
Dialogue: 0,0:02:36.08,0:02:37.49,Non Non Biyori,NTP,0000,0000,0000,,もしかしてうちは
Dialogue: 0,0:02:38.34,0:02:40.00,Non Non Biyori,NTP,0000,0000,0000,,れんちょん
Dialogue: 0,0:02:55.22,0:02:56.92,Non Non Biyori,NTP,0000,0000,0000,,田舎に住んでるのん
Dialogue: 0,0:04:31.94,0:04:32.84,Non Non Biyori,NTP,0000,0000,0000,,おはよう
Dialogue: 0,0:04:36.65,0:04:37.37,Non Non Biyori,NTP,0000,0000,0000,,なんだって
Dialogue: 0,0:04:38.06,0:04:39.38,Non Non Biyori,NTP,0000,0000,0000,,にゃんぱすー
Dialogue: 0,0:04:39.86,0:04:41.42,Non Non Biyori,NTP,0000,0000,0000,,どのみち訳わからん
Dialogue: 0,0:04:41.76,0:04:42.68,Non Non Biyori,NTP,0000,0000,0000,,なんなのそれ
Dialogue: 0,0:04:46.67,0:04:48.96,Non Non Biyori,NTP,0000,0000,0000,,にゃん\\Nぱすー
Dialogue: 0,0:04:52.04,0:04:53.63,Non Non Biyori,NTP,0000,0000,0000,,にゃん　ぱすー
Dialogue: 0,0:04:54.72,0:04:55.59,Non Non Biyori,NTP,0000,0000,0000,,コマちゃんは
Dialogue: 0,0:04:55.88,0:04:57.40,Non Non Biyori,NTP,0000,0000,0000,,姉ちゃんは先に出た
Dialogue: 0,0:04:58.12,0:05:01.94,Non Non Biyori,NTP,0000,0000,0000,,はー　こんなに天気いいのに今日も学校か
Dialogue: 0,0:09:45.43,0:09:49.27,Non Non Biyori,NTP,0000,0000,0000,,バケツ動かして雨漏りの位置わから{grid/move/down} なくなったら面倒ですし
Dialogue: 0,0:09:45.43,0:09:49.27,Non Non Biyori,NTP,0000,0000,0000,,バケツ動かしわから\\Nなくすし`;

let test1 = function CONVERTSRT2WEBVTT_STRINGRESULT_CORRECTMATCH(){
    const webvtt = subsConverter.convert(sampleAss, {
        from: subsConverter.Formats.ASS,
        to: subsConverter.Formats.WEBVTT
    });

    console.log(webvtt);
};
tests.push(test1);

// Run tests
tests.forEach(test => {
    test();
});