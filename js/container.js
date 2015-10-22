"use strict";

/*
    Translator (from C++ to JavaScript): Aaron Kaloti
    Authors of original (C++) version: Artur Moreira,
        Henrik Vogelius Hansson, and Jan Haller
    Not for release
*/

/*
    Inherits from GUI.Component
    @hasTest yes
*/
GUI.Container = function() {
    if (!(this instanceof GUI.Container))
        return new GUI.Container();
    else {
        GUI.Component.call(this);

        this._children = [];
        this._selectedChild = -1;
    }
};

// Make GUI.Container inherit from GUI.Component
GUI.Container.prototype = Object.create(GUI.Component.prototype, {
    constructor : {
        configurable : true,
        enumerable : true,
        value : GUI.Container,
        writable : true
    }
});

/*
    @post the given component has been added to this container;
    if none of the elements in the container are selected and
    the given component can be selected, it will be
    @hasTest yes
    @param component to add to the container; is an instance of
    Component or of a subtype of Component
*/
GUI.Container.prototype.pack = function(component) {
    this._children.push(component);

    if (!this.hasSelection() && component.isSelectable())
        this.select(this._children.length - 1);
};

GUI.Container.prototype.isSelectable = function() {
    return false;
};

GUI.Container.prototype.draw = function() {
    // to be implemented later
};

GUI.Container.prototype.hasSelection = function() {
    return this._selectedChild >= 0;
};

/*
    @post the currently selected component (if any) has been
    deselected, and the stored component indicated by the given index
    has been selected; does nothing if the indicated component isn't
    selectable
    @hasTest yes
    @param index of the component in this._children to select
*/
GUI.Container.prototype.select = function(index) {
    if (this._children[index].isSelectable()) {
        if (this.hasSelection())
            this._children[this._selectedChild].deselect();

        this._children[index].select();
        this._selectedChild = index;
    }
};

/*
    @post the next selectable component has been selected,
    or nothing happened if this container doesn't have a selected
    component
*/
GUI.Container.prototype.selectNext = function() {
    if (!this.hasSelection())
        return;

    // Search for next selectable component; wrap around if necessary
    var next = this._selectedChild;
    do
        next = (next + 1) % this._children.size();
    while (!this._children[next].isSelectable());

    // Select that component
    this.select(next);
};

/*
    @post the most previous selectable component has been selected,
    or nothing happened if this container doesn't have a selected
    component
*/
GUI.Container.prototype.selectPrevious = function() {
    if (!this.hasSelection())
        return;

    // Search for previous selectable component; wrap around if necessary
    var prev = this._selectedChild;
    do
        prev = (prev + this._children.size() - 1) % this._children.size();
    while (!this._children[prev].isSelectable());

    // Select that component
    this.select(prev);
};