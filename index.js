
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0xdddddd);
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement)

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate()
