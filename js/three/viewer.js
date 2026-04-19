import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const IDLE_CLIP_NAME = "Slow_Walk_Reload";

export class HeroViewer {
  constructor(refs) {
    this.refs = refs;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.mixer = null;
    this.clipActions = new Map();
    this.currentAction = null;
    this.idleAction = null;
    this.activeModel = null;
    this.activeAssetPath = null;
    this.clock = new THREE.Clock();
    this.resizeObserver = null;
  }

  setViewerState(state, text) {
    const { videoShell, videoStatusText } = this.refs;
    videoShell.classList.toggle("is-loading", state === "loading");
    videoShell.classList.toggle("is-fallback", state === "fallback");
    videoStatusText.textContent = text;
  }

  init() {
    const { heroCanvas } = this.refs;

    this.renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.72;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    this.camera.position.set(0, 1.02, 5.45);

    this.controls = new OrbitControls(this.camera, heroCanvas);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.enableRotate = true;
    this.controls.target.set(0, 0.9, 0);
    this.controls.minAzimuthAngle = -0.45;
    this.controls.maxAzimuthAngle = 0.45;
    this.controls.minPolarAngle = 1.05;
    this.controls.maxPolarAngle = 1.65;

    this.setupLights();
    this.setupFloor();
    this.resizeRenderer();
    window.addEventListener("resize", () => this.resizeRenderer());
    this.resizeObserver = new ResizeObserver(() => this.resizeRenderer());
    this.resizeObserver.observe(heroCanvas.parentElement);
    this.animate();
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambient);

