"use strict";

/*
    Translated (from C++ to JavaScript) by: Aaron Kaloti
    Authors of original (C++) version: Artur Moreira,
        Henrik Vogelius Hansson, and Jan Haller
    Not for release
*/

/*
    This class is meant to be abstract.
    @hasTest yes
*/
GUI.Component = function() {
    if (this.constructor === GUI.Component)
        alertAndThrowException(
            "GUI.Component constructor is abstract");
    else {
        this._isSelected = false;
        this._isActive = false;
    }
};

GUI.Component.prototype = {
    constructor : GUI.Component,

    /*
        Note that this is an abstract method.
        @hasTest yes
        @returns true if this instance is selectable; false, otherwise
    */
    isSelectable : function() {
        alertAndThrowException(
            "GUI.Component.prototype.isSelectable() is abstract");
    },

    isSelected : function() {
        return this._isSelected;
    },

    select : function() {
        this._isSelected = true;
    },

    deselect : function() {
        this._isSelected = false;
    },

    isActive : function() {
        return this._isActive;
    },

    activate : function() {
        this._isActive = true;
    },

    deactivate : function() {
        this._isActive = false;
    },
};