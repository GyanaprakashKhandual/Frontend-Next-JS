let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let mesh = new THREE.Mesh(box, material);
scene.add(mesh);

const canvas = document.querySelector('#draw');
let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let clock = new THREE.Clock(); // ✅ Corrected here

function animate() {
    requestAnimationFrame(animate);
    let time = clock.getElapsedTime();
    mesh.rotation.z = time;
    mesh.rotation.x = time;
    mesh.rotation.y = time;
    renderer.render(scene, camera);
}

animate();
