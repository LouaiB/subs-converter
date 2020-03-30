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

export class Obj2Ass{
    convert(obj){
        let ass = "";

        // Script Info
        ass += "[Script Info]\n";
        obj.meta.scriptInfo?.forEach(info => {
            ass += `${info.key}:${info.value}\n`;
        });

        // Styles
        ass += "\n[V4 Styles]\n";
        obj.meta.styles?.forEach((style, index) => {
            if(index == 0){
                ass += `Format: ${style.map(s => s.attribute).join(',')}\n`;
            }

            ass += `Style: ${style.map(s => s.value).join(',')}\n`
        });

        // Events
        ass += "\n[Events]\n";
        obj.cuelist.forEach((cue, index) => {
            const cueFormatAttr = cue.meta.map(el => el.attribute);
            const cueFormatAttrLengthWithoutLayer = cueFormatAttr.filter(el => el != 'Layer').length;
            if(index == 0){
                ass += `Format: Layer,Start,End,${cueFormatAttrLengthWithoutLayer > 0 ? cueFormatAttr.filter(el => el != 'Layer').join(',') + ',' : ''}Text\n`;
            }

            ass += `Dialogue: ${cueFormatAttr.includes('Layer') ? cue.meta.find(el => el.attribute == 'Layer').value + ',' : '0,'}`;
            if(cue.startTime){
                const milli   = Math.floor((cue.startTime % 1000) / 10).pad(2);
                const seconds = Math.floor((cue.startTime / 1000) % 60).pad(2);
                const minutes = Math.floor((cue.startTime / (1000*60)) % 60).pad(2);
                const hours   = Math.floor(cue.startTime / (1000*60*60)).pad(2);

                ass += `${hours}:${minutes}:${seconds}.${milli}`;
            }
            ass += ",";
            if(cue.endTime){
                const milli   = Math.floor((cue.endTime % 1000) / 10).pad(2);
                const seconds = Math.floor((cue.endTime / 1000) % 60).pad(2);
                const minutes = Math.floor((cue.endTime / (1000*60)) % 60).pad(2);
                const hours   = Math.floor(cue.endTime / (1000*60*60)).pad(2);

                ass += `${hours}:${minutes}:${seconds}.${milli}`;
            }
            ass += ",";
            ass += `${cueFormatAttrLengthWithoutLayer > 0 ? cue.meta.filter(el => el.attribute != 'Layer').map(el => el.value).join(',') + ',' : ''}`;
            ass += `${cue.textLines.join('\\N')}\n`;
        });

        return ass.trim();
    }
}