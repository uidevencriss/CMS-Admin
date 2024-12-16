import { Render } from "@measured/puck";
import { config, initialData } from "../components/Editor";
import "@measured/puck/puck.css";

export function Page() {
  return <Render config={config} data={initialData} />;
}