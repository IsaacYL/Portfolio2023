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

            idleAnimation();

            function idleAnimation() {
                const cloud = model;
                const clips = gltf.animations;

                const idleClip_01 = clips.find(clip => clip.name.includes("Idle_Cloud_01"));
                const idleClip_02 = clips.find(clip => clip.name.includes("Idle_Cloud_02"));
                const idleClip_03 = clips.find(clip => clip.name.includes("Idle_Cloud_03"));
                const idleClip_04 = clips.find(clip => clip.name.includes("Idle_Cloud_04"));
                cloud.animations.push(idleClip_01);
                cloud.animations.push(idleClip_02);
                cloud.animations.push(idleClip_03);
                cloud.animations.push(idleClip_04);

                //console.log(clips);

                const mixer = new THREE.AnimationMixer(cloud);

                const action_01 = mixer.clipAction(idleClip_01);
                const action_02 = mixer.clipAction(idleClip_02);
                const action_03 = mixer.clipAction(idleClip_03);
                const action_04 = mixer.clipAction(idleClip_04);
                action_01.play();
                action_02.play();
                action_03.play();
                action_04.play();

                var clock = new THREE.Clock();

                animate();

                function animate() {
                    var dt = clock.getDelta();
                    mixer.update(dt*0.5);
                    requestAnimationFrame(animate);
                }
            }

        }, undefined,
        function (error) {
            console.error(error);
        });

};