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
    camera,
    renderer,
    scene,
} from './post.js'

export default function decors() {
    const assetLoader = new GLTFLoader();

    /*-----------------------------------------------Importer un element 3D---------------------------------------------*/
    const THREEURL = new URL('../Assets/3D/Scene.glb',
        import.meta.url); //Import le fichier 3D

    //*-----------------------------------------------Importation du model-----------------------------------------*/
    assetLoader.load(THREEURL.href, function (gltf) {
            const model = gltf.scene;

            scene.add(model);
            model.position.set(26, 0, -22);
            model.rotation.y += -1.55;


            //Shadow on all objects----------------------------------------------------
            gltf.scene.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                }
            });

        }, undefined,
        function (error) {
            console.error(error);
        });

};