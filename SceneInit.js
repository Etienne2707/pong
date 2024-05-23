import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import Stats from 'three/addons/libs/stats.module.js';

export default class SceneInit {
  constructor(canvasID, fov = 36) {
    this.fov = fov;
    this.canvasID = canvasID;
  }

  initScene() {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 128;

    this.scene = new THREE.Scene();

    // const loader = new THREE.TextureLoader();
    // loader.load('background.jpg', (texture) => {
    // this.scene.background = texture;
    //  });
    const canvas = document.getElementById(this.canvasID);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}