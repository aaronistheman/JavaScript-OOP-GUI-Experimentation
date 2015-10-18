"use strict";

/*
    Author: Aaron Kaloti
    Not for release
    
    This file includes code that isn't easily assigned to one
    of the other JavaScript files.
*/

// Namespace for GUI object prototypes
var GUI = {};

/*
    @returns true if currently unit testing, false otherwise
*/
function isUnitTesting() {
    return $("#qunit").length === 1;
}

/*
    @post the message has been used in an alert (if unit tests are
    not occuring) and thrown as an exception
    @param message
*/
function alertAndThrowException(message) {
    if (!isUnitTesting())
        alert(message);
    throw message;
}