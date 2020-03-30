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

export class Obj2Webvtt{
    convert(obj){
        let webvtt = "WEBVTT\n\n";

        obj.cuelist.forEach(cue => {
            // Identifier
            console.log(cue);
            if(cue.identifier) webvtt += cue.identifier + '\n';

            // Timestamp
            if(cue.startTime){
                const milli   = Math.floor(cue.startTime % 1000).pad(3);
                const seconds = Math.floor((cue.startTime / 1000) % 60).pad(2);
                const minutes = Math.floor((cue.startTime / (1000*60)) % 60).pad(2);
                const hours   = Math.floor(cue.startTime / (1000*60*60)).pad(2);

                webvtt += `${hours}:${minutes}:${seconds}.${milli}`;
            }
            webvtt += ' --> ';
            if(cue.endTime){
                const milli   = Math.floor(cue.endTime % 1000).pad(3);
                const seconds = Math.floor((cue.endTime / 1000) % 60).pad(2);
                const minutes = Math.floor((cue.endTime / (1000*60)) % 60).pad(2);
                const hours   = Math.floor(cue.endTime / (1000*60*60)).pad(2);

                webvtt += `${hours}:${minutes}:${seconds}.${milli}`;
            }
            webvtt += '\n';

            // Text Lines
            webvtt += cue.textLines.join('\n');

            // Cue Separation
            webvtt += '\n\n';
        });

        return webvtt.trim();
    }
}