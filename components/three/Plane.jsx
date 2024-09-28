// Plane.jsx
'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three' // Ensure Three.js is imported

const Plane = ({ texture, width, height, active, ...props }) => {
  const meshRef = useRef()
  const { viewport } = useThree()
  const tex = useTexture(texture) // Load texture

  /*------------------------------
  Adjust Texture Filtering to Prevent Blurriness
  ------------------------------*/
  useEffect(() => {
    if (tex) {
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
    }
  }, [tex])

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uTex: { value: tex }, // Ensure the texture is applied
        uRes: { value: { x: viewport.width, y: viewport.height } },
        uImageRes: {
          value: { x: tex.source.data.width, y: tex.source.data.height },
        },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.0;
          float wave = cos(angle);
          float c = sin(length(uv - 0.5) * 15.0 + uProgress * 12.0) * 0.5 + 0.5;
          pos.x *= mix(1.0, uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1.0, uZoomScale.y + wave * c, uProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex;
        varying vec2 vUv;

        void main() {
          vec3 tex = texture2D(uTex, vUv).rgb;
          gl_FragColor = vec4(tex, 1.0); // Directly display the texture without outline
        }
      `,
    }),
    [tex, viewport.width, viewport.height]
  )

  /*------------------------------
  Animate Uniforms
  ------------------------------*/
  useEffect(() => {
    if (
      meshRef.current &&
      meshRef.current.material &&
      meshRef.current.material.uniforms
    ) {
      meshRef.current.material.uniforms.uZoomScale.value.x =
        viewport.width / width
      meshRef.current.material.uniforms.uZoomScale.value.y =
        viewport.height / height

      gsap.to(meshRef.current.material.uniforms.uProgress, {
        value: active ? 1 : 0,
        duration: active ? 2.5 : 1, // 2.5 seconds on open, 1 second on close
        ease: 'power3.out',
      })

      gsap.to(meshRef.current.material.uniforms.uRes.value, {
        x: active ? viewport.width : width,
        y: active ? viewport.height : height,
        duration: active ? 2.5 : 1, // Match duration with uProgress
        ease: 'power3.out',
      })
    }
  }, [viewport.width, viewport.height, active, width, height])

  return (
    <mesh ref={meshRef} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial {...shaderArgs} />
    </mesh>
  )
}

export default Plane
