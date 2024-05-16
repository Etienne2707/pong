export function handlePlayerMovement(player, leftKey, rightKey) {
    let moveLeftInterval = null;
    let moveRightInterval = null;
  
    const handleKeyDown = function (e) {
      e.preventDefault();
      if (e.keyCode === leftKey && !moveLeftInterval) {
        console.log("Le joueur commence à se déplacer vers la gauche !");
        moveLeftInterval = setInterval(moveLeft, 10);
      }
      if (e.keyCode === rightKey && !moveRightInterval) {
        console.log("Le joueur commence à se déplacer vers la droite !");
        moveRightInterval = setInterval(moveRight, 10);
      }
    };
  
    const handleKeyUp = function (e) {
      if (e.keyCode === leftKey) {
        console.log("Le joueur arrête de se déplacer vers la gauche !");
        clearInterval(moveLeftInterval);
        moveLeftInterval = null;
      }
      if (e.keyCode === rightKey) {
        console.log("Le joueur arrête de se déplacer vers la droite !");
        clearInterval(moveRightInterval);
        moveRightInterval = null;
      }
    };
  
    function moveLeft() {
        if (player.position.x >= -7.25)
            player.position.x -= 0.1;
        console.log("Le joueur se déplace vers la gauche !");
    }
  
    function moveRight() {
        if (player.position.x < 7.25)
            player.position.x += 0.1;
        console.log("Le joueur se déplace vers la droite !");
    }
  
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  
    // Retourner une fonction pour nettoyer les écouteurs d'événements lorsqu'ils ne sont plus nécessaires
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }

  