import * as THREE from 'three';

export default class TicTacToe {
    constructor(scene) {
        this.winner_player;
        this.state = 0;
        this.animation_state = 0;
        this.board = new THREE.Group();
        this.board_lines =  new THREE.Group();
        this.hiddenTiles = new THREE.Group();
        this.circles = new THREE.Group();
        this.crosses = new THREE.Group();
        this.winLine = new THREE.Group();
        this.button = new THREE.Group();
        this.button = new THREE.Group();

        this.board.add(this.winLine);
        this.board.add(this.circles);
        this.board.add(this.crosses);
        this.board.add(this.button);
        this.board.add(this.board_lines);
        this.board.add(this.hiddenTiles);

        this.currentPlayer = "o";
        this.boardCopy = [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
        ];
    
        this._createBoard();
        this._createbutton();
        //this.scene.add(this.board);
    }

    _createBoard() {

        // hidden Tiles Top
        this.hiddenTiles.add(this._hiddentiles(24,24));
        this.hiddenTiles.add(this._hiddentiles(-24,24));
        this.hiddenTiles.add(this._hiddentiles(0,24));
        // hidden Tiles Center
        this.hiddenTiles.add(this._hiddentiles(-24,0));
        this.hiddenTiles.add(this._hiddentiles(0,0));
        this.hiddenTiles.add(this._hiddentiles(24,0));
        
        // hidden Tiles Bottom
        this.hiddenTiles.add(this._hiddentiles(24,-24));
        this.hiddenTiles.add(this._hiddentiles(-24,-24));
        this.hiddenTiles.add(this._hiddentiles(0,-24));
        // Vertical lines
        const left = this._board_line(4, 64, 4, -12, 0);
        const right = this._board_line(4, 64, 4, 12, 0);
        this.board_lines.add(left);
        this.board_lines.add(right);

        // Horizontal lines
        const top = this._board_line(64, 4, 4, 0, 12);
        const bottom = this._board_line(64, 4, 4, 0, -12);
        this.board_lines.add(top);
        this.board_lines.add(bottom);
    }

    _board_line(x, y, z, xOffset, yOffset) {
        const boardLineGeometry = new THREE.BoxGeometry(x, y, z);
        const boardLineMaterial = new THREE.MeshNormalMaterial();
        const boardLine = new THREE.Mesh(boardLineGeometry, boardLineMaterial);
        boardLine.position.x = xOffset;
        boardLine.position.y = yOffset;
        boardLine.scale.x = 0;
        boardLine.scale.y = 0;
        boardLine.scale.z = 0;
        return boardLine;
    }
    _hiddentiles(xOffset,yOffset) {
        const tilesgeometry = new THREE.BoxGeometry(12,12,1);
        const tilesmaterial = new THREE.MeshNormalMaterial({
          transparent: true,
          opacity: 0 // Adjust the opacity as needed
      });
        const hidden_tiles = new THREE.Mesh(tilesgeometry, tilesmaterial);
        hidden_tiles.position.x = xOffset;
        hidden_tiles.position.y = yOffset;
        return hidden_tiles;
    }

    _updateBoardCopy(xOffset, yOffset) {
        let i, j;
    
        if (xOffset < 0) {
          j = 0;
        } else if (xOffset === 0) {
          j = 1;
        } else {
          j = 2;
        }
    
        if (yOffset < 0) {
          i = 2;
        } else if (yOffset === 0) {
          i = 1;
        } else {
          i = 0;
        }
    
        if (this.currentPlayer === "o") {
          this.boardCopy[i][j] = "o";
        } else {
          this.boardCopy[i][j] = "x";
        }
    
        console.log(this.boardCopy);
      }    
      _addCross(xOffset, yOffset) {
        const cross = new THREE.Group();
        const crossGeometry = new THREE.BoxGeometry(12, 4, 4);
        const crossMaterial = new THREE.MeshNormalMaterial();
        const cross1 = new THREE.Mesh(crossGeometry, crossMaterial);
        const cross2 = new THREE.Mesh(crossGeometry, crossMaterial);
        cross1.rotation.z = Math.PI / 4;
        cross2.rotation.z = -Math.PI / 4;
        cross.add(cross1, cross2);
        cross.position.x = xOffset;
        cross.position.y = yOffset;
        cross.scale.x = 0;
        cross.scale.y = 0;
        cross.scale.z = 0;
        this.crosses.add(cross);
      }
    
