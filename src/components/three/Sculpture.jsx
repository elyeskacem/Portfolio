import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../../hooks";

/* ------------------------------------------------------------------
   A small holographic sculpture for the 3D Design section.
   Morphs between primitives, spins on its own, and can be dragged.
------------------------------------------------------------------ */

const VERTEX = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = `
  uniform vec3 uCore;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    vec3 color = mix(uCore, uRim, fresnel);
    gl_FragColor = vec4(color, 0.18 + fresnel * 0.82);
  }
`;

const SHAPES = [
  () => new THREE.TorusKnotGeometry(1.15, 0.36, 160, 24),
  () => new THREE.IcosahedronGeometry(1.7, 1),
  () => new THREE.TorusGeometry(1.4, 0.42, 22, 90),
  () => new THREE.OctahedronGeometry(1.85, 0),
  () => new THREE.DodecahedronGeometry(1.75, 0),
];

const SHAPE_NAMES = ["Torus Knot", "Icosahedron", "Torus", "Octahedron", "Dodecahedron"];

const Sculpture = ({ height = 380 }) => {
  const mountRef = useRef(null);
  const [shapeName, setShapeName] = useState(SHAPE_NAMES[0]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6.2;

    const group = new THREE.Group();
    scene.add(group);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uCore: { value: new THREE.Color("#062b2a") },
        uRim: { value: new THREE.Color("#2ef0c0") },
      },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.35,
    });

    let shapeIndex = 0;
    let solid = null;
    let wire = null;

    const buildShape = (index) => {
      if (solid) {
        group.remove(solid);
        solid.geometry.dispose();
      }
      if (wire) {
        group.remove(wire);
        wire.geometry.dispose();
      }
      const geometry = SHAPES[index]();
      solid = new THREE.Mesh(geometry, shaderMaterial);
      wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        wireMaterial
      );
      group.add(solid, wire);
      setShapeName(SHAPE_NAMES[index]);
    };
    buildShape(0);

    // orbiting dust
    const dustCount = 260;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      const radius = 2.4 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      dustPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x24d3ee,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    /* ---------------- sizing ---------------- */
    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const heightPx = Math.max(1, rect.height);
      camera.aspect = width / heightPx;
      camera.updateProjectionMatrix();
      renderer.setSize(width, heightPx, false);
    };
    resize();
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    /* ---------------- interaction ---------------- */
    const rot = { x: 0, y: 0, tx: 0, ty: 0 };
    let dragging = false;
    let last = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      if (dragging) {
        rot.ty += (e.clientX - last.x) * 0.006;
        rot.tx += (e.clientY - last.y) * 0.006;
        last = { x: e.clientX, y: e.clientY };
      } else {
        // subtle hover parallax
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        group.position.x += (px * 0.5 - group.position.x) * 0.1;
        group.position.y += (-py * 0.5 - group.position.y) * 0.1;
      }
    };
    const onPointerUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    /* ---------------- loop ---------------- */
    const clock = new THREE.Clock();
    let frameId = 0;
    let onScreen = true;
    let pop = 0;
    let morphTimer = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion && !dragging) rot.ty += 0.0035;
      rot.x += (rot.tx - rot.x) * 0.08;
      rot.y += (rot.ty - rot.y) * 0.08;
      group.rotation.x = rot.x;
      group.rotation.y = rot.y;

      pop += (1 - pop) * 0.07;
      const breathe = reducedMotion ? 1 : 1 + Math.sin(elapsed * 1.2) * 0.02;
      group.scale.setScalar(pop * breathe);

      dust.rotation.y = elapsed * 0.06;
      dust.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

      renderer.render(scene, camera);
    };

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!onScreen || document.hidden) return;
      render();

      // cycle to the next primitive every 6s
      if (!reducedMotion && performance.now() - morphTimer > 6000) {
        morphTimer = performance.now();
        shapeIndex = (shapeIndex + 1) % SHAPES.length;
        buildShape(shapeIndex);
        pop = 0.55;
      }
    };
    morphTimer = performance.now();
    tick();

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
          })
        : null;
    if (observer) observer.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      if (observer) observer.disconnect();

      if (solid) solid.geometry.dispose();
      if (wire) wire.geometry.dispose();
      shaderMaterial.dispose();
      wireMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <Frame style={{ height }}>
      <div className="mount" ref={mountRef} />
      <span className="hint">
        <b>{shapeName}</b> · drag to rotate
      </span>
    </Frame>
  );
};

export default Sculpture;

const Frame = styled.div`
  position: relative;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: radial-gradient(
      120% 90% at 50% 0%,
      rgba(1, 190, 150, 0.12),
      transparent 60%
    ),
    var(--surface);
  overflow: hidden;
  touch-action: pan-y;

  .mount {
    position: absolute;
    inset: 0;
  }

  .hint {
    position: absolute;
    left: 50%;
    bottom: 14px;
    transform: translateX(-50%);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--faint);
    background: rgba(5, 6, 10, 0.55);
    border: 1px solid var(--border);
    padding: 0.3rem 0.75rem;
    border-radius: 50px;
    backdrop-filter: blur(8px);
    white-space: nowrap;

    b {
      color: var(--accent);
      font-weight: 600;
    }
  }
`;
