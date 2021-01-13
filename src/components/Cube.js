import { useState } from "react";
import { useBox } from "use-cannon";

import * as textures from "../textures";
import { useStore } from "../hooks/useStore";

export const Cube = ({ position, texture, id, ...props }) => {
  const [hover, setHover] = useState(null);
  const [
    addCube,
    removeCube,
    activeTexture,
  ] = useStore(({ addCube, removeCube, activeTexture }) => [
    addCube,
    removeCube,
    activeTexture,
  ]);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    ...props,
  }));
  const color = texture === "glass" ? "skyblue" : "white";

  return (
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(Math.floor(e.faceIndex / 2));
      }}
      onPointerOut={(e) => {
        setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        console.log(activeTexture);
        console.log(texture);
        if (clickedFace === 0) {
          e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z, activeTexture);
          return;
        }
        if (clickedFace === 1) {
          e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z, activeTexture);
          return;
        }
        if (clickedFace === 2) {
          e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z, activeTexture);
          return;
        }
        if (clickedFace === 3) {
          e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z, activeTexture);
          return;
        }
        if (clickedFace === 4) {
          e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1, activeTexture);
          return;
        }
        if (clickedFace === 5) {
          e.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1, activeTexture);
          return;
        }
      }}
    >
      {[...Array(6)].map((_, i) => (
        <meshStandardMaterial
          attachArray="material"
          map={textures[texture]}
          key={`${id}_${i}`}
          color={hover === i ? "gray" : color}
          opacity={texture === "glass" ? 0.7 : 1}
          transparent={true}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};
