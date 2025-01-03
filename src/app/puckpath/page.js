
import  { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import resolvePuckPath from "../lib/resolve-puck-path";
const Client = lazy(() => import("./client"));

export default async function Page(props) {
    const location = useLocation();
    
    const { isEdit, path } = resolvePuckPath([location.pathname]);
  
    return <Client isEdit={isEdit} path={path} />;
  }