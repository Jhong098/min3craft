import { useFrame, useThree } from "react-three-fiber";
import { useSphere } from "use-cannon";

export const Player = (props) => {
  const { camera } = useThree();
  const [ref] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    ...props,
  }));

  useFrame(() => {
    camera.position.copy(ref.current.position);
  });

  return (
    <>
      <mesh ref={ref} />
    </>
  );
};
