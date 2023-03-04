import * as THREE from "three";
import {
    THREEx
} from "threex.domevents"
import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightShadow,
    HemisphereLight,
    Int8Attribute,
} from "three";
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    scene
} from './post.js'

export default function diplodocus() {
    const assetLoader = new GLTFLoader();

    /*-----------------------------------------------Importer un element 3D---------------------------------------------*/
    const THREEURL = new URL('../Assets/3D/diplodocus.glb',
        import.meta.url); //Import le fichier 3D

    //*-----------------------------------------------Importation du model-----------------------------------------*/
    assetLoader.load(THREEURL.href, function (gltf) {
        model = gltf.scene;

        scene.add(model);
        model.position.set(21, -1.8, -40);
        model.rotation.y += -1.55;
        model.scale.set(0.6, 0.6, 0.6);

        //Shadow on all objects----------------------------------------------------
        gltf.scene.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });

    }, undefined, function (error) {
        console.error(error);
    });

};