import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// Debug
const gui = new dat.GUI()

// Достали Canvas из html
const canvas = document.querySelector('canvas.webgl')

// Создали сцену
const scene = new THREE.Scene()
scene.background = new THREE.Color('#DEFEFF'); // ФОН !

// Объект(торус) с указанием размеров
const geometry = new THREE.TorusGeometry( .8, .1, 56, 200 );

// Materials
const material = new THREE.MeshBasicMaterial() //Базовый материал 
material.color = new THREE.Color(0x3f90f0) //Цвет

// Mesh
const sphere = new THREE.Mesh(geometry,material)// Задает геометрию + материалы те что заготовили сверху
scene.add(sphere)




// Lights 
{
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB1EEFF;  // brownish orange
    const intensity = 10;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  // Lights 2
  {
    const color = 0xFFFFFF;
    const intensity = 15;
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.position.set(250, 800, 250);
    light.target.position.set(-550, 40, -450);

    light.shadow.bias = -0.004;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    scene.add(light);
    scene.add(light.target);
    const cam = light.shadow.camera;
    cam.near = 1;
    cam.far = 2000;
    cam.left = -1500;
    cam.right = 1500;
    cam.top = 1500;
    cam.bottom = -1500;

    const cameraHelper = new THREE.CameraHelper(cam);
    scene.add(cameraHelper);
    cameraHelper.visible = false;
    const helper = new THREE.DirectionalLightHelper(light, 100);
    scene.add(helper);
    helper.visible = false;


}
/**
 * Sizes
 */
const sizes = { //TODO: Изучи это
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => //Обработчик событий на ихменение размера страницы TODO: запомни
{
    // Update sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)


// Controls Позволяет управлять объектом
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/*
TODO: 
1. Вставь GLTFLoader
3. Как менять материалы 
4. Адаптивность с помощью JS 

*/