import * as THREE from 'three';
import SceneInit from './SceneInit.js';
import TicTacToe from './TicTacToe.js';
import Text from './Text.js'

document.addEventListener('DOMContentLoaded', () => {
  const tictactoe = new SceneInit('myCanvas');
  tictactoe.initScene();
  tictactoe.animate();
  
  let end_win_anim = false;
  let stop_anime = false;
  let winner_alert;
  let draw_alert;
  const text = new Text(tictactoe.scene,"SPACE-TICTACTOE",0,40);
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
      const intersects = raycaster.intersectObjects(tic.hiddenTiles.children);
      console.log(intersects);   
      if (intersects.length > 0) {
        if (tic.currentPlayer === "x") {
          tic.currentPlayer = "o";
        } else {
          tic.currentPlayer = "x";
        }
        const xOffset = intersects[0].object.position.x;
        const yOffset = intersects[0].object.position.y;
        tic.addCrossOrCircle(xOffset, yOffset);
        const index = tic.hiddenTiles.children.findIndex((c) => c.uuid === intersects[0].object.uuid);
        tic.hiddenTiles.children.splice(index, 1);
      }
      if (tic.checkWinConditions() === true) {
        console.log(`Player ${tic.currentPlayer} wins!`);
        tic.win = 1;
        tic.winner_player = tic.currentPlayer;
        winner_alert = new Text(tictactoe.scene,`Player ${tic.winner_player} wins!`,0,0)
      }
      if (tic._checkDrawCondition() === true && tic.win != 1) {
        tic.draw = 1;
        console.log("Draw");
        draw_alert = new Text(tictactoe.scene,"DRAW !!!",0,30)
      }
    }

  const scaleUp = (obj) => {
    if (!obj) {
      console.log("objets inexistant");
      return;
    }
    if (obj.scale.x < 1) obj.scale.x += 0.04;
    if (obj.scale.y < 1) obj.scale.y += 0.04;
    if (obj.scale.z < 1) obj.scale.z += 0.04;
  };

  const scaleDown = (obj) => {
    if (!obj) {
      console.log("objets inexistant");
      return;
    }
    if (obj.scale.x > 0) obj.scale.x -= 0.03;
    if (obj.scale.y > 0) obj.scale.y -= 0.03;
    if (obj.scale.z > 0) obj.scale.z -= 0.03;
    if (obj.scale.x < 0) obj.scale.x = 0;
    if (obj.scale.y < 0) obj.scale.y = 0;
    if (obj.scale.z < 0) obj.scale.z = 0;
  };

  const animate = () => {
    console.log(`oui ${stop_anime}`)
    if (!stop_anime) {
      tic.board_lines.children.forEach(scaleUp);
      tic.circles.children.forEach(scaleUp);
      tic.crosses.children.forEach(scaleUp);
      tic.winLine.children.forEach(scaleUp);
      scaleUp(text.textMesh);
    }
  
    if ((tic.win === 1 && tic.winLine.children[0].scale.x >= 1)){
      end_win_anim = true;
    }
    if (tic.draw === 1) {
      end_win_anim = true;
    }
    if (end_win_anim) {
        stop_anime = true;
        tic.board_lines.children.forEach(scaleDown);
        tic.circles.children.forEach(scaleDown);
        tic.crosses.children.forEach(scaleDown);
        tic.winLine.children.forEach(scaleDown);
        scaleDown(text.textMesh);
        if (tic.draw === 1) {
          // Assurez-vous que draw_alert.textMesh n'est pas null
          if (draw_alert.textMesh) {
            console.log("premier truc");
              scaleUp(draw_alert.textMesh);
              if (draw_alert.textMesh.scale.x >= 1 && tic.board_lines.children[0].scale.x === 0) {
                console.log("deuxieme truc");
                  tic.draw = 0;
                  let randomNumber = Math.random();
                  // Utilisez Math.round() pour obtenir un chiffre 0 ou 1
                  let randomDigit = Math.round(randomNumber);
                  if (randomDigit === 0)
                      tic.winner_player = "o";
                  else
                      tic.winner_player = "x";
                  tic.win = 1;
              }
          }
        }
        if (tic.win === 1 && tic.winLine.children[0].scale.x === 0) {
          console.log("On doit baisser");
          scaleUp(winner_alert.textMesh);
        }
    }
    //console.log(`oui ${tic.winLine.children[0].scale.x }`)
    requestAnimationFrame(animate);
  };

  animate();
});     