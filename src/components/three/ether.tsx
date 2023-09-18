import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Ether3D = (props: { size: number }) => {
  const ether = useGLTF("./eth.glb");
  return (
    <Canvas>
      <OrbitControls autoRotate enableZoom={false} enablePan={false} />
      <Environment preset="sunset" />
      <primitive scale={props.size} object={ether.scene}></primitive>
    </Canvas>
  );
};
useGLTF.preload("./eth.glb");
export default Ether3D;