      _addCircle(xOffset, yOffset) {
        const r = 6;
        const height = 4;
        const cylinderGeometry = new THREE.CylinderGeometry(r, r, height, 100);
        const cylinderMaterial = new THREE.MeshNormalMaterial();
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.x = xOffset;
        cylinder.position.y = yOffset;
        cylinder.rotation.x = Math.PI / 2;
        cylinder.scale.x = 0;
        cylinder.scale.y = 0;
        cylinder.scale.z = 0;
        this.circles.add(cylinder);
    }

    addCrossOrCircle(xOffset, yOffset) {
        if (this.currentPlayer === "x") {
          this._addCross(xOffset, yOffset);
          this._updateBoardCopy(xOffset, yOffset);
          // this.currentPlayer = "o";
        } else {
          this._addCircle(xOffset, yOffset);
          this._updateBoardCopy(xOffset, yOffset);
          // this.currentPlayer = "x";
        }
      }
      checkWinConditions() {
        let strike;
    
        for (let n = 0; n < 3; n++) {
          if (this._checkRowWin(n)) {
            strike = this._getStrike(64, 2, 4);
            strike.position.y = this._getOffsetY(n);
            this.winLine.add(strike);
            return true;
          }
          if (this._checkColumnWin(n)) {
            strike = this._getStrike(2, 64, 4);
            strike.position.x = this._getOffsetX(n);
            this.winLine.add(strike);
            return true;

          }
        }
    
        if (this._topLeftToBottomRightWin()) {
          strike = this._getStrike(90, 2, 4);
          strike.rotation.z = -Math.PI / 4;
          this.winLine.add(strike);
          return true;

        }
    
        if (this._bottomLeftToTopRightWin()) {
          strike = this._getStrike(90, 2, 4);
          strike.rotation.z = Math.PI / 4;
          this.winLine.add(strike);
          return true;

        }
      }
    
        _getStrike(x, y, z) {
        const strikeGeometry = new THREE.BoxGeometry(x, y, z);
        const strikeMaterial = new THREE.MeshNormalMaterial();
        const strike = new THREE.Mesh(strikeGeometry, strikeMaterial);
        strike.scale.x = 0;
        strike.scale.y = 0;
        strike.scale.z = 0;
        return strike;
      }
    
      _checkRowWin(i) {
        return (
          this.boardCopy[i][0] === this.boardCopy[i][1] &&
          this.boardCopy[i][1] === this.boardCopy[i][2]
        );
      }
    
      _checkColumnWin(j) {
        return (
          this.boardCopy[0][j] === this.boardCopy[1][j] &&
          this.boardCopy[1][j] === this.boardCopy[2][j]
        );
      }
    
      _topLeftToBottomRightWin() {
        return (
          this.boardCopy[0][0] === this.boardCopy[1][1] &&
          this.boardCopy[1][1] === this.boardCopy[2][2]
        );
      }
    
      _bottomLeftToTopRightWin() {
        return (
          this.boardCopy[2][0] === this.boardCopy[1][1] &&
          this.boardCopy[1][1] === this.boardCopy[0][2]
        );
      }
    
      _getOffsetX(n) {
        if (n === 0) {
          return -24;
        } else if (n === 1) {
          return 0;
        } else {
          return 24;
        }
      }
    
      _getOffsetY(n) {
        if (n === 0) {
          return 24;
        } else if (n === 1) {
          return 0;
        } else {
          return -24;
        }
      }

      _checkDrawCondition() {
        for (let i = 0; i < 3; i++) {

          for (let k = 0; k < 3 ; k++) {
            if (this.boardCopy[i][k] != 'x' && this.boardCopy[i][k] != 'o' ) {
              return false;
            }
          }
        }
        return true;
      }
      _getWinStatus() {
        return this.win;
      }
      _createbutton() {
        const buttonGeometry = new THREE.BoxGeometry(24, 24, 24);
        const buttonMaterial= new THREE.MeshNormalMaterial();
        const firstButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
        const secondButtom = new THREE.Mesh(buttonGeometry, buttonMaterial);
        firstButton.position.x += 24;
        secondButtom.position.x -= 24;
        firstButton.scale.set(0,0,0);
        secondButtom.scale.set(0,0,0);
        firstButton.name = 'button1';
        secondButtom.name = 'button2';
        this.button.add(firstButton);
        this.button.add(secondButtom);
      }

}