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

QUnit.module("label.js");

QUnit.test("Label()", function(assert) {
    var label = new GUI.Label("trivial", "trivial");

    // Test object inheritance
    assert.ok(GUI.Component.prototype.isPrototypeOf(label),
        "Label inherits the prototype of Component");
    assert.ok(label instanceof GUI.Component,
        "Instance of Label is instance of Component");

    // Test constructor stealing
    assert.ok(label.hasOwnProperty("isSelected"),
        "Label steals Component's constructor in its own");
});

QUnit.test("Label.text", function(assert) {
    var label = new GUI.Label("123", "trivial");
    assert.deepEqual(label.text, "123", "Getter for \"_text\" works");
});

QUnit.test("Other aspects of Label", function(assert) {
    var label = new GUI.Label("original", "trivial");
    label._text = "changed";
    assert.deepEqual(label.text, "original",
        "The \"_text\" member of custom type Label is private");
});