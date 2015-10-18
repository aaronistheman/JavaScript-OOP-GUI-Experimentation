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

QUnit.module("label.js");

QUnit.test("Label()", function(assert) {
    var label = new GUI.Label("trivial", "trivial");

    // Test object inheritance
    assert.ok(GUI.Component.prototype.isPrototypeOf(label),
        "Label inherits the prototype of Component");
    assert.ok(label instanceof GUI.Component,
        "Instance of Label is instance of Component");

    // Test constructor stealing
    assert.ok(label.hasOwnProperty("_isSelected") &&
        label.hasOwnProperty("_isActive"),
        "Label steals Component's constructor in its own");
});

QUnit.test("Other aspects of Label", function(assert) {
    var label = new GUI.Label("original", "trivial");
    label._text = "changed";
    assert.deepEqual(label.getText(), "original",
        "The \"_text\" member of custom type Label is private");
});