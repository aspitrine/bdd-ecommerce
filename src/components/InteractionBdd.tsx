import { Results } from "@electric-sql/pglite";
import { useState } from "react";
import { db } from "../db/client";
import TextareaSQL from "./TextareaSQL";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InteractionBdd() {
  const [query, setQuery] = useState("SELECT 1 AS num;");
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
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextareaSQL name="query" value={query} onChange={setQuery} />
        <Button type="submit">Run query</Button>
      </form>
      <Table>
        <TableCaption>Résultat de la requête</TableCaption>
        <TableHeader>
          <TableRow>
            {fields?.map((field, fieldIndex) => (
              <TableHead key={`${field}-${fieldIndex}`}>{field}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result?.rows.map((row) => (
            <TableRow>
              {fields?.map((field, indexField) => (
                <TableCell
                  className="p-2"
                  key={`${field}-${row.id}-${indexField}`}
                >
                  {row[field] instanceof Date
                    ? row[field].toLocaleDateString()
                    : row[field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
