"use strict";

/*
    Modified (JavaScript) version by: Aaron Kaloti
    Based on a C++ version by: Artur Moreira,
        Henrik Vogelius Hansson, and Jan Haller
    Not for release
*/

function MenuState() {
    this._GUIContainer = new GUI.Container();

    var button1 = new GUI.Button("Arial");
    button1.setPosition(100, 200);
    button1.text = "Button 1";
    button1.setCallback(function() {
        alert("Button 1 was pressed");
    });

    var button2 = new GUI.Button("Arial");
    button2.setPosition(300, 400);
    button2.text = "Button 2";
    button2.setCallback(function() {
        alert("Button 2 was pressed");
    });

    this._GUIContainer.pack(button1);
    this._GUIContainer.pack(button2);
}