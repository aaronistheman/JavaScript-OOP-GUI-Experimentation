"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

/*
    This class is meant to be abstract.
*/
GUI.Component = function() {
    if (this.constructor === GUI.Component)
        alertAndThrowException(
            "GUI.Component constructor is abstract");
    else {
        this.isSelected = false;
        this.isActive = false;
    }
};

/*
    Note that this is an abstract method.
    @hasTest yes
    @returns true if this instance is selectable; false, otherwise
*/
GUI.Component.prototype.isSelectable = function() {
    alertAndThrowException(
        "GUI.Component.prototype.isSelectable() is abstract");
};