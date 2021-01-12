import { useBox } from "use-cannon";
import * as textures from "../textures";

export const Cube = ({ position, type, ...props }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    ...props,
  }));
  return (
    <mesh castShadow ref={ref}>
      {[...Array(6)].map((_, i) => (
        <meshStandardMaterial
          attachArray="material"
          map={textures[type]}
          key={i}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};
