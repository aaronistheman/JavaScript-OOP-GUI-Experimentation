"use strict";

/*
    Original Author: Aaron Kaloti
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

        /*
            See draw() of supertype GUI.Component for general
            description; note that the textualCanvas argument
            isn't used here
            @post the icon, which is solely an image, has been
            drawn on the given graphical canvas; note that the icon's
            position is its top-left coordinate
        */
        this.draw = function(graphicalCanvas, textualCanvas) {
            var context = graphicalCanvas.getContext('2d');
            var that = this;
            alert(this.naturalWidth);
            this.image.onload = function() {
                alert(this.naturalWidth);
                context.drawImage(this, that._positionX, that._positionY);
            };
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