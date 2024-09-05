import { Results } from "@electric-sql/pglite";
import { useState } from "react";
import { db } from "@/db/client";
import TextareaSQL from "@/components/TextareaSQL";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import DisplayData from "./DisplayData";

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
      {result && <DisplayData data={result.rows} fields={fields} />}
    </div>
  );
}
