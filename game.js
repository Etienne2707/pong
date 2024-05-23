import * as THREE from 'three';
import SceneInit from './SceneInit.js';
import TicTacToe from './TicTacToe.js';

document.addEventListener('DOMContentLoaded', () => {
  const tictactoe = new SceneInit('myCanvas');
  tictactoe.initScene();
  tictactoe.animate();
  
  const tic = new TicTacToe(tictactoe.scene);
  tictactoe.scene.add(tic.board);
  
  window.addEventListener("mousedown", onmousedown, false);
  
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  
  function onmousedown(event) {
      if (tic.win === 1) return ;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, tictactoe.camera);
      const intersects = raycaster.intersectObjects(
        tic.hiddenTiles.children
      );
      console.log(intersects);
      
      if (intersects.length > 0) {
        const xOffset = intersects[0].object.position.x;
        const yOffset = intersects[0].object.position.y;
        tic.addCrossOrCircle(xOffset, yOffset);
        const index = tic.hiddenTiles.children.findIndex(
          (c) => c.uuid === intersects[0].object.uuid
        );
        tic.hiddenTiles.children.splice(index,1);
      }
      if (tic.checkWinConditions() === true)
      {
        console.log(`Player ${tic.currentPlayer} wins!`);

      }

  };

  const scaleUp = (obj) => {

    if (obj.scale.x < 1) {
      obj.scale.x += 0.04;
    }
    if (obj.scale.y < 1) {
      obj.scale.y += 0.04;
    }
    if (obj.scale.z < 1){      
      obj.scale.z += 0.04;
    }
    
  };

  const animate = () => {
    tic.board_lines.children.forEach(scaleUp);
    tic.circles.children.forEach(scaleUp);
    tic.crosses.children.forEach(scaleUp);
    tic.winLine.children.forEach(scaleUp);
    requestAnimationFrame(animate);
  };
  animate();


});