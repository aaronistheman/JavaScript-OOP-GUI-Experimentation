"use strict";

/*
    Author: Aaron Kaloti
    Not for release
*/

var menuState = new MenuState("graphical-canvas", "textual-canvas");

$(document).ready(function() {
    menuState.loadCanvases();
    menuState.draw();
    menuState.setResponseToInput(true);
});