    const hemiLight = new THREE.HemisphereLight(0xfff6e7, 0xd7d2cb, 0.7);
    hemiLight.position.set(0, 4, 0);
    this.scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.55);
    keyLight.position.set(2.8, 5.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0008;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff4de, 0.72);
    fillLight.position.set(-3.5, 2.8, 3.2);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xdde6ff, 0.82);
    rimLight.position.set(-2.2, 2, -3.2);
    this.scene.add(rimLight);

    const groundGlow = new THREE.PointLight(0xfff2dd, 0.7, 18);
    groundGlow.position.set(0, 0.8, 3.5);
    this.scene.add(groundGlow);
  }

  setupFloor() {
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.35, 64),
      new THREE.MeshPhongMaterial({
        color: 0xe4dfd8,
        transparent: true,
        opacity: 0.42,
        depthWrite: true,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.55, 0);
    floor.receiveShadow = true;
    floor.renderOrder = 1;
    floor.visible = false; // ปิดฐานยืน
    this.scene.add(floor);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.ShadowMaterial({
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      }),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.57, 0);
    shadowPlane.receiveShadow = true;
    shadowPlane.renderOrder = 0;
    this.scene.add(shadowPlane);
  }

  resizeRenderer() {
    const { heroCanvas } = this.refs;
    const bounds = heroCanvas.parentElement.getBoundingClientRect();
    const width = Math.max(Math.floor(bounds.width), 320);
    const height = Math.max(Math.floor(bounds.height), 420);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  frameModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const pivot = new THREE.Group();
    pivot.add(model);
    this.scene.add(pivot);

    model.position.set(-center.x, -box.min.y, -center.z);

    const normalizedBox = new THREE.Box3().setFromObject(pivot);
    const normalizedSize = new THREE.Vector3();
    const normalizedCenter = new THREE.Vector3();
    normalizedBox.getSize(normalizedSize);
    normalizedBox.getCenter(normalizedCenter);

    const targetHeight = 6.05;
    const scale = targetHeight / normalizedSize.y;
    pivot.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(pivot);
    const scaledSize = new THREE.Vector3();
    const scaledCenter = new THREE.Vector3();
    scaledBox.getSize(scaledSize);
    scaledBox.getCenter(scaledCenter);

    const halfHeight = scaledSize.y * 0.5;
    const halfWidth = scaledSize.x * 0.5;
    const verticalFov = THREE.MathUtils.degToRad(this.camera.fov);
    const horizontalFov =
      2 * Math.atan(Math.tan(verticalFov / 2) * this.camera.aspect);
    const fitHeightDistance = halfHeight / Math.tan(verticalFov * 0.5);
    const fitWidthDistance = halfWidth / Math.tan(horizontalFov * 0.5);
    const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.25;

    pivot.position.set(0, -scaledBox.min.y - 1.6, 0);
    pivot.rotation.y = 0.02;

    this.controls.target.set(0, scaledCenter.y * 0.46, 0);
    this.camera.position.set(0, scaledCenter.y * 0.42, distance);
    this.controls.update();

    this.activeModel = pivot;
  }

  fadeToAction(nextAction, fadeDuration = 0.22) {
    if (!nextAction || this.currentAction === nextAction) return;

    const previousAction = this.currentAction;
    this.currentAction = nextAction;
    this.currentAction.reset().fadeIn(fadeDuration).play();

    if (previousAction) {
      previousAction.fadeOut(fadeDuration);
    }
  }

  playIdleAnimation() {
    if (!this.idleAction) return;

    this.idleAction.enabled = true;
    this.idleAction.setLoop(THREE.LoopRepeat, Infinity);
    this.idleAction.clampWhenFinished = false;
    this.fadeToAction(this.idleAction);
  }

  playSectionAnimation(clipName) {
    const nextAction = this.clipActions.get(clipName);
    if (!nextAction) {
      this.playIdleAnimation();
      return;
    }

    nextAction.enabled = true;
    nextAction.setLoop(THREE.LoopOnce, 1);
    nextAction.clampWhenFinished = true;
    nextAction.reset();
    this.fadeToAction(nextAction, 0.18);
  }

  clearCurrentModel() {
    if (this.activeModel) {
      this.scene.remove(this.activeModel);
      this.activeModel.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose?.();
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose?.());
          } else {
            child.material?.dispose?.();
          }
        }
      });
      this.activeModel = null;
    }

    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer = null;
    }

    this.clipActions = new Map();
    this.currentAction = null;
    this.idleAction = null;
  }

  async loadModel(assetPath) {
    if (!assetPath || assetPath === this.activeAssetPath) return;

    this.setViewerState("loading", "Loading 3D preview...");
    this.refs.videoShell.classList.add("is-switching");
    this.clearCurrentModel();

    const loader = new GLTFLoader();

    try {
      const gltf = await loader.loadAsync(assetPath);
      this.activeAssetPath = assetPath;
      const modelScene = gltf.scene;

      modelScene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.side = THREE.FrontSide;
          child.castShadow = true;
          child.receiveShadow = true;

          if ("metalness" in child.material) child.material.metalness = 0.05;
          if ("roughness" in child.material) child.material.roughness = 0.92;
          if ("envMapIntensity" in child.material) {
            child.material.envMapIntensity = 0.2;
          }
        }
      });

      this.frameModel(modelScene);

      const animationNames = (gltf.animations || []).map(
        (clip, index) => clip.name || `unnamed_${index}`,
      );
      window.__modelAnimationNames = animationNames;
      console.log("[resume] Loaded model:", assetPath);
      console.log("[resume] Animation names:", animationNames);

      if (gltf.animations && gltf.animations.length) {
        this.mixer = new THREE.AnimationMixer(this.activeModel);
        gltf.animations.forEach((clip, index) => {
          const clipName = clip.name || `unnamed_${index}`;
          this.clipActions.set(clipName, this.mixer.clipAction(clip));
        });

        this.mixer.addEventListener("finished", (event) => {
          if (event.action !== this.idleAction) {
            this.playIdleAnimation();
          }
        });

        this.idleAction =
          this.clipActions.get(IDLE_CLIP_NAME) ||
          this.clipActions.get(animationNames[0]) ||
          null;
        this.playIdleAnimation();
      }

      this.setViewerState("ready", "3D preview ready");
    } catch (error) {
      this.activeAssetPath = null;
      this.mixer = null;
      console.error(error);
      this.setViewerState(
        "fallback",
        "3D model failed to load. Try opening this page through a local server.",
      );
    } finally {
      window.setTimeout(() => {
        this.refs.videoShell.classList.remove("is-switching");
      }, 220);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    this.mixer?.update(delta);
    this.controls?.update();
    this.renderer?.render(this.scene, this.camera);
  }
}
