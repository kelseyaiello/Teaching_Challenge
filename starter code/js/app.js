"use strict";

$(document).ready(function() {
    var world = Physics(); //creates the world

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

    var gravity = Physics.behavior("constant-acceleration", {
        acc: {
            x: 0,
            y: 0.0005
        }
    });

    world.add(gravity);

    world.add(Physics.behavior("body-impulse-response"));

    var edgeCollision = Physics.behavior("edge-collision-detection", {
        aabb: Physics.aabb(0, 0, 1000, 750), 
            restitution: 1
    })

    world.add(edgeCollision);

    world.add( Physics.behavior("body-collision-detection"));
    world.add(Physics.behavior("sweep-prune"));

    Physics.util.ticker.subscribe(function(time, dt) { //world takes a step for ever tick
        world.step(time);
    });

    Physics.util.ticker.start(); //starts the ticker
});
