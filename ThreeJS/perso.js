import * as THREE from "three";
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    camera,
    renderer,
    scene,
} from './post.js'

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

export default function loaderPerso() {
    const assetLoader = new GLTFLoader();

    /*-----------------------------------------------Importer un element 3D---------------------------------------------*/
    const THREEURL = new URL('../Assets/3D/Isaac.glb',
        import.meta.url); //Import le fichier 3D

    //*-----------------------------------------------Importation du model-----------------------------------------*/
    assetLoader.load(THREEURL.href, function (gltf) {
        const model = gltf.scene;

        scene.add(model);
        model.position.set(24.8, 0, -13);
        model.rotation.y += -1.55;
        model.scale.set(0.85, 0.85, 0.85);

        //Shadow on all objects----------------------------------------------------
        gltf.scene.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });

        idleAnimation();

        function idleAnimation() {
            const character = model.children[0];
            const clips = gltf.animations;

            const idleClip = clips.find(clip => clip.name.includes("Idle"));
            character.animations.push(idleClip);

            //console.log(character);

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
        function onClick(event){
            event.preventDefault();
        
            mouse.x = (event.offsetX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.offsetY / window.innerHeight) * 2 + 1;
            console.log("X : ", mouse.x);
            console.log("Y : ", mouse.y);
        
            raycaster.setFromCamera(mouse, camera);
        
            var intersects = raycaster.intersectObjects(scene.children);
        
            const Perso = intersects.find(intersect => intersect.object.name === "Mountain_01");
            console.dir(intersects);
        
            if(Perso){
                helloAnimation();
        
                function helloAnimation() {
                    const character = model.children[0];
                    const clips = gltf.animations;
        
                    const helloClip = clips.find(clip => clip.name.includes("Hello"));
                    character.animations.push(helloClip);
        
                    //console.log(character);
        
                    const mixer = new THREE.AnimationMixer(character);
        
                    const action = mixer.clipAction(helloClip)
                    action.play();
        
                    var clock = new THREE.Clock();
        
                    animate();
        
                    function animate() {
                        var dt = clock.getDelta();
                        mixer.update(dt);
                        requestAnimationFrame(animate);
                    }
                }
            } else {
                console.error("no clickable object");
            };
        }
        window.addEventListener('click', onClick, false);
*/

    }, undefined, function (error) {
        console.error(error);
    });
};