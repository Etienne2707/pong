import * as THREE from 'three';
import SceneInit from './SceneInit.js';
import TicTacToe from './TicTacToe.js';
import Text from './Text.js'
import { game_animation } from './animation.js';
import { end_animation } from './animation.js';
import { win_animation } from './animation.js';
import { draw_animation } from './animation.js';
import { GAME_STATES } from './constent.js';

document.addEventListener('DOMContentLoaded', () => {
  const tictactoe = new SceneInit('myCanvas');
  tictactoe.initScene();
  tictactoe.animate();

  let winner_alert;
  let draw_alert;
  const text = new Text(tictactoe.scene,"SPACE-TICTACTOE",0,40);
  const tic = new TicTacToe(tictactoe.scene);
  tictactoe.scene.add(tic.board);
  
  window.addEventListener("mousedown", onmousedown, false);
  
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  
  function onmousedown(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, tictactoe.camera);
      if (tic.state === 1) {
        console.log("test");
        const intersects = raycaster.intersectObjects(tic.button.children);
        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object; // The first intersected object
          if (intersectedObject.name === 'button1') {
            window.location.href = './test.html'; // Navigate to page1
          } else if (intersectedObject.name === 'button2') {
            window.location.href = './index.html'; // Navigate to page2
          }
        }
        return;
      }
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
        tic.state = GAME_STATES.WIN;
        tic.winner_player = tic.currentPlayer;
        winner_alert = new Text(tictactoe.scene,`Player ${tic.winner_player} wins!`,0,30)
      }
      if (tic._checkDrawCondition() === true && tic.win != 1) {
        tic.state = GAME_STATES.DRAW;
        draw_alert = new Text(tictactoe.scene,"DRAW !!!",0,30)
      }
    }

  const animate = () => {
    if (tic.animation_state < 2) {
      game_animation(tic,text);
      if (tic.state === 1 && tic.winLine.children[0].scale.x < 1) {
        tic.animation_state = 0;
      }
    }
      //console.log(`Animation = ${tic.animation_state}`);
    if (tic.state != 0 && tic.animation_state > 0) {
        end_animation(tic,text);
      //  if (tic.animation_state === 3) {
      //    tictactoe.scene.remove(tic.board);
      //    tictactoe.scene.remove(text);
      //   }
      }
      console.log(`${tic.animation_state}`)
      if (tic.state === 1) {
        win_animation(tic,winner_alert);
     } 
     else if (tic.state === 2) {
        draw_animation(draw_alert);
     }
     requestAnimationFrame(animate);
    }
    animate();
    })
    
    
    
    
    //   if ((tic.win === 1 && tic.winLine.children[0].scale.x >= 1)){
    //     end_win_anim = true;
    //   }
    //   if (tic.draw === 1) {
    //     end_win_anim = true;
    //   }
    //   if (end_win_anim) {
    //       stop_anime = true;
    //       tic.board_lines.children.forEach(scaleDown);
    //       tic.circles.children.forEach(scaleDown);
    //       tic.crosses.children.forEach(scaleDown);
    //       tic.winLine.children.forEach(scaleDown);
    //       scaleDown(text.textMesh);
    //       if (tic.draw === 1) {
    //         // Assurez-vous que draw_alert.textMesh n'est pas null
    //         if (draw_alert.textMesh) {
    //           console.log("premier truc");
    //             scaleUp(draw_alert.textMesh);
    //             if (draw_alert.textMesh.scale.x >= 1 && tic.board_lines.children[0].scale.x === 0) {
    //               console.log("deuxieme truc");
    //                 tic.draw = 0;
    //                 let randomNumber = Math.random();
    //                 // Utilisez Math.round() pour obtenir un chiffre 0 ou 1
    //                 let randomDigit = Math.round(randomNumber);
    //                 if (randomDigit === 0)
    //                     tic.winner_player = "o";
    //                 else
    //                     tic.winner_player = "x";
    //                 tic.win = 1;
    //             }
    //         }
    //       }
    //       if (tic.win === 1 && tic.winLine.children[0].scale.x === 0) {
    //         console.log("On doit baisser");
    //         scaleUp(winner_alert.textMesh);
    //       }
    //   }
    //   //console.log(`oui ${tic.winLine.children[0].scale.x }`)
    //   requestAnimationFrame(animate);
    // };
    ;  