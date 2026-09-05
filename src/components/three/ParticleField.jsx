import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { usePointerFine, usePrefersReducedMotion } from "../../hooks";

/* ------------------------------------------------------------------
   Interactive particle field (three.js, custom GLSL).
   · every particle drifts on its own sine loop
   · the cursor pushes particles away in world space (GPU side)
   · a click sends a short shockwave through the field
   · wireframe solids float behind for depth
   · pauses itself when off-screen or when the tab is hidden
------------------------------------------------------------------ */

const VERTEX = `
  uniform float uTime;
  uniform vec3  uSpread;
  uniform vec2  uMouse;
  uniform float uStrength;
  uniform float uRadius;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aPhase;
  attribute vec3  aColor;

  varying vec3  vColor;
  varying float vGlow;

  void main() {
    vec3 pos = position * uSpread;

    // gentle organic drift
    pos.x += sin(uTime * 0.24 + aPhase) * 2.4;
    pos.y += cos(uTime * 0.19 + aPhase * 1.3) * 2.4;
    pos.z += sin(uTime * 0.16 + aPhase * 0.7) * 1.8;

    // cursor repulsion
    vec2 delta = pos.xy - uMouse;
    float dist = length(delta);
    float force = smoothstep(uRadius, 0.0, dist) * uStrength;
    pos.xy += normalize(delta + 0.0001) * force * 9.0;
    pos.z  += force * 4.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (300.0 / max(-mv.z, 1.0));

    vColor = aColor;
    vGlow = 0.32 + force * 0.85;
  }
`;

const FRAGMENT = `
  varying vec3  vColor;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = pow(smoothstep(0.5, 0.0, d), 1.8);
    gl_FragColor = vec4(vColor * (0.7 + vGlow), alpha * vGlow);
  }
`;

const PALETTE = ["#01be96", "#24d3ee", "#7c5cff", "#c9f4e9"];

const ParticleField = ({ density = 1 }) => {
  const mountRef = useRef(null);
  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      // No WebGL: the CSS background alone still looks fine.
      return undefined;
    }

    const isSmall = window.innerWidth < 768;
    const count = Math.round((isSmall ? 900 : 2600) * density);
    const maxDpr = isSmall ? 1.5 : 2;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
    camera.position.z = 70;

    /* ---------------- particles ---------------- */
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const palette = PALETTE.map((hex) => new THREE.Color(hex));

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = Math.random() - 0.5;
      positions[i * 3 + 1] = Math.random() - 0.5;
      positions[i * 3 + 2] = Math.random() - 0.5;
      scales[i] = 0.35 + Math.pow(Math.random(), 3) * 2.2;
      phases[i] = Math.random() * Math.PI * 2;
      const color = palette[(Math.random() * palette.length) | 0];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uTime: { value: 0 },
      uSpread: { value: new THREE.Vector3(160, 100, 70) },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uStrength: { value: 0 },
      uRadius: { value: isSmall ? 16 : 22 },
      uSize: { value: isSmall ? 9 : 11 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ---------------- floating wireframes ---------------- */
    const solids = new THREE.Group();
    const wireMaterial = (color, opacity) =>
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
        depthWrite: false,
      });

    const icosa = new THREE.Mesh(
      new THREE.IcosahedronGeometry(17, 1),
      wireMaterial(0x01be96, 0.16)
    );
    icosa.position.set(26, 4, -26);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(9, 2.1, 90, 12),
      wireMaterial(0x7c5cff, 0.13)
    );
    knot.position.set(-30, -12, -34);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(12, 0.35, 8, 70),
      wireMaterial(0x24d3ee, 0.18)
    );
    ring.position.set(-18, 20, -20);
    ring.rotation.x = 1.1;

    solids.add(icosa, knot, ring);
    scene.add(solids);

    /* ---------------- sizing ---------------- */
    const sizes = { width: 1, height: 1 };
    const resize = () => {
      const rect = mount.getBoundingClientRect();
      sizes.width = Math.max(1, rect.width);
      sizes.height = Math.max(1, rect.height);
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height, false);
      uniforms.uPixelRatio.value = renderer.getPixelRatio();

      // keep particle density even whatever the viewport shape
      const visibleHeight =
        2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      uniforms.uSpread.value.set(
        visibleHeight * camera.aspect * 1.25,
        visibleHeight * 1.25,
        70
      );
    };
    resize();

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    /* ---------------- pointer ---------------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: 0, target: 0 };
    let burst = 0;

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.target = 1;
    };
    const onPointerLeave = () => {
      pointer.target = 0;
    };
    const onPointerDown = () => {
      burst = 1;
    };

    if (pointerFine && !reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    /* ---------------- loop ---------------- */
    const clock = new THREE.Clock();
    let frameId = 0;
    let onScreen = true;
    let hidden = document.hidden;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;

      // smooth the pointer so nothing snaps
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.active += (pointer.target - pointer.active) * 0.06;

      const visibleHeight =
        2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      uniforms.uMouse.value.set(
        (pointer.x * visibleHeight * camera.aspect) / 2,
        (pointer.y * visibleHeight) / 2
      );

      burst *= 0.94;
      uniforms.uStrength.value = pointer.active * (1 + burst * 1.8);
      uniforms.uRadius.value = (isSmall ? 16 : 22) * (1 + burst * 1.2);

      // parallax + slow rotations
      camera.position.x += (pointer.x * 6 - camera.position.x) * 0.03;
      camera.position.y += (pointer.y * 4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      points.rotation.z = elapsed * 0.012;
      icosa.rotation.x = elapsed * 0.14;
      icosa.rotation.y = elapsed * 0.1;
      knot.rotation.y = elapsed * 0.18;
      knot.rotation.z = elapsed * 0.09;
      ring.rotation.z = elapsed * 0.22;
      solids.position.y = Math.sin(elapsed * 0.35) * 1.6;

      renderer.render(scene, camera);
    };

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!onScreen || hidden) return;
      render();
    };

    if (reducedMotion) {
      render();
    } else {
      tick();
    }

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              if (onScreen) clock.getDelta(); // avoid a time jump
            },
            { threshold: 0 }
          )
        : null;
    if (observer) observer.observe(mount);

    const onVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---------------- cleanup ---------------- */
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (observer) observer.disconnect();

      geometry.dispose();
      material.dispose();
      solids.children.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [density, pointerFine, reducedMotion]);

  return <Canvas ref={mountRef} aria-hidden="true" />;
};

export default ParticleField;

const Canvas = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  animation: fadeCanvas 1.6s var(--ease) 0.2s forwards;

  @keyframes fadeCanvas {
    to {
      opacity: 1;
    }
  }
`;
