"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

QUnit.module("component.js");

QUnit.test("Component()", function(assert) {
    var exceptionThrown = false;
    try {
        var component = new GUI.Component();
    }
    catch (err) {
        exceptionThrown = true;
    }
    assert.ok(exceptionThrown, "Constructor is abstract");
});

QUnit.test("Component.prototype.isSelectable()", function(assert) {
    var exceptionThrown = false;
    try {
        var trivialObject = {};
        GUI.Component.prototype.isSelectable.call(trivialObject);
    }
    catch(err) {
        exceptionThrown = true;
    }
    assert.ok(exceptionThrown, "Method is unofficially abstract");
});

QUnit.module("icon.js");

QUnit.test("Icon()", function(assert) {
    var icon = new GUI.Icon("trivial", "trivial");

    // Test object inheritance
    assert.ok(GUI.Component.prototype.isPrototypeOf(icon),
        "Icon inherits the prototype of Component");
    assert.ok(icon instanceof GUI.Component,
        "Instance of Icon is instance of Component");

    // Test constructor stealing
    assert.ok(icon.hasOwnProperty("isSelected"),
        "Icon steals Component's constructor in its own");

    // Test constructor's scope-safety
    var icon2 = GUI.Icon("trivial", "trivial");
    assert.ok((icon2 instanceof GUI.Icon) && (typeof icon2 === "object"),
        "Constructor of Icon is scope-safe");
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

    // Test constructor's scope-safety
    var label2 = GUI.Label("trivial", "trivial");
    assert.ok((label2 instanceof GUI.Label) && (typeof label2 === "object"),
        "Constructor of Label is scope-safe");
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