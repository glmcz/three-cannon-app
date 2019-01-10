// import * as THREE from 'three';
// import CANNON from 'cannon';
// import aframe from 'aframe';
// import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
// import Material from './materials.mtl';
// import Model from './model.obj';
// let camera, renderer;
// let geometry, material, mesh, sphereShape, sphereBody;
// console.log(Model);
// var sphereShape, sphereBody;
var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;
var lastTime, time, world, shape, body, scene;
var timeStep=1/60;
console.log("hello");

AFRAME.registerComponent('code', {
   schema: { type: 'string' , default: "jede to, diky Bohu"},
   init: function () {



   }
});

AFRAME.registerComponent('position1', {
    schema: { type: 'vec3' },

    update: function () {
        console.log("posize");

        this.el.addEventListener('click', function (evt) {

            this.setAttribute('position', {x: 20, y: 2, z: 2});
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });

    }
});




document.addEventListener('DOMContentLoaded', function() {
    let sphere = document.querySelector('a-sphere');
    console.log(sphere);



    var boxEl = document.getElementById('box');
    console.log(boxEl);
    boxEl.addEventListener('mouseenter', function (evt) {
        let x1 = 0
        boxEl.setAttribute('scale', {x: x1, y: 2, z: 2});
        console.log("boxxxxxxxxx", evt.detail.intersection.point, x1);
        x1 = x1 + x1;
    });


    // sphere.addEventListener('mouseenter', function (evt) {
    //     sphere.setAttribute('scale', {x: 2, y: 2, z: 2});
    //     console.log("aaa", evt.detail.intersection.point);
    // });

    // sphere.addEventListener('mouseleave', function (evt) {
    //     sphere.setAttribute('scale', {x: 2, y: 3, z: 5});
    //     console.log("aaa", evt.detail.intersection.point);
    // });
})


// initCannon();
// let groupObject = new THREE.Object3D();

// init();
// animate();

function initCannon(){
    world = new CANNON.World();
    world.gravity.set(0,-20,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // var mass = 0, radius = 1.3;
    // sphereShape = new CANNON.Sphere(radius);
    // sphereBody = new CANNON.Body({ mass: mass });
    // sphereBody.addShape(sphereShape);
    // sphereBody.position.set(1,1,0);
    // sphereBody.linearDamping = 0.9;
    // world.add(sphereBody);

    // Create a slippery material (friction coefficient = 0.0)
    var physicsMaterial = new CANNON.Material("slipperyMaterial");

    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0, material: physicsMaterial });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    groundBody.position.set(0,0,0);
    world.add(groundBody);

    shape = new CANNON.Box(new CANNON.Vec3(1,1,1));

    body = new CANNON.Body({
        mass: 1
    });
    body.addShape(shape);
    body.angularVelocity.set(0,10,0); //pocatecni otaceni(rotace) po ose y cim vyssi cislo tim vetsi je rotace
    body.angularDamping = 0.5;
    world.add(body);
}
function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.z = 5;

  scene = new THREE.Scene();

  let lighte = THREE.AmbientLight( 0xff0000 ,0.4);
  scene.add(lighte);


    let mtlLoader = new MTLLoader();

    let objLoader = new OBJLoader();

    mtlLoader.load(Material, (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);

        objLoader.load(Model, (object) => {
                object.materials = materials;
                groupObject.add(object);
                const body = object.children[0];
            body.material.color.set(0xffffff);
                console.log(body);
                scene.add(body);
            } );
        console.log("grouof");
            console.log(groupObject);


        });



  geometry = new THREE.BoxGeometry( 2, 2, 2 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
  mesh = new THREE.Mesh( geometry, material );
  // mesh.position.set({x:0,y:0,Z:0});

  scene.add(mesh);


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);
  updatePhysics();
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;

    // if(lastTime !== undefined){
    //     var dt = (time - lastTime) / 1000;
    //     world.step(fixedTimeStep, dt, maxSubSteps);
    // }
    // console.log("Sphere z position: " + sphereBody.position.z);
    // lastTime = time;

  renderer.render(scene, camera);

}

function updatePhysics() {
    // Step the physics world
    world.step(timeStep);
    // Copy coordinates from Cannon.js to Three.js
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
}
