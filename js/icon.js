"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

/*
    Inherits from GUI.Component
    @hasTest yes
    @param image instance of Image to attach to the icon
*/
GUI.Icon = function(image) {
    if (!(this instanceof GUI.Icon))
        return new GUI.Icon(image);
    else {
        GUI.Component.call(this);

        var _image = image;
        Object.defineProperty(this, "image", {
            get : function() {
                return _image;
            },
            set : undefined,
            enumerable : true,
            configurable : true
        });

        this.draw = function(graphicsCanvas, textCanvas) {
            // to be implemented later
        }
    }
};

// Make GUI.Icon inherit from GUI.Component
GUI.Icon.prototype = Object.create(GUI.Component.prototype, {
    constructor : {
        configurable : true,
        enumerable : true,
        value : GUI.Icon,
        writable : true
    }
});

GUI.Icon.prototype.isSelectable = function() {
    return false;
}