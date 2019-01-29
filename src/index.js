// // import * as THREE from 'three';
// // import CANNON from 'cannon';
// // import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
// // import Material from './materials.mtl';
// // import Model from './model.obj';
// // let camera, renderer;
// // let geometry, material, mesh, sphereShape, sphereBody;
// // console.log(Model);
// // var sphereShape, sphereBody;
// require('aframe');
require('aframe-extras');
require('aframe-physics-system');
require('aframe-look-at-component');
require('aframe-playground-components');

require('./PlayerControls');
import registerClickDrag from 'aframe-click-drag-component';
import AFRAME from 'aframe';
// require('aframe-aterrain-component');

registerClickDrag(AFRAME);


AFRAME.registerComponent('score-counter', {
    schema: {
        el: {
            type: 'selector'
        },
        time:{
            type: 'int',
            default: 0
        },
    },

    init: function () {


    },
    tick: function (time, timeDelta) {

        let scoreBoard = document.querySelector('#score');
        scoreBoard.setAttribute('text', 'text: '+ d.toLocaleString("ru", options) + '; font: Droid Sans Mono; size: .77;');




    }
});

AFRAME.registerComponent('link-click',{
    init: function () {
            this.el.addEventListener('click', function (evt) {
            window.location.pathname = "./vyber_postav.html/";

        })

    },

})

AFRAME.registerComponent('propagate', {
    schema: {
        events: {type: 'array', default: []},
    },
    init: function () {
        var self  = this
        var parentEntity = this.el

        parentEntity.addEventListener('click', function (e) {
            walk(parentEntity, function (child) {
                emitEvents(child)
                console.log(self, "scene",parentEntity);
            })
        })

        function walk(node, func) {
            var children = node.children;
            for (var i = 0; i < children.length; i++) {
                walk(children[i], func);
            }
            func(node);
        }

        function emitEvents (entity) {
            for (var i = 0; i < self.data.events.length; i++) {
                entity.emit(self.data.events[i])
            }
        }
    }
});


AFRAME.registerComponent('main-ui', {
    schema: {
        events: {type: 'string', default: ''},
    },
    init: function ()
    {
        var viewButton = document.querySelector('#center-tile-cta')
        var mainCamera = document.querySelector('#main-camera')
        var mainBg = document.querySelector('#main-bg')
        var tiles = document.querySelectorAll('.tile')

        viewButton.addEventListener('click', function (e) {
            // Tell the camera to start its animation forward
            mainCamera.emit('viewDetail')



            // Wait till the last millisecond to swap the background
            // and make it brighter.
            // Finally hide the tiles.
            setTimeout(function()
            {
                mainBg.setAttribute('material', 'src', '#detail-bg')
                mainBg.setAttribute('rotation', { x: 0, y: 90, z: 0 });

                mainBg.setAttribute('material', 'color', '#fff');

                let link = document.querySelector('a-link')
                link.addEventListener('click', function (evt) {
                    window.location.pathname = "./vyber_postav.html/";
                })
                // hideTiles(
                hideTiles();


            }, 999)

            function hideTiles ()
            {
                for (var i = 0; i< tiles.length; i++) {
                    tiles[i].setAttribute('visible', false)
                }
            }
        })
    }
});

// AFRAME.registerComponent('rendercam', {
// //     init:function(){
// //         let scene = document.querySelector('a-scene');
// //         let camera1 = THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1 , 1000);
// //         camera1.setAttribute('camera', 'active', true);
// //         scene.add(camera1);
// //
// //         console.log(scene.el.renderer);
// //
// //     },
// //     update: function() {
// //         let camera1 = THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1 , 1000);
// //         let scene = document.querySelector('a-scene');
// //         let renderer = scene.el.renderer;
// //         renderer.render(camera1,scene);
// //
// //
// //     }
// // })

AFRAME.registerComponent('rotation-reader1', {
    /**
     * We use IIFE (immediately-invoked function expression) to only allocate one
     * vector or euler and not re-create on every tick to save memory.
     */
    tick: (function () {
        var position = new THREE.Vector3();
        var rotation = new THREE.Euler();

        return function () {
            console.log(this.el.object3D.getWorldPosition(position), "position-Object");
            this.el.object3D.getWorldRotation(rotation);
            // position and rotation now contain vector and euler in world space.
        };
    })
});

