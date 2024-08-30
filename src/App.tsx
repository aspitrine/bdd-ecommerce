import { useState } from "react";
import "./App.css";
import { db } from "./db/client";
import { Results } from "@electric-sql/pglite";
import TextareaSQL from "./components/TextareaSQL";
// import Diagram from "./components/Diagram";

function App() {
  const [query, setQuery] = useState(
    "SELECT * FROM orders LEFT JOIN order_items ON order_items.order_id = orders.id;",
  );
  const [result, setResult] = useState<Results>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { query } = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as Record<string, string>;

    setResult(await db.query(query));
  };

  const fields = result?.fields.map((field) => field.name);

  return (
    <main className="flex flex-col gap-2">
      {/* <div className="h-[50vh]">
        <Diagram />
      </div> */}
      <form onSubmit={handleSubmit}>
        <TextareaSQL name="query" value={query} onChange={setQuery} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Run query
        </button>
      </form>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr className="text-left">
            {fields?.map((field, fieldIndex) => (
              <th className="p-2" key={`${field}-${fieldIndex}`}>
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {result?.rows.map((row) => (
            <tr className="border-b" key={row.id}>
              {fields?.map((field, indexField) => (
                <td className="p-2" key={`${field}-${row.id}-${indexField}`}>
                  {row[field] instanceof Date
                    ? row[field].toLocaleDateString()
                    : row[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
