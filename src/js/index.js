import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const cubeBlender = new URL('../blenderFigures/cube.glb', import.meta.url)
const littleMan = new URL('../blenderFigures/littleMan.glb', import.meta.url)


const renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(3)

orbit.update()

scene.add(axesHelper)

camera.position.set(0, 10, 30)

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)
cube.position.y = 3


const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x668c8c, side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI

const verticalPlane = new THREE.PlaneGeometry(30, 30)
const verticalPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0x5f5f5f, side: THREE.DoubleSide
})

const planeVertical = new THREE.Mesh(verticalPlane, verticalPlaneMaterial)
scene.add(planeVertical)
planeVertical.position.set(0, 15, -15)

// const gridHelper = new THREE.GridHelper(30)
// scene.add(gridHelper)


const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true
})

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)

const figureLoader = new GLTFLoader()

figureLoader.load(cubeBlender.href, (gltf) => {
    const model = gltf.scene
    scene.add(model)
    model.position.set(-12, 4, 10)
}, undefined, (error) => {
    console.log(error)
})

figureLoader.load(littleMan.href, (gltf) => {
    const model = gltf.scene
    scene.add(model)
    model.position.set(10, 4, 10)
}, undefined, (error) => {
    console.log(error)
})

const gui = new dat.GUI()

const options = {
    sphereColor: '#ffae00',
    cubColor: '#ffae00',
    speed: 0.01
}

gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)
})

gui.addColor(options, 'cubColor').onChange((e) => {
    cube.material.color.set(e)
})

gui.add(options, 'speed', 0, 0.1)

let step = 0

function animate(time){
    cube.rotation.x = time/1000
    cube.rotation.y = time/1000

    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
