import * as THREE from "three";
import {
    THREEx
} from "threex.domevents"
import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightShadow,
    HemisphereLight,
    Int8Attribute
} from "three";
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {
    RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {
    UnrealBloomPass
} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import {
    SMAAPass
} from 'three/examples/jsm/postprocessing/SMAAPass.js'
import {
    ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass.js'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

export var cameraRotationInit;

/*-----------------------------------------------Paramètre de la caméra---------------------------------------------*/
export const camera = new THREE.PerspectiveCamera(
    30, /*Angle de vu*/
    window.innerWidth / window.innerHeight, /*Taille de la fenetre*/
    0.1, /*Plus proche de ce que l'on voit*/
    100 /*Plus loin de ce que l'on voit*/
);

const canvas = document.querySelector('#c');

export const renderer = new THREE.WebGLRenderer({
    canvas
});

const renderTarget = new THREE.WebGLRenderTarget(1920, 1080, {
    /*samples: renderer.getPixelRatio() === 1 ? 2 : 0*/
});
const effectComposer = new EffectComposer(renderer, renderTarget);

export const scene = new THREE.Scene();

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

animateRotation();

export function post() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    renderer.setClearColor(0xD3B6A0); //Background color

    /*---------------------------------------------Creation d'un plane / sol--------------------------------------------------*/
    const planeGeometry = new THREE.PlaneGeometry(300, 300);
    const planeMaterial = new THREE.MeshStandardMaterial({
        //color: 0x9794D6
        color: 0xB59F8D
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
    scene.add(plane);

    /*-----------------------------------------------Creation de brume---------------------------------------------------*/
    //scene.fog = new THREE.Fog(0x9794D6, 0, 70);

    /*-----------------------------------------------Creation d'une lumière ----------------------------------------------*/
    const ambientlight = new THREE.AmbientLight(0xEFD9C7, 2);
    scene.add(ambientlight);

    const light = new THREE.DirectionalLight(0XFFFFFF, 2);
    light.position.set(50, 30, -10);
    light.target.position.set(24, 0, -25);

    //Frustum Light
    light.shadow.camera.top = 8;
    light.shadow.camera.right = 100;
    light.shadow.camera.bottom = -8;
    light.shadow.camera.left = -100;
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 100;

    //Shadow map resolution
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512

    scene.add(light);
    scene.add(light.target);

    light.castShadow = true;
    light.shadow.radius = 3;
    light.shadow.blurSamples = 10;

    /*------------------------------------------------Position de la camera + Update--------------------------------------*/
    //cameraRotationInit = camera.rotation;
    //new OrbitControls(camera, renderer.domElement);

    /*------------------------------------------------Post-Processing--------------------------------------*/
    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    /*Anti-aliasing*/
    if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
        const smaaPass = new SMAAPass();
        effectComposer.addPass(smaaPass);
    }

    THREE.ColorManagement.enabled = true;

    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;


    /*Bloom*/
    const unrealBloomPass = new UnrealBloomPass();
    effectComposer.addPass(unrealBloomPass);

    unrealBloomPass.strength = 0.1;
    unrealBloomPass.radius = 2;
    unrealBloomPass.threshold = 0.3;

    /*Tint*/
    /*
        const TintShader = {
            uniforms: {
                tDiffuse: {
                    value: null
                },
                uTint: {
                    value: null
                }
            },
            vertexShader: `
            varying vec2 vUv;

                void main()
                {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                    vUv = uv;
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec3 uTint;

                varying vec2 vUv;

                void main()
                {
                    vec4 color = texture2D(tDiffuse, vUv);
                    color.rgb += uTint;

                    gl_FragColor = color;
                }
            `
        }

        const tintPass = new ShaderPass(TintShader);
        tintPass.material.uniforms.uTint.value = new THREE.Vector3(0, 0, 0.05); //R V B (Between -1 and 1)
        effectComposer.addPass(tintPass);*/



    /*------------------------------------------------Resize--------------------------------------*/
    canvas.onresize = function () {
        effectComposer.setSize(canvas.clientWidth, canvas.clientHeight);
        effectComposer.setPixelRatio(Math.min(canvas.devicePixelRatio, 2));
    }
};

function resizeRendererToDisplaySize(renderer) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (canvas.clientWidth <= 768 && canvas.clientWidth > 500) {
        camera.position.set(25, 2, 0);
        //camera.lookAt(0, 2, -4);
        camera.rotation.x = -0.05;
    }
    if (canvas.clientWidth > 768) {
        camera.position.set(25, 2, 0);
        //camera.lookAt(0, 2, -4);
        scene.fog = new THREE.Fog(0xD6BAA4, 10, 160);
    }
    if (canvas.clientWidth <= 500) {
        camera.position.set(26, 2, 9);
        camera.rotation.x = -0.05;
        camera.rotation.y = 0.1;
        //camera.lookAt(0, 2, -4);
        scene.fog = new THREE.Fog(0xD6BAA4, 10, 150);
    }

    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

export function animate(time) {
    time *= 0.001;
    requestAnimationFrame(animate);

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    effectComposer.render();
}

document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {

    mouse.x = (event.clientX - windowHalf.x);
    mouse.y = (event.clientY - windowHalf.x);

}

function animateRotation() {

    target.x = (1 - mouse.x) * 0.00006;
    target.y = (1 - mouse.y) * 0.00006;

    camera.rotation.x += 0.05 * (target.y - camera.rotation.x);
    camera.rotation.y += 0.05 * (target.x - camera.rotation.y);

    //console.log("X : " + camera.rotation.x);
    //console.log("Y : " + camera.rotation.y);

    requestAnimationFrame(animateRotation);
    renderer.render(scene, camera);

}