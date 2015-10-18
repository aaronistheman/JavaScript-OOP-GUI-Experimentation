"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

/*
    Inherits from GUI.Component
    @param text the text to display on the label
    @param fontFace the font face to use for drawing the label's text
*/
GUI.Label = function(text, fontFace) {
    GUI.Component.call(this);
    this._text = text;
    this._fontFace = fontFace;
    this._fontSize = 15;
};

// Make GUI.Label inherit from GUI.Component
GUI.Label.prototype = Object.create(GUI.Component.prototype, {
    constructor : {
        configurable : true,
        enumerable : true,
        value : GUI.Label,
        writable : true
    }
});

GUI.Label.prototype.isSelectable = function() {
    return false;
}

GUI.Label.prototype.draw = function(graphicsCanvas, textCanvas) {
    // to be implemented later
}