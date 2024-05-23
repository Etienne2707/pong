import * as THREE from 'three';

window.addEventListener("mousedown", onmousedown, false);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onmousedown(event) {
    mouse.x = (event.clientX / window.clientWidth) * 2 - 3;
    mouse.y = -(event.clientY / window.clienHeight) * 2 + 1;
}