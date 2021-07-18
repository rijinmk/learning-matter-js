import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Matter from 'matter-js'; 

const MatterContainer = () => {

    const [scene, setScene] = useState({}); 
    const sceneRef = useRef(); 

     useEffect(() => {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        var engine = Engine.create({
        // positionIterations: 20
        });

        var render = Render.create({
                element: sceneRef.current,
                engine: engine,
                options: {
                    width: 600,
                    height: 600,
                    wireframes: false
                }
            });

        var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
        var ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
        World.add(engine.world, [
            Bodies.rectangle(100, 100, 100, 100, {isStatic: true}), 
        ]); 

        World.add(engine.world, [ballA, ballB]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false
                        }
                    }
        });

        World.add(engine.world, mouseConstraint);

        Matter.Events.on(mouseConstraint, "mousedown", function(event) {
            World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
        });

        Matter.Runner.run(engine)
        Render.run(render);
     }, [])

    return <div ref={sceneRef} />;
}

export default MatterContainer