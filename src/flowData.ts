import { Edge, Node } from "reactflow";

export const nodes: Node[] = [
  {
    id: "users",
    type: "dbmlEntity",
    position: { x: 0, y: 0 },
    data: {
      label: "users",
      fields: [
        { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
        {
          name: "username",
          type: "VARCHAR(50)",
          constraints: ["NOT NULL", "UNIQUE"],
        },
        {
          name: "email",
          type: "VARCHAR(100)",
          constraints: ["NOT NULL", "UNIQUE"],
        },
        { name: "password", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
        {
          name: "created_at",
          type: "TIMESTAMP",
          constraints: ["DEFAULT CURRENT_TIMESTAMP"],
        },
      ],
    },
  },
  {
    id: "categories",
    type: "dbmlEntity",
    position: { x: 350, y: 0 },
    data: {
      label: "categories",
      fields: [
        { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
        {
          name: "name",
          type: "VARCHAR(100)",
          constraints: ["NOT NULL", "UNIQUE"],
        },
        { name: "description", type: "TEXT" },
        {
          name: "created_at",
          type: "TIMESTAMP",
          constraints: ["DEFAULT CURRENT_TIMESTAMP"],
        },
      ],
    },
  },
  {
    id: "products",
    type: "dbmlEntity",
    position: { x: 700, y: 0 },
    data: {
      label: "products",
      fields: [
        { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
        { name: "name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
        { name: "description", type: "TEXT" },
        { name: "price", type: "DECIMAL(10, 2)", constraints: ["NOT NULL"] },
        { name: "stock", type: "INT", constraints: ["NOT NULL"] },
        { name: "category_id", type: "INT", constraints: ["FOREIGN KEY"] },
        {
          name: "created_at",
          type: "TIMESTAMP",
          constraints: ["DEFAULT CURRENT_TIMESTAMP"],
        },
      ],
    },
  },
  {
    id: "orders",
    type: "dbmlEntity",
    position: { x: 0, y: 400 },
    data: {
      label: "orders",
      fields: [
        { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
        {
          name: "user_id",
          type: "INT",
          constraints: ["NOT NULL", "FOREIGN KEY"],
        },
        {
          name: "order_date",
          type: "TIMESTAMP",
          constraints: ["DEFAULT CURRENT_TIMESTAMP"],
        },
        { name: "status", type: "VARCHAR(50)", constraints: ["NOT NULL"] },
        { name: "total", type: "DECIMAL(10, 2)", constraints: ["NOT NULL"] },
      ],
    },
  },
  {
    id: "order_items",
    type: "dbmlEntity",
    position: { x: 350, y: 400 },
    data: {
      label: "order_items",
      fields: [
        { name: "id", type: "SERIAL", constraints: ["PRIMARY KEY"] },
        {
          name: "order_id",
          type: "INT",
          constraints: ["NOT NULL", "FOREIGN KEY"],
        },
        {
          name: "product_id",
          type: "INT",
          constraints: ["NOT NULL", "FOREIGN KEY"],
        },
        { name: "quantity", type: "INT", constraints: ["NOT NULL"] },
        { name: "price", type: "DECIMAL(10, 2)", constraints: ["NOT NULL"] },
      ],
    },
  },
];

export const edges: Edge[] = [
  {
    id: "e1",
    source: "categories",
    target: "products",
    animated: true,
    label: "1:n",
  },
  { id: "e2", source: "users", target: "orders", animated: true, label: "1:n" },
  {
    id: "e3",
    source: "orders",
    target: "order_items",
    animated: true,
    label: "1:n",
  },
  {
    id: "e4",
    source: "products",
    target: "order_items",
    animated: true,
    label: "1:n",
  },
];
