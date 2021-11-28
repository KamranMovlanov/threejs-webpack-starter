import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Достали Canvas из html
const canvas = document.querySelector('canvas.webgl')

// Создали сцену
const scene = new THREE.Scene()

// Объект(торус) с указанием размеров
const geometry = new THREE.TorusGeometry( .8, .1, 56, 200 );

// Materials
const material = new THREE.MeshBasicMaterial() //Базовый материал 
material.color = new THREE.Color(0x115777) //Цвет

// Mesh
const sphere = new THREE.Mesh(geometry,material)// Задает геометрию + материалы те что заготовили сверху
scene.add(sphere)

// Lights
const light = new THREE.PointLight( 0xffffff, 1, 100 ); 
light.position.set( 50, 50, 50 ); //Позиция света
scene.add( light ); //Добавить свет в сцену


/**
 * Sizes
 */
const sizes = { //TODO: Изучи это
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => //Обработчик собитий на ихменение размера страницы TODO: запмни
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
camera.position.z = 3
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

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 1 * elapsedTime
    

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
2. Врубись как изменить фон
3. Как менять материалы 
4. Свет



*/