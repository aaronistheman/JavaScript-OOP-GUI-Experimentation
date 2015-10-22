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
    assert.ok(object.hasOwnProperty("_isSelected"),
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

QUnit.module("button.js");

QUnit.test("Button()", function(assert) {
    testInheritanceFromComponent(assert, GUI.Button, "Button");
    testConstructorScopeSafety(assert, GUI.Button, "Button");
});

QUnit.test("Button.prototype.select()", function(assert) {
    var button = new GUI.Button("trivial");
    button.select();
    assert.ok(button._isSelected,
        "Button's state has been updated to reflect its being selected");
    assert.deepEqual(button._textColor, GUI.Button.TEXT_COLORS.SELECTED,
        "Button's text color has been updated");
});

// This test assumes that GUI.Button.prototype.select() works
QUnit.test("Button.prototype.deselect()", function(assert) {
    var button = new GUI.Button("trivial");
    button.select();
    button.deselect();
    assert.deepEqual(button._isSelected, false,
        "Button's state has been updated to reflect its being deselected");
    assert.deepEqual(button._textColor, GUI.Button.TEXT_COLORS.UNSELECTED,
        "Button's text color has been updated");
});

QUnit.test("Button.prototype.activate()", function(assert) {
    var button = new GUI.Button("trivial");
    button.activate();
    assert.ok(button._isActive,
        "This method accesses the supertype (Component) version");

    var callbackWasCalled = false;
    button.setCallback(function() {
        callbackWasCalled = true;
    });
    button.activate();
    assert.ok(callbackWasCalled,
        "Activating a button triggers the callback");
});

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

QUnit.module("container.js");

QUnit.test("Container()", function(assert) {
    testInheritanceFromComponent(assert, GUI.Container, "Container");
    testConstructorScopeSafety(assert, GUI.Container, "Container");
});

QUnit.test("Container.prototype.pack()", function(assert) {
    // Add two unselectable components, two selectable components, and
    // then a final unselectable component, so that the third component
    // should be selected
    var container = new GUI.Container();
    container.pack(new GUI.Label());
    container.pack(new GUI.Icon());
    container.pack(new GUI.Button());
    container.pack(new GUI.Button());
    container.pack(new GUI.Container());

    assert.deepEqual(container._children.length, 5,
        "Each Component was added");
    assert.ok(container._children[2].isSelected(),
        "Selected correct Component");
    assert.ok(!(container._children[0].isSelected() ||
        container._children[1].isSelected() ||
        container._children[3].isSelected() ||
        container._children[4].isSelected()),
        "Correctly, none of the wrong Components were selected");
});

QUnit.test("Container.prototype.select()", function(assert) {
    var container = new GUI.Container();
    container.pack(new GUI.Label());
    container.pack(new GUI.Button());
    container.pack(new GUI.Button());

    container.select(0);
    assert.ok((container._selectedChild === 1) &&
        (!container._children[0].isSelected()) &&
        container._children[1].isSelected(),
        "Nothing happens if indicated component isn't selectable");
    container.select(2);
    assert.ok((container._selectedChild === 2) &&
        (!container._children[1].isSelected()) &&
        container._children[2].isSelected(),
        "Indicated component was successfully selected");
})

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