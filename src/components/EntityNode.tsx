import React from "react";
import { Handle, Position } from "reactflow";

interface EntityNodeProps {
  data: {
    title: string;
    items: string[];
  };
}

const EntityNode: React.FC<EntityNodeProps> = ({ data }) => {
  return (
    <div className="entity-node">
      <Handle type="target" position={Position.Top} />
      <div className="entity-title">{data.title}</div>
      <ul className="entity-content">
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default EntityNode;