AFRAME.registerComponent('camera-logger', {

    schema: {
        timestamp: {type: 'int'},
        seconds: {type: 'int'} // default 0
    },

    log : function () {
        var cameraEl = this.el.sceneEl.camera.el;
        var rotation = cameraEl.getAttribute('rotation');
        var worldPos = new THREE.Vector3();
        worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);
        console.log("Time: " + this.data.seconds
            + "; Camera Position: (" + worldPos.x.toFixed(2) + ", " + worldPos.y.toFixed(2) + ", " + worldPos.z.toFixed(2)
            + "); Camera Rotation: (" + rotation.x.toFixed(2) + ", " + rotation.y.toFixed(2) + ", " + rotation.z.toFixed(2) + ")");
    },

    play: function () {
        this.data.timestamp = Date.now();
        this.log();
    },

    tick: function () {
        if (Date.now() - this.data.timestamp > 1000) {
            this.data.timestamp += 1000;
            this.data.seconds += 1;
            this.log();
        }
    },
});

AFRAME.registerComponent('rotation-reader', {
    init: function(){
        let object = document.getElementById('warr').object3D;
        let camera = this.el.object3D;
        object.position.set(0, 0 ,-100);
        camera.add(object);
    },
    tick: function () {
        // `this.el` is the element.
        // `object3D` is the three.js object.

        // `rotation` is a three.js Euler using radians. `quaternion` also available.

        let object = document.getElementById('warr');
        // object.position.copy(this.el.object3D.position);
        // console.log(this.el, "rotation", object.position,"position",this.el);

        // `position` is a three.js Vector3.
        // console.log(this.el.object3D.position);

        // const targetItem = object;
        // console.log(object, "object");
        // var distance = {
        //     x : 1,
        //     y : 1,
        //     z : 1,
        // }
        // var el = this.el;
        // var entity = object;
        // var entityRotation;
        // var matrixWorld = el.object3D.matrixWorld;
        // var position = new THREE.Vector3();
        // var rotation = this.el.getAttribute('position');
        //
        // position.setFromMatrixPosition(matrixWorld);
        // entity.setAttribute('position', position);
        // entity.setAttribute('mixin', this.data.mixin);
        // entity.addEventListener('tick', function () {
        //     entityRotation = entity.getComputedAttribute('position');
        //     entity.setAttribute('position', {
        //         x: entityRotation.x + rotation.x,
        //         y: entityRotation.y  + rotation.y,
        //         z: entityRotation.z  +10 + rotation.z
        //     });
        // });
    }
});

// var t = 0;
// function render() {
//     t += 0.01;
//     requestAnimationFrame(render);
//     // console.log(Math.sin(t*2));
//     // let render = new THREE.WebGLRenderer();
//
//     // renderer.render(scene, camera);
// }
// render();

AFRAME.registerComponent('createstaticcube', {
 init: function () {
     var data = this.data;
     var el = this.el;  // <a-box>
     var defaultColor = el.getAttribute('material').color;

     this.onmousedown = this.onmousedown.bind(this);
     window.addEventListener('onmousedown', this.onmousedown);
     this.onClick = this.onClick.bind(this);
     window.addEventListener('onClick', this.onClick);
     console.log("iniiiiiiiiiiiiii");
 },
    onmousedown: function (evt) {
        console.log(cube, "sss",evt);
        let cube = document.querySelector('cube-box');
        console.log(cube, "sss",evt);
    }
    ,
    onClick: function () {
        console.log("onclick111111");

    },
 

});

