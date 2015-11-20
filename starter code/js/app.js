"use strict";

$(document).ready(function() {
    var world = Physics(); //creates the world

    var renderer = Physics.renderer('canvas', { // renders the canvas
        el: 'viewport', // id of the canvas element
        width: 1000,
        height: 750
    });

    world.add(renderer); //adds the canvas to the world

    world.subscribe("step", function() { //re-renders the canvas for every step
       world.render();
    });

    Physics.util.ticker.subscribe(function(time, dt) { //world takes a step for ever tick
        world.step(time);
    });

    Physics.util.ticker.start(); //starts the ticker
});
