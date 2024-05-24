import * as THREE from 'three';


export function scaleUp(obj, state) {
    if (!obj) {
        console.log("objets inexistant");
        return state; // Retourne la valeur de state inchangée si obj est inexistant
    }
    state = 0;
    if (obj.scale.x < 1) obj.scale.x += 0.04;
    if (obj.scale.y < 1) obj.scale.y += 0.04;
    if (obj.scale.z < 1) obj.scale.z += 0.04;
    if (obj.scale.z >= 1) state = 1;
    return state; // Retourne la valeur de state mise à jour
};

  export function scaleDown(obj,state) {
    if (!obj) {
      console.log("objets inexistant");
      return;
    }
    state = 2;
    if (obj.scale.x > 0) obj.scale.x -= 0.03;
    if (obj.scale.y > 0) obj.scale.y -= 0.03;
    if (obj.scale.z > 0) obj.scale.z -= 0.03;
    if (obj.scale.z <= 0) {
        obj.scale.set(0,0,0);
        state = 3;
    }
    return state
  };

  export function game_animation(scene, text) {
    scene.board_lines.children.forEach((child) => scene.animation_state = scaleUp(child, scene.animation_state));
    scene.circles.children.forEach((child) => scene.animation_state = scaleUp(child, scene.animation_state));
    scene.crosses.children.forEach((child) => scene.animation_state = scaleUp(child, scene.animation_state));
    scene.winLine.children.forEach((child) => scene.animation_state = scaleUp(child, scene.animation_state));
    scene.animation_state = scaleUp(text.textMesh, scene.animation_state);
    return scene.animation_state;
};


export function end_animation(scene,text) {

    scene.board_lines.children.forEach((child) => scene.animation_state = scaleDown(child, scene.animation_state));
    scene.circles.children.forEach((child) => scene.animation_state = scaleDown(child, scene.animation_state));
    scene.crosses.children.forEach((child) => scene.animation_state = scaleDown(child, scene.animation_state));
    scene.winLine.children.forEach((child) => scene.animation_state = scaleDown(child, scene.animation_state));
    scene.animation_state = scaleDown(text.textMesh, scene.animation_state);
    console.log(`Valeur : ${scene.animation_state}`)
}

export function win_animation(text) {

    scaleUp(text.textMesh);
}

export function draw_animation(text) {
    scaleUp(text.textMesh);
}