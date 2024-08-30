import ReactFlow, { Node, Edge } from "reactflow";
import DBMLEntity from "@/components/DBMLEntity";

const nodeTypes = {
  entityNode: DBMLEntity,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "entityNode",
    position: { x: 250, y: 5 },
    data: { title: "Entité 1", items: ["Contenu de l'entité 1", "lol"] },
  },
  // ... autres nœuds
];

const initialEdges: Edge[] = [
  // ... définir vos connexions ici
];

function Diagram() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
    />
  );
}

export default Diagram;
