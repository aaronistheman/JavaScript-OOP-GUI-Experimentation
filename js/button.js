"use strict";

/*
    Translated (from C++ to JavaScript) by: Aaron Kaloti
    Authors of original (C++) version: Artur Moreira,
        Henrik Vogelius Hansson, and Jan Haller
    Not for release
*/

/*
    Inherits from GUI.Component
    @pre the image parameters are instances of Image
    @hasTest yes
    @param fontFace the font face to use for drawing the button's text;
    should be a string
*/
GUI.Button = function(fontFace) {
    if (!(this instanceof GUI.Button))
        return new GUI.Button(fontFace);
    else {
        GUI.Component.call(this);

        this._callback = undefined;

        var _text = undefined;
        Object.defineProperty(this, "text", {
            get : function() {
                return _text;
            },
            set : function(text) {
                _text = text;
            },
            enumerable : true,
            configurable : true
        });

        this._textColor = GUI.Button.TEXT_COLORS.UNSELECTED;

        this.draw = function(graphicsCanvas, textCanvas) {
            // to be implemented later
        }
    }
};

// Make GUI.Button inherit from GUI.Component
GUI.Button.prototype = Object.create(GUI.Component.prototype, {
    constructor : {
        configurable : true,
        enumerable : true,
        value : GUI.Button,
        writable : true
    }
});

/*
    @param callback function to assign to this._callback
*/
GUI.Button.prototype.setCallback = function(callback) {
    this._callback = callback;
};

GUI.Button.prototype.isSelectable = function() {
    return true;
};

/*
    @post the button has been updated to reflect its having been
    selected; its text color has been changed
    @hasTest yes
*/
GUI.Button.prototype.select = function() {
    GUI.Component.prototype.select.call(this);
    this._textColor = GUI.Button.TEXT_COLORS.SELECTED;
};

/*
    @post the button has been updated to reflect its having been
    deselected; its text color has been changed
    @hasTest yes
*/
GUI.Button.prototype.deselect = function() {
    GUI.Component.prototype.deselect.call(this);
    this._textColor = GUI.Button.TEXT_COLORS.UNSELECTED;
};

/*
    @post the button has been updated appropriately, and its
    callback, if defined, has been called
    @hasTest yes
*/
GUI.Button.prototype.activate = function() {
    GUI.Component.prototype.activate.call(this);

    if (this._callback !== undefined)
        this._callback();
};

GUI.Button.TEXT_COLORS = {
    UNSELECTED : "white",
    SELECTED : "red",
}