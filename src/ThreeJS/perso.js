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

            const action = mixer.clipAction(idleClip);

            mixer.clipAction(idleClip).reset();
            mixer.clipAction(idleClip).clampWhenFinished = true;
            action.play();

            var clock = new THREE.Clock();

            animate();

            function animate() {
                var dt = clock.getDelta();
                mixer.update(dt);
                requestAnimationFrame(animate);
            }
        }
        
        function onClick(event) {
            //event.preventDefault();
            
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            //console.log("X : ", mouse.x);
            //console.log("Y : ", mouse.y);
            
            raycaster.setFromCamera(mouse, camera);

            var persoAssets = [];
            for(let i = 0; i < scene.children[5].children[0].children.length; i++){
                persoAssets.push(scene.children[5].children[0].children[i]);
            }
            
            //console.log("Perso Assets : ");
            //console.log(persoAssets);
            
            //var intersects = raycaster.intersectObjects(scene.children[5].children[0]);
            var intersects = raycaster.intersectObjects(scene.children);

            //const perso = intersects.find(intersect => intersect.object.name.toLowerCase() === "isaac");
            const hasPerso = intersects.some(intersect => persoAssets.includes(intersect.object));
            //const hasPerso = persoAssets.includes(intersects[0]);

            //console.log("Intersection : ");
            //console.dir(intersects);
            //console.dir(hasPerso);
            
            if (hasPerso) {
                helloAnimation();
                
                function helloAnimation() {
                    const character = model.children[0];
                    const clips = gltf.animations;
                    
                    const helloClip = clips.find(clip => clip.name.includes("Hello"));
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
        window.addEventListener('click', onClick, {passive: true});


    }, undefined, function (error) {
        console.error(error);
    });
};