import * as THREE from 'three';
import {FontLoader} from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class Text {
    constructor(scene,text,xOffset,yOffset) {
        this.text = text;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.scene = scene;
        this.textMesh = null
        this._createText();
    }
      _createText() {
        const fontLoader = new FontLoader();
        fontLoader.load(
            'three/examples/fonts/droid/droid_sans_bold.typeface.json',
            (droidFont) => {
                const textGeometry = new TextGeometry(this.text, {
                    height: 2,
                    size: 10,
                    font: droidFont,
                });
                textGeometry.computeBoundingBox();
                const boundingBox = textGeometry.boundingBox;
                const textWidth = boundingBox.max.x - boundingBox.min.x;
                const textHeight = boundingBox.max.y - boundingBox.min.y;
    
                const textMaterial =     new THREE.MeshNormalMaterial();
                const text = new THREE.Mesh(textGeometry, textMaterial);
                text.position.x = -textWidth / 2;
                text.position.y = this.yOffset;
                text.position.z = this.xOffset;
                text.scale.set(0,0,0);
    
                this.textMesh = text;
                this.scene.add(this.textMesh);
            }
        );
    }
} 