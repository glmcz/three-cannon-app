import * as THREE from 'three';
import CANNON from 'cannon';

let camera, scene, renderer;
let geometry, material, mesh, sphereShape, sphereBody;
// var sphereShape, sphereBody;
var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;
var lastTime, time, world, shape, body;
var timeStep=1/60;
initCannon();
init();
animate();

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

  // let lighte = THREE.AmbientLight( 0xff0000 ,0.4);
  // scene.add(lighte);



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
