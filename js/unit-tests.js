"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

/*
    @pre when used as a constructor, customType must be okay
    with having no arguments supplied to it
    @post some assertions have been run to see if an instance of the
    given type inherits from Component.prototype (and steals its
    constructor)
    @param assert needed to be able to do QUnit assertions
    @param customType the type to evaluate; should be a constructor's
    name
    @param nameOfType custom type's name that will be used in the
    tests' messages; must be a string
*/
function testInheritanceFromComponent(assert, customType, nameOfType) {
    var object = new customType();

    // Test object inheritance
    assert.ok(GUI.Component.prototype.isPrototypeOf(object),
        nameOfType + " inherits the prototype of Component");
    assert.ok(object instanceof GUI.Component,
        "Instance of " + nameOfType + " is instance of Component");

    // Test constructor stealing
    assert.ok(object.hasOwnProperty(Object.keys(object)[0]),
        nameOfType + " steals Component's constructor in its own");
}

/*
    @pre when used as a constructor, customType must be okay
    with having no arguments supplied to it
    @post some assertions have been run to see if the constructor
    of customType is scope-safe
    @param assert needed to be able to do QUnit assertions
    @param customType the type to evaluate; should be a constructor's
    name
    @param nameOfType custom type's name that will be used in the
    tests' messages; must be a string
*/
function testConstructorScopeSafety(assert, customType, nameOfType) {
    var object = customType();
    assert.ok((object instanceof customType) && (typeof object === "object"),
        "Constructor of " + nameOfType + " is scope-safe");
}

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
    testInheritanceFromComponent(assert, GUI.Icon, "Icon");
    testConstructorScopeSafety(assert, GUI.Icon, "Icon");
});

QUnit.module("label.js");

QUnit.test("Label()", function(assert) {
    testInheritanceFromComponent(assert, GUI.Label, "Label");
    testConstructorScopeSafety(assert, GUI.Label, "Label");
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