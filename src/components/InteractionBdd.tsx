import { Results } from "@electric-sql/pglite";
import { useState } from "react";
import { db } from "@/db/client";
import TextareaSQL from "@/components/TextareaSQL";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export default function InteractionBdd() {
  const [query, setQuery] = useState("SELECT 1 AS num;");
  const [result, setResult] = useState<Results>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    const { query } = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as Record<string, string>;

    try {
      setResult(await db.query(query));
    } catch (error) {
      setResult(undefined);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue");
      }
    }
  };

  const fields = Array.from(new Set(result?.fields.map((field) => field.name)));

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextareaSQL name="query" value={query} onChange={setQuery} />
        <Button type="submit">Run query</Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && (
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
            {result?.rows.map((row, indexRow) => (
              <TableRow key={indexRow}>
                {fields?.map((field, indexField) => (
                  <TableCell className="p-2" key={`${indexRow}-${indexField}`}>
                    {row[field] instanceof Date
                      ? row[field].toLocaleDateString()
                      : JSON.stringify(row[field], null, 2)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