AFRAME.registerComponent('button', {
    init: function () {
        this.onKeydown = this.onKeydown.bind(this);
        window.addEventListener('keydown', this.onKeydown);
        // var box = this.el.getOrCreateObject3D('mesh');
        // var loader = new THREE.CubeTextureLoader();
        // loader.setPath('/images/diceTextures/');
        // var textureCube = loader.load([
        //     '1.png', '2.png'
        // ]);

        // box.material = new THREE.MeshStandardMaterial({envMap: textureCube);
    },
     onKeydown: function (evt) {
        let shortcutPressed = evt.keyCode;
        //object position and rotation
        let scene = document.querySelector('a-scene');
        let rotation = this.el.getAttribute('position');

        let camera = document.getElementById('camera');
        let positionC = camera.getAttribute('position');



         var worldPos = new THREE.Vector3();
         worldPos.setFromMatrixPosition(camera.object3D.matrixWorld);
         console.log("Camera position: (" + worldPos.x.toFixed(2) + ", " + worldPos.y.toFixed(2) + ", " + worldPos.z.toFixed(2));
         // dir.sub(positionC).normalize(); // d

         worldPos.z =worldPos.z + 5.9;
         // worldPos.x = worldPos.x  +5;
        // console.log(positionC);
        if (shortcutPressed ===  13) {
            // console.log(this.el.getAttribute('position'));
            var buttonEntity = document.createElement("a-entity");
            buttonEntity.setAttribute('geometry', `primitive: box; width: 0.5; height: 0.5; depth: 0.5;`);
            buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: #EF2D5E`);
            buttonEntity.setAttribute('rotation', '0 0 0');
            buttonEntity.setAttribute('position', worldPos);
            buttonEntity.setAttribute('static-body', '');
            buttonEntity.setAttribute('click-drag', '');
            // buttonEntity.lookAt(worldPos)
            scene.appendChild(buttonEntity);
            console.log(buttonEntity.getAttribute('position'));


        }
    }
});


AFRAME.registerComponent('push', {
    dependencies: ['keyboard-controls'],

    multiple: true,

    init: function(){

        this.el.addEventListener('body-loaded', () => {

            this.el.addEventListener('keydown:KeyP', () => {

                var force = new CANNON.Vec3(0, 0, -20)
                var local = new CANNON.Vec3(0, 0, 0)
                var worldVelocity = this.el.body.quaternion.vmult(force);

                this.el.body.applyImpulse(
                    worldVelocity, local
                );

            });

        });

    },

})



