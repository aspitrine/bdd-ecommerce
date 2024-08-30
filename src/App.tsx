import { useState } from "react";
import InteractionBdd from "./components/InteractionBdd";
import Schema from "./components/Schema";
import { edges, nodes } from "./flowData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function App() {
  const [accordionOpened, setAccordionOpened] = useState("schema");
  return (
    <main className="h-screen px-2">
      <Accordion
        type="single"
        collapsible
        value={accordionOpened}
        onValueChange={setAccordionOpened}
      >
        <AccordionItem value="schema">
          <AccordionTrigger className="text-xs">
            <div className="flex justify-center w-full">
              {accordionOpened === "schema" ? "Cacher" : "Afficher"} le schéma
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="h-[400px]">
              <Schema nodes={nodes} edges={edges} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <InteractionBdd />
    </main>
  );
}

export default App;
