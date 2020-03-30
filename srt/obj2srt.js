String.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

export class Obj2Srt{
    convert(obj){
        let srt = "";

        obj.cuelist.forEach(cue => {
            // Identifier
            console.log(cue);
            if(cue.identifier) srt += cue.identifier + '\n';

            // Timestamp
            if(cue.startTime){
                const milli   = Math.floor(cue.startTime % 1000).pad(3);
                const seconds = Math.floor((cue.startTime / 1000) % 60).pad(2);
                const minutes = Math.floor((cue.startTime / (1000*60)) % 60).pad(2);
                const hours   = Math.floor(cue.startTime / (1000*60*60)).pad(2);

                srt += `${hours}:${minutes}:${seconds},${milli}`;
            }
            srt += ' --> ';
            if(cue.endTime){
                const milli   = Math.floor(cue.endTime % 1000).pad(3);
                const seconds = Math.floor((cue.endTime / 1000) % 60).pad(2);
                const minutes = Math.floor((cue.endTime / (1000*60)) % 60).pad(2);
                const hours   = Math.floor(cue.endTime / (1000*60*60)).pad(2);

                srt += `${hours}:${minutes}:${seconds},${milli}`;
            }
            srt += '\n';

            // Text Lines
            srt += cue.textLines.join('\n');

            // Cue Separation
            srt += '\n\n';
        });

        return srt.trim();
    }
}