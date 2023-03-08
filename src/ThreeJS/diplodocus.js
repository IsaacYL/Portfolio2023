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
    scene,
    camera,
} from './post.js'

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

export default function diplodocus() {
    const assetLoader = new GLTFLoader();

    /*-----------------------------------------------Importer un element 3D---------------------------------------------*/
    const THREEURL = new URL('../Assets/3D/diplodocus.glb',
        import.meta.url); //Import le fichier 3D

    //*-----------------------------------------------Importation du model-----------------------------------------*/
    assetLoader.load(THREEURL.href, function (gltf) {
        const model = gltf.scene;

        scene.add(model);
        model.position.set(20, 0.1, -20);
        model.rotation.y += -1.55;
        model.scale.set(0.6, 0.6, 0.6);

        //Shadow on all objects----------------------------------------------------
        gltf.scene.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });

        idleAnimation();

        function idleAnimation() {
            const character = model;
            const clips = gltf.animations;

            console.log(character);
            const idleClip = clips.find(clip => clip.name.includes("Idle"));
            character.animations.push(idleClip);

            const mixer = new THREE.AnimationMixer(character);

            const action = mixer.clipAction(idleClip)
            action.play();

            var clock = new THREE.Clock();

            animate();

            function animate() {
                var dt = clock.getDelta();
                mixer.update(dt);
                requestAnimationFrame(animate);
            }
        }
        /*
        function onClick(event) {
            event.preventDefault();
            
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            console.log("X : ", mouse.x);
            console.log("Y : ", mouse.y);
            
            raycaster.setFromCamera(mouse, camera);
            
            var intersects = raycaster.intersectObjects(scene.children, true);

            const Perso = intersects.find(intersect => intersect.object.name.toLowerCase() === "diplodocus");

            console.dir(intersects[0]);
            
            if (Perso) {
            jumpAnimation();
            
            function jumpAnimation() {
                const character = model.children[0];
                const clips = gltf.animations;
                
                const helloClip = clips.find(clip => clip.name.includes("OnClick"));
                character.animations.push(helloClip);
                
                //console.log(character);

                const mixer = new THREE.AnimationMixer(character);
                mixer.clipAction(helloClip).loop = THREE.LoopOnce;

                const action = mixer.clipAction(helloClip);

                mixer.clipAction(helloClip).reset();
                mixer.clipAction(helloClip).clampWhenFinished = true;
                action.play();

                var clock = new THREE.Clock();
                
                animate();
                
                function animate() {
                    var dt = clock.getDelta();
                    mixer.update(dt*2);
                    requestAnimationFrame(animate);
                }
            }
            
            } else {
                console.error("no clickable object");
            };
        }
        window.addEventListener('click', onClick, false);*/

    }, undefined, function (error) {
        console.error(error);
    });

};
/*
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onClick(event) {

    event.preventDefault();

    mouse.x = (event.offsetX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.offsetY / window.innerHeight) * 2 + 1;
    console.log("X : ", mouse.x);
    console.log("Y : ", mouse.y);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    const Perso = intersects.find(intersect => intersect.object.name.toLowerCase() === "Diplodocus");
    console.dir(intersects);

    if (Perso) {
        jump = clips.filter(function (clip) {
            return clip.name.includes("OnClick");
        });

        jump.forEach(function (clip) {
            mixer.clipAction(clip).reset();
            mixer.clipAction(clip).clampWhenFinished = true;
            mixer.clipAction(clip).loop = THREE.LoopOnce;
            return mixer.clipAction(clip).play();
        });
    } else {
        console.error("no clickable object");
    };

    let start;

    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
    };
    window.requestAnimationFrame(step);
}
window.addEventListener('click', onClick, false);*/