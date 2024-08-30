import ReactFlow, { Node, Edge, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import DBMLEntity from "@/components/DBMLEntity";

const nodeTypes = {
  dbmlEntity: DBMLEntity,
};

function Schema({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      className="bg-gray-100"
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default Schema;
