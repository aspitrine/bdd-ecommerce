import React from "react";
import { Handle, Position, useStore } from "reactflow";

interface Field {
  name: string;
  type: string;
  constraints?: string[];
}

interface DBMLEntityProps {
  id: string;
  data: {
    label: string;
    fields: Field[];
  };
}

const selector =
  (id: string, type: "source" | "target") =>
  (store: { edges: { source: string; target: string }[] }) => {
    const edges = store.edges.filter(
      (e: { source: string; target: string }) =>
        (type === "source" && e.target === id) ||
        (type === "target" && e.source === id),
    );
    return {
      isConnected: edges.length > 0,
    };
  };

const DBMLEntity: React.FC<DBMLEntityProps> = ({ data, id }) => {
  const { isConnected: isConnectedSource } = useStore(selector(id, "source"));
  const { isConnected: isConnectedTarget } = useStore(selector(id, "target"));
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 w-64">
      {isConnectedSource && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3"
          isConnectable={false}
        />
      )}
      <div className="font-bold text-lg mb-2 text-center">{data.label}</div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="text-sm">
        {data.fields.map((field, index) => (
          <div
            key={index}
            className="py-1 border-t border-gray-200 first:border-t-0"
          >
            <span className="font-medium">{field.name}</span>
            <span className="text-gray-600"> {field.type}</span>
            {field.constraints && (
              <span className="text-xs text-gray-500">
                {" "}
                [{field.constraints.join(", ")}]
              </span>
            )}
          </div>
        ))}
      </div>
      {isConnectedTarget && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3"
          isConnectable={false}
        />
      )}
    </div>
  );
};

export default DBMLEntity;
