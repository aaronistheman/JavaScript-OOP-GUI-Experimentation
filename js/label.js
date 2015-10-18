"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

// inherits from GUI.Component
GUI.Label = function() {
    GUI.Component.call(this);
};

GUI.Label.prototype = Object.create(GUI.Component.prototype, {
    constructor : {
        configurable : true,
        enumerable : true,
        value : GUI.Label,
        writable : true
    }
});