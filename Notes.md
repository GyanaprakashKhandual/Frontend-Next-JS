const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
const canvas = document.querySelector('#draw')
const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 100);
camera.position.z = 5;
scene.add(camera)

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
let mesh = new THREE.Mesh(box, material);

// mesh.position.z = 1; 
// mesh.position.y = 1;
// mesh.position.x = 1; 
// mesh.rotation.y = 1;
// mesh.scale.x = 1.6;
// mesh.scale.y = 1.6;
// mesh.scale.z = 3.6;
// Formula of PI Math.PI and mathematical opreation
scene.add(mesh);

const canvas = document.querySelector('#draw');
let renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);