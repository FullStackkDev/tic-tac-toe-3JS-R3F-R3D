import React from "react";
function Grid(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.2, 7, 0.15]} />
      <meshBasicMaterial color="red" metalness={1} roughness={0.1} />
    </mesh>
  );
}

export default React.memo(Grid);
