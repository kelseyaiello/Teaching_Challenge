"use strict";

$(document).ready(function() {
    var world = Physics();

    var renderer = Physics.renderer('canvas', {
        el: 'viewport', // id of the canvas element
        width: 1000,
        height: 750
    });

    world.add(renderer);

});
