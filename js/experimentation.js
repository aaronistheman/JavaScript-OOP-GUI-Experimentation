"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

$(document).ready(function() {
    var button1 = new GUI.Button("Arial");
    button1.setPosition(100, 200);
    button1.text = "Button 1";
    button1.setCallback(function() {
        alert("Button 1 was pressed");
    });
    button1.draw(document.getElementById("graphical-canvas"),
        document.getElementById("textual-canvas"));
});