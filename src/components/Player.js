import { useEffect, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3 } from "three";
import { useSphere } from "use-cannon";

import { useKeyboardControls } from "../hooks/useKeyboardControls";

const SPEED = 6;

export const Player = (props) => {
  const { forward, back, left, right, jump } = useKeyboardControls();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    ...props,
  }));
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(ref.current.position);
    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, (back ? 1 : 0) - (forward ? 1 : 0));
    const sideVector = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });

  return (
    <>
      <mesh ref={ref} />
    </>
  );
};
