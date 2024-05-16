import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import SceneInit from './SceneInit.js';
import { handlePlayerMovement } from './playermovement.js'; // Importer la fonction de mouvement de joueur

// Initialize the SceneInit class and start rendering
const sceneInit = new SceneInit('myThreeJsCanvas');
sceneInit.initialize();
sceneInit.animate();

// Terrein
const terrain = new THREE.PlaneGeometry( 20, 35 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( terrain, material );
plane.rotation.x += Math.PI / 2;
sceneInit.scene.add( plane );

//  Right Side Bar
const rsbgeometry = new THREE.BoxGeometry(1,1,35);
const rsbmaterial = new THREE.MeshBasicMaterial( { color : 0x00ff00});
const rsidebat = new THREE.Mesh(rsbgeometry, rsbmaterial);
rsidebat.position.set(9.5,0.5,0);
sceneInit.scene.add(rsidebat);

// Left Side Bar
const lsbgeometry = new THREE.BoxGeometry(1,1,35);
const lsbmaterial = new THREE.MeshBasicMaterial( { color : 0x00ff00});
const lsidebat = new THREE.Mesh(lsbgeometry, lsbmaterial);
lsidebat.position.set(-9.5,0.5,0);
sceneInit.scene.add(lsidebat);

// Front Side Bar
const fsbgeometry = new THREE.BoxGeometry(18,0.5,1);
const fsbmaterial = new THREE.MeshBasicMaterial( { color : 0xff0000});
const fsidebat = new THREE.Mesh(fsbgeometry, fsbmaterial);
fsidebat.position.set(0,0.25,17);
sceneInit.scene.add(fsidebat);

// Back Side Bar
const bsbgeometry = new THREE.BoxGeometry(18,0.5,1);
const bsbmaterial = new THREE.MeshBasicMaterial( { color : 0xff0000});
const bsidebat = new THREE.Mesh(bsbgeometry, bsbmaterial);
bsidebat.position.set(0,0.25,-17);
sceneInit.scene.add(bsidebat);


// Joueur 1
const pgeometry = new THREE.BoxGeometry(3.5,1,1);
const pmaterial = new THREE.MeshBasicMaterial( {color : 0xff00ff});
const player = new THREE.Mesh(pgeometry, pmaterial);
// Placer le joueur sur le terrain
player.position.set(0, 0.5, 15); // Position y dépend de la hauteur de votre terrain
sceneInit.scene.add( player );

// Joueur 2
const pgeometry2 = new THREE.BoxGeometry(3.5,1,1);
const pmaterial2 = new THREE.MeshBasicMaterial( {color : 0xff00ff});
const player2 = new THREE.Mesh(pgeometry2, pmaterial2);
// Placer le joueur sur le terrain
player2.position.set(0, 0.5, -15); // Position y dépend de la hauteur de votre terrain
sceneInit.scene.add( player2 );


// Ball 

const ballgeomatry = new THREE.SphereGeometry(0.5, 32, 16);
const ballmaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff } );
const ball = new THREE.Mesh(ballgeomatry, ballmaterial);

ball.position.set(0, 0.5, 0); // Position y dépend de la hauteur de votre terrain

sceneInit.scene.add(ball);


handlePlayerMovement(player, 37, 39); // Utilisation des touches fléchées pour le joueur 1
handlePlayerMovement(player2, 90, 88); // Utilisation des touches Z et X pour le joueur 2

console.log("Map Has Been Init !");
