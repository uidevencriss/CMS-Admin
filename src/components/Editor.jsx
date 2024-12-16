import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config, initialData } from "./puckConfig";

const save = (data) => {
  console.log("Saved data:", data);
  
};

export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}