// require('three/examples/js/controls/TrackballControls');
// var THREE = require('three');
//
// const EPS = 0.000001;
// // import FirstPerson from './PlayerControls';
// var MAX_DELTA = 0.2,
//     PROXY_FLAG = '__keyboard-controls-proxy';
//
// var KeyboardEvent = window.KeyboardEvent;
//
// var camera, scene, renderer;
// var keyboard = {};
// var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
// var USE_WIREFRAME = false;
//
// var loadingScreen = {
//     scene: new THREE.Scene(),
//     camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
//     box: new THREE.Mesh(
//         new THREE.BoxGeometry(0.5,0.5,0.5),
//         new THREE.MeshBasicMaterial({ color:0x4444ff })
//     )
// };
// var loadingManager = null;
// var RESOURCES_LOADED = false;
//
//
//
// function initi() {
//
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
//     scene = document.querySelector('a-scene').object3D;
//     console.log(scene, "scenee");
// // Create a HemisphereLight source
//     var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
//     light.position.set(0.5, 1, 0.75);
//     scene.add(light);
//
//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(1280, 720);
//
//     movement();
//
//
//
//
// }
//
// function movement(){
//     requestAnimationFrame(movement);
//     if(keyboard[87]){ // W key
//         camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
//         camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
//         console.log(camera.position.x, "pozeice w");
//     }
//     if(keyboard[83]){ // S key
//         camera.position.x += Math.sin(camera.rotation.y) * player.speed;
//         camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
//     }
//     if(keyboard[65]){ // A key
//         camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
//         camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
//     }
//     if(keyboard[68]){ // D key
//         camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
//         camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
//     }
//
//     if(keyboard[37]){ // left arrow key
//         camera.rotation.y -= player.turnSpeed;
//     }
//     if(keyboard[39]){ // right arrow key
//         camera.rotation.y += player.turnSpeed;
//     }
//
//     renderer.render(scene, camera);
//
// }
//
// function render() {
//     movement().update();
//     requestAnimationFrame(render);
//
// }
//
// AFRAME.registerComponent('movementik', {
//     init: function () {
//         // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
//         // scene = document.querySelector('a-scene').object3D;
//         // console.log(scene, "scenee");
//         // // Create a HemisphereLight source
//         // var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
//         // light.position.set(0.5, 1, 0.75);
//         // scene.add(light);
//         //
//         // renderer = new THREE.WebGLRenderer();
//         // renderer.setSize(1280, 720);
//         //
//         this.onKeydown = this.onKeydown.bind(this);
//         window.addEventListener('keydown', this.onKeydown);
//
//     },
//     tick: function () {
//             // console.log(this.el, "tixkkkkk")
//         // console.log(keyboard[87]);
//         },
//      onKeydown: function inputF (evt) {
//         //object position and rotation
//         let position = this.el.getAttribute('position');
//         let rotation = this.el.getAttribute('position');
//         let shortcutPressed = evt.keyCode;
//         console.log(shortcutPressed, "shor");
//
//         let camera = document.querySelector('a-camera');
//         let positionC = camera.getAttribute('position');
//         var clock = new THREE.Clock();
//         var delta = clock.getDelta();
//         var sensitivity = 150;
//         var rotateAngle = Math.PI / 2 * delta * sensitivity;
//         var moveDistance = 2 * delta;
//          var dir = new THREE.Vector3(position.x, position.y, position.z);
//
//          // dir.sub(positionC).normalize(); // d
//
//         if (shortcutPressed ===  87) { console.log("wwwwwwwwwwwww");
//             console.log(this.el.getAttribute('position'));
//
//             position.x -= Math.sin(rotation.y) * player.speed;
//             position.z -= -Math.cos(rotation.y) * player.speed;
//             console.log(position.x,'w smer', rotation.z);
//
//             positionC.x = moveDistance + document.querySelector("#wrapper").object3D.position.x;
//             console.log(positionC.x, "cameraPos");
//         }
//          if (shortcutPressed ===  83) { console.log("ssssssssss");
//              position.x += Math.sin(rotation.y) * player.speed;
//              position.z += -Math.cos(rotation.y) * player.speed;
//              console.log(position.x,'s smer', rotation.z);
//          }
//
//
//          // if (pressed['D'] || pressed['ARROWRIGHT']) {
//          //     rotation += rotateAngle;
//          // }
//          //
//          // var rotZ = Math.cos(rotation)
//          // var rotX = Math.sin(rotation)
//          // var distance = 200;
//          // console.log(document.querySelector('a-camera').object3D);
//          // position.x = sphereBody.position.x - (distance * rotX);
//          // camera.position.y = sphereBody.position.y + 50;
//          // camera.position.z = sphereBody.position.z - (distance * rotZ);
//          // camera.lookAt(sphereGroup.position);
//          if (shortcutPressed ===  65) { console.log("aaaaaaaaaaaaaa");
//              rotation -= rotateAngle;
//
//
//              console.log(camera.getAttribute('position'),"camer");
//
//              var rotation_matrix = new THREE.Matrix4().makeRotationZ(rotateAngle);
//              console.log(rotation_matrix);
//              let matrix = this.el.object3D.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
//              console.log(matrix);
//
//
//              // position.x += Math.sin(rotation.y + Math.PI/2) * player.speed;
//              // position.z += -Math.cos(rotation.y + Math.PI/2) * player.speed;
//              // console.log(position.x,'a smer', rotation.z);
//          }
//          if (shortcutPressed ===  68) { console.log("dddddddddddd");
//              position.x += Math.sin(rotation.y - Math.PI/2) * player.speed;
//              position.z += -Math.cos(rotation.y - Math.PI/2) * player.speed;
//              console.log(position.x,'d smer', rotation.z);
//          }
//          //
//          // var relativeCameraOffset = new THREE.Vector3(0,0,5);
//          //
//          // var cameraOffset = relativeCameraOffset.applyMatrix4( this.el.object3D.matrixWorld );
//          //
//          // positionC.x = cameraOffset.x;
//          // positionC.y = cameraOffset.y;
//          // positionC.z = cameraOffset.z;
//
//
//     },
//
//
// });
//
// AFRAME.registerComponent('rotation-listener', {
//     tick() {
//         const newValue = this.el.getAttribute('rotation');
//         const stringCoords = AFRAME.utils.coordinates.stringify(newValue);
//         if (this.lastValue !== stringCoords) {
//             this.el.emit('rotationChanged', newValue);
//             this.lastValue = stringCoords;
//         }
//     },
// });
//
// AFRAME.registerComponent('position-listener', {
//     tick() {
//         const newValue = this.el.getAttribute('position');
//         const stringCoords = AFRAME.utils.coordinates.stringify(newValue);
//         if (this.lastValue !== stringCoords) {
//             this.el.emit('positionChanged', newValue);
//             this.lastValue = stringCoords;
//         }
//     },
// });
//
// AFRAME.registerComponent('movement', {
//
//    update: function () {
//        console.log(this.el.getAttribute('position'),"aa");
//
//
//        this.el.addEventListener('componentChanged', function (e) {
//            if (e.detail.name === 'position') {
//                console.log(e.detail.newData);
//                console.log("aaaaaaaaaaaaaaa");
//            }
//        })
//    }
//
// });
//
// AFRAME.registerComponent('log', {
//     schema: {
//         event: {type: 'string', default: ''},
//         message: {type: 'string', default: 'Hello, World!'}
//     },
//
//     init: function () {
//         var self = this;
//         this.eventHandlerFn = function () { console.log(self.data.message); };
//     },
//
//     update: function (oldData) {
//         var data = this.data;
//         var el = this.el;
//
//         // `event` updated. Remove the previous event listener if it exists.
//         if (oldData.event && data.event !== oldData.event) {
//             el.removeEventListener(oldData.event, this.eventHandlerFn);
//         }
//
//         if (data.event) {
//             el.addEventListener(data.event, this.eventHandlerFn);
//             console.log("jejede");
//         } else {
//             console.log(data.message);
//         }
//     }
// });
//
// AFRAME.registerComponent('preventroll', {
//    init: function(){
//        const el = this.el;
//        var sceneEl = document.querySelector('a-scene');
//        console.log(sceneEl,"ddds");
//
//
//        el.object3D.position.x += 1;
//    },
//     update: function (event) {
//
//     }
// });
AFRAME.registerComponent('kinema-body', {
    dependencies: ['velocity'],

    /*******************************************************************
     * Schema
     */
    schema: {
        mass:           { default: 0.1 },
        radius:         { default: 1.3 },
        linearDamping:  { default: 0.05 },
        enableSlopes:   { default: true },
        enableJumps:    { default: false },
    },

    /*******************************************************************
     * Lifecycle
     */

    init: function () {
        this.system = this.el.sceneEl.systems.physics;
        this.system.addComponent(this);

        const el = this.el,
            data = this.data,
            position = (new CANNON.Vec3()).copy(el.object3D.getWorldPosition(new THREE.Vector3()));

        this.body = new CANNON.Body({
            material: this.system.getMaterial('staticMaterial'),
            position: position,
            mass: data.mass,
            linearDamping: data.linearDamping,
            fixedRotation: true
        });
        this.body.addShape(
            new CANNON.Sphere(data.radius),
            new CANNON.Vec3(0, data.radius, 0)
        );

        this.body.el = this.el;
        this.el.body = this.body;
        this.system.addBody(this.body);

        if (el.hasAttribute('wasd-controls')) {
            console.warn('[kinema-body] Not compatible with wasd-controls, use movement-controls.');
        }
    },

    remove: function () {
        this.system.removeBody(this.body);
        this.system.removeComponent(this);
        delete this.el.body;
    },

    /*******************************************************************
     * Update
     */

    /**
     * Checks CANNON.World for collisions and attempts to apply them to the
     * element automatically, in a player-friendly way.
     *
     * There's extra logic for horizontal surfaces here. The basic requirements:
     * (1) Only apply gravity when not in contact with _any_ horizontal surface.
     * (2) When moving, project the velocity against exactly one ground surface.
     *     If in contact with two ground surfaces (e.g. ground + ramp), choose
     *     the one that collides with current velocity, if any.
     */
    beforeStep: function (t, dt) {
        if (!dt) return;

        const el = this.el;
        const data = this.data
        const body = this.body;

        if (!data.enableJumps) body.velocity.set(0, 0, 0);
        body.position.copy(el.getAttribute('position'));
    },

    step: (function () {
        const velocity = new THREE.Vector3(),
            normalizedVelocity = new THREE.Vector3(),
            currentSurfaceNormal = new THREE.Vector3(),
            groundNormal = new THREE.Vector3();

        return function (t, dt) {
            if (!dt) return;

            let body = this.body,
                data = this.data,
                didCollide = false,
                height, groundHeight = -Infinity,
                groundBody,
                contacts = this.system.getContacts();

            dt = Math.min(dt, this.system.data.maxInterval * 1000);

            groundNormal.set(0, 0, 0);
            velocity.copy(this.el.getAttribute('velocity'));
            body.velocity.copy(velocity);

            for (var i = 0, contact; contact = contacts[i]; i++) {
                // 1. Find any collisions involving this element. Get the contact
                // normal, and make sure it's oriented _out_ of the other object and
                // enabled (body.collisionReponse is true for both bodies)
                if (!contact.enabled) { continue; }
                if (body.id === contact.bi.id) {
                    contact.ni.negate(currentSurfaceNormal);
                } else if (body.id === contact.bj.id) {
                    currentSurfaceNormal.copy(contact.ni);
                } else {
                    continue;
                }

                didCollide = body.velocity.dot(currentSurfaceNormal) < -EPS;
                if (didCollide && currentSurfaceNormal.y <= 0.5) {
                    // 2. If current trajectory attempts to move _through_ another
                    // object, project the velocity against the collision plane to
                    // prevent passing through.
                    velocity.projectOnPlane(currentSurfaceNormal);
                } else if (currentSurfaceNormal.y > 0.5) {
                    // 3. If in contact with something roughly horizontal (+/- 45º) then
                    // consider that the current ground. Only the highest qualifying
                    // ground is retained.
                    height = body.id === contact.bi.id
                        ? Math.abs(contact.rj.y + contact.bj.position.y)
                        : Math.abs(contact.ri.y + contact.bi.position.y);
                    if (height > groundHeight) {
                        groundHeight = height;
                        groundNormal.copy(currentSurfaceNormal);
                        groundBody = body.id === contact.bi.id ? contact.bj : contact.bi;
                    }
                }
            }

            normalizedVelocity.copy(velocity).normalize();
            if (groundBody && (!data.enableJumps || normalizedVelocity.y < 0.5)) {
                if (!data.enableSlopes) {
                    groundNormal.set(0, 1, 0);
                } else if (groundNormal.y < 1 - EPS) {
                    groundNormal.copy(this.raycastToGround(groundBody, groundNormal));
                }

                // 4. Project trajectory onto the top-most ground object, unless
                // trajectory is > 45º.
                velocity.projectOnPlane(groundNormal);

            } else if (this.system.driver.world) {
                // 5. If not in contact with anything horizontal, apply world gravity.
                // TODO - Why is the 4x scalar necessary.
                // NOTE: Does not work if physics runs on a worker.
                velocity.add(this.system.driver.world.gravity.scale(dt * 4.0 / 1000));
            }

            body.velocity.copy(velocity);
            this.el.setAttribute('velocity', body.velocity);
            this.el.setAttribute('position', body.position);
        };
    }()),

    /**
     * When walking on complex surfaces (trimeshes, borders between two shapes),
     * the collision normals returned for the player sphere can be very
     * inconsistent. To address this, raycast straight down, find the collision
     * normal, and return whichever normal is more vertical.
     * @param  {CANNON.Body} groundBody
     * @param  {CANNON.Vec3} groundNormal
     * @return {CANNON.Vec3}
     */
    raycastToGround: function (groundBody, groundNormal) {
        let ray,
            hitNormal,
            vFrom = this.body.position,
            vTo = this.body.position.clone();

        ray = new CANNON.Ray(vFrom, vTo);
        ray._updateDirection(); // TODO - Report bug.
        ray.intersectBody(groundBody);

        if (!ray.hasHit) return groundNormal;

        // Compare ABS, in case we're projecting against the inside of the face.
        hitNormal = ray.result.hitNormalWorld;
        return Math.abs(hitNormal.y) > Math.abs(groundNormal.y) ? hitNormal : groundNormal;
    }
});
//
// import AFRAME from 'aframe';
// require('aframe-extras');
// require('aframe-physics-system');
// require('aframe-environment-component');
//
// var fixedTimeStep = 1.0 / 60.0; // seconds
// var maxSubSteps = 3;
// var lastTime, time, world, shape, body
// var timeStep=1/60;
// console.log("hello");
//
// AFRAME.registerComponent('code', {
//    schema: { type: 'string' , default: "jede to, diky Bohu"},
//    init: function () {
//    }
// });
//
// AFRAME.registerComponent('position1', {
//     schema: { type: 'vec3' },
//     update: function () {
//         console.log("posize");
//
//         this.el.addEventListener('click', function (evt) {
//
//             this.setAttribute('position', {x: 20, y: 2, z: 2});
//             console.log('I was clicked at: ', evt.detail.intersection.point);
//         });
//
//     }
// });
//
//
//
// document.addEventListener('DOMContentLoaded', function() {
//     let a = document.querySelector('a-link');
//     console.log(a);
// //     let sphere = document.querySelector('a-sphere');
// //     console.log(sphere);
// //
// //
// //
// //     let boxEl = document.getElementById('box');
// //     console.log(boxEl);
// //     boxEl.addEventListener('mouseenter', function (evt) {
// //         let x1 = 0;
// //         boxEl.setAttribute('scale', {x: x1, y: 2, z: 2});
// //         console.log("boxxxxxxxxx", evt.detail.intersection.point, x1);
// //         x1 = x1 + x1;
// //     });
//
//
//     // sphere.addEventListener('mouseenter', function (evt) {
//     //     sphere.setAttribute('scale', {x: 2, y: 2, z: 2});
//     //     console.log("aaa", evt.detail.intersection.point);
//     // });
//
//     // sphere.addEventListener('mouseleave', function (evt) {
//     //     sphere.setAttribute('scale', {x: 2, y: 3, z: 5});
//     //     console.log("aaa", evt.detail.intersection.point);
//     // });
// })
//
//
// // initCannon();
// // let groupObject = new THREE.Object3D();
//
// // init();
// // animate();
//
// function initCannon(){
//     world = new CANNON.World();
//     world.gravity.set(0,-20,0);
//     world.broadphase = new CANNON.NaiveBroadphase();
//     world.solver.iterations = 10;
//
//     // var mass = 0, radius = 1.3;
//     // sphereShape = new CANNON.Sphere(radius);
//     // sphereBody = new CANNON.Body({ mass: mass });
//     // sphereBody.addShape(sphereShape);
//     // sphereBody.position.set(1,1,0);
//     // sphereBody.linearDamping = 0.9;
//     // world.add(sphereBody);
//
//     // Create a slippery material (friction coefficient = 0.0)
//     var physicsMaterial = new CANNON.Material("slipperyMaterial");
//
//     // Create a plane
//     var groundShape = new CANNON.Plane();
//     var groundBody = new CANNON.Body({ mass: 0, material: physicsMaterial });
//     groundBody.addShape(groundShape);
//     groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
//     groundBody.position.set(0,0,0);
//     world.add(groundBody);
//
//     shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
//
//     body = new CANNON.Body({
//         mass: 1
//     });
//     body.addShape(shape);
//     body.angularVelocity.set(0,10,0); //pocatecni otaceni(rotace) po ose y cim vyssi cislo tim vetsi je rotace
//     body.angularDamping = 0.5;
//     world.add(body);
// }
// function init() {
//   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
//   camera.position.z = 5;
//
//   scene = new THREE.Scene();
//
//   let lighte = THREE.AmbientLight( 0xff0000 ,0.4);
//   scene.add(lighte);
//
//
//     let mtlLoader = new MTLLoader();
//
//     let objLoader = new OBJLoader();
//
//     mtlLoader.load(Material, (materials) => {
//         materials.preload();
//         objLoader.setMaterials(materials);
//
//         objLoader.load(Model, (object) => {
//                 object.materials = materials;
//                 groupObject.add(object);
//                 const body = object.children[0];
//             body.material.color.set(0xffffff);
//                 console.log(body);
//                 scene.add(body);
//             } );
//         console.log("grouof");
//             console.log(groupObject);
//
//
//         });
//
//
//
//   geometry = new THREE.BoxGeometry( 2, 2, 2 );
//   material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
//   mesh = new THREE.Mesh( geometry, material );
//   // mesh.position.set({x:0,y:0,Z:0});
//
//   scene.add(mesh);
//
//
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
//
// }
//
// function animate() {
//
//   requestAnimationFrame(animate);
//   updatePhysics();
//   // mesh.rotation.x += 0.01;
//   // mesh.rotation.y += 0.02;
//
//     // if(lastTime !== undefined){
//     //     var dt = (time - lastTime) / 1000;
//     //     world.step(fixedTimeStep, dt, maxSubSteps);
//     // }
//     // console.log("Sphere z position: " + sphereBody.position.z);
//     // lastTime = time;
//
//   renderer.render(scene, camera);
//
// }
//
// function updatePhysics() {
//     // Step the physics world
//     world.step(timeStep);
//     // Copy coordinates from Cannon.js to Three.js
//     mesh.position.copy(body.position);
//     mesh.quaternion.copy(body.quaternion);
// }
