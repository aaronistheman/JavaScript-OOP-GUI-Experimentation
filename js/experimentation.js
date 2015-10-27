"use strict";

/*
    Author: Aaron Kaloti
    For experimentation
*/

var menuState = new MenuState("graphical-canvas", "textual-canvas");

$(document).ready(function() {
    menuState.loadCanvases();
    menuState.draw();
    menuState.setResponseToInput(true);
});