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
        uPrimaryColor: { value: new THREE.Color(0xd4af37) }, // Use actual colors as needed
        uSecondaryColor: { value: new THREE.Color(0xc0c0c0) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - 0.5) * 15.0 + uProgress * 12.0) * 0.5 + 0.5;
          pos.x *= mix(1.0, uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1.0, uZoomScale.y + wave * c, uProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex;
        uniform vec2 uRes;
        uniform vec2 uZoomScale;
        uniform vec2 uImageRes;
        uniform vec3 uPrimaryColor;
        uniform vec3 uSecondaryColor;

        varying vec2 vUv;

        /*------------------------------
        Background Cover UV
        --------------------------------
        Calculate UV coverage and distance to edges for outline effect
        ------------------------------*/
        vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
          float rs = s.x / s.y; // Aspect screen size
          float ri = i.x / i.y; // Aspect image size
          vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); 
          vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; 
          return u * s / st + o;
        }

        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec3 tex = texture2D(uTex, uv).rgb;

          // Calculate the distance from the edge
          float edgeDist = min(uv.x, uv.y);
          edgeDist = min(edgeDist, 1.0 - uv.x);
          edgeDist = min(edgeDist, 1.0 - uv.y);

          // Define the thickness of the outline
          float outlineThickness = 0.01; // Adjust this to control the outline size

          // Mix between primary and secondary colors for the outline
          vec3 outlineColor = mix(uPrimaryColor, uSecondaryColor, edgeDist);

          // If we're close to the edge, apply the outline color, otherwise show the texture
          vec3 finalColor = mix(outlineColor, tex, smoothstep(0.0, outlineThickness, edgeDist));

          gl_FragColor = vec4(finalColor, 1.0);
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
        duration: 2.5,
        ease: 'power3.out',
      })

      gsap.to(meshRef.current.material.uniforms.uRes.value, {
        x: active ? viewport.width : width,
        y: active ? viewport.height : height,
        duration: 1,
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
