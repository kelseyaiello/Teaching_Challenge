"use strict";

$(document).ready(function() {
    var world = Physics();

    var renderer = Physics.renderer('canvas', { // renders the canvas
        el: 'viewport', // id of the canvas element
        width: 1000,
        height: 750,
        styles:{
            "circle":
            {
                fillStyle: "orange"
            }
        }
    });

    world.add(renderer); //adds the canvas to the world

    world.subscribe("step", function() { //re-renders the canvas for every step
       world.render();
    });

    //creates a circle with radius 35 where the mouse is clicked in the canvas, adds the body to the world
    $("#viewport").click(function(event) {
        var offset = $(this).offset();
        var px = event.pageX - offset.left;
        var py = event.pageY - offset.top;
        var mousePos = Physics.vector();
        mousePos.set(px,py);
        world.add(Physics.body("circle", {
            x: px,
            y: py,
            radius: 35,
            restitution: 1
        }));
    });

    //creates gravity
    var gravity = Physics.behavior("constant-acceleration", {
        acc: {
            x: 0,
            y: 0.0005
        }
    });

    //adds gravity to the world
    world.add(gravity);

    //adds body collision detection
    world.add(Physics.behavior("body-impulse-response"));

    //creates edge detection of the world
    var edgeCollision = Physics.behavior("edge-collision-detection", {
        aabb: Physics.aabb(0, 0, 1000, 750),
        restitution: 1
    });

    //adds edge detection to the world
    world.add(edgeCollision);

    //adds collisions between bodies in the world
    world.add(Physics.behavior("body-collision-detection"));
    //adds broad phase collisions for optimizing collisions
    world.add(Physics.behavior("sweep-prune"));

    Physics.util.ticker.subscribe(function(time, dt) { //world takes a step for ever tick
        world.step(time);
    });

    Physics.util.ticker.start(); //starts the ticker
});
