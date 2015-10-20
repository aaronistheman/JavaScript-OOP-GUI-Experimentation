"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

/*
    Inherits from GUI.Component
    @hasTest yes
    @param text the text to display on the label
    @param fontFace the font face to use for drawing the label's text;
    should be a string
*/
GUI.Label = function(text, fontFace) {
    if (!(this instanceof GUI.Label))
        return new GUI.Label(text, fontFace);
    else {
        GUI.Component.call(this);

        var _text = text;
        Object.defineProperty(this, "text", {
            get : function() {
                return _text;
            },
            set : undefined,
            enumerable : true,
            configurable : true
        });

        this.fontFace = fontFace;
        this.fontSize = 15;

        this.draw = function(graphicsCanvas, textCanvas) {
            // to be implemented later
        }
    }
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