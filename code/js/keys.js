let keysVar = {
    inputarea: document.getElementsByClassName('inputarea')[0],
    textStart: '',
    textEnd: '',
    files: document.getElementsByClassName('Ftje6d'),
    filePos: 0,
    fnModel: () => { return { class: null, id: null, content: null, base: null } }
}


function asideUpdateFiles() {
    keysVar.files = document.getElementsByClassName('Ftje6d');
    let _tempLength = keysVar.files.length;
    for (let f = 0; f < _tempLength; f++) {
        keysVar.files[f].dataset.asidepos = f;
    }
}

asideUpdateFiles()

function simulate(element, eventName) {
    let options = extend(asideDefaultOptions, arguments[2] || {});
    let oEvent, eventType = null;

    for (let name in asideEventMatchers) {
        if (asideEventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType) {
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
    }


    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        let evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (let property in source)
        destination[property] = source[property];
    return destination;
}

let asideEventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}

let asideDefaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}


document.onkeydown = (e) => {
    let evtobj = window.event ? event : e;
    let word = '';
    if ([74, 75].includes(evtobj.keyCode) && evtobj.altKey) {
        keysVar.filePos += evtobj.keyCode == 74 ? keysVar.filePos == 0 ? keysVar.files.length - 1 : -1 : keysVar.filePos == keysVar.files.length - 1 ? -(keysVar.files.length - 1) : 1;
        ["over", "down", "up"].forEach(el=>simulate(keysVar.files[keysVar.filePos], "mouse" + el))
        for (itemIndex in keysVar.files) {
            if (!isNaN(itemIndex) && itemIndex != keysVar.filePos) {
                keysVar.files[itemIndex].classList.remove('UeVsd');
            }
        }
    }
};