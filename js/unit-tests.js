"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

QUnit.module("component.js");

QUnit.test("Component.prototype.isSelectable()", function(assert) {
    var exceptionThrown = false;
    try {
        var component = new GUI.Component();
        component.isSelectable();
    }
    catch(err) {
        exceptionThrown = true;
    }
    assert.ok(exceptionThrown, "Method is unofficially abstract");
});

QUnit.test("Other aspects of Component", function(assert) {
    var component = new GUI.Component();
    assert.ok(component.constructor === GUI.Component,
        "Side effect of using object literal notation to overwrite " +
        "the prototype was avoided");
});