import { useEffect, useState } from "react";

import { MyRequestBody } from "src/services/authServices";
import { apiCall } from "src/services/authServices";
import { linkapi } from "src/services/authServices";
import config, {
  initialData,
  Props,
  RootProps,
  UserConfig,
  UserData,
} from "../config";
import { resolveAllData } from "../../core";

const isBrowser = typeof window !== "undefined";

export const useDemoData = ({
  path,
  isEdit,
}: {
  path: string;
  isEdit: boolean;
}) => {
  // unique b64 key that updates each time we add / remove components
  const componentKey = btoa(
    `${Object.keys(config.components).join("-")}-${JSON.stringify(initialData)}`
  );

  const key = `puck-demo:${componentKey}:${path}`;
  //const [data, setData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [data] = useState<Partial<UserData>>(() => {
    const dataStr = localStorage.getItem("blogdetails");

    //const dataStr = "";

    if (dataStr) {
      return JSON.parse(dataStr);
    }

    return initialData[path] || {};
  });
  // useEffect(() => {
  //   if (blogUrl) {
  //     const fetchData = async () => {
  //       try {
  //         const result = await linkapi(blogUrl); // API call with blog URL
  //         const parser = new DOMParser();
  //         const doc = parser.parseFromString(result.data, "text/html");
  //         const preTag = doc.querySelector("pre");

  //         if (preTag) {
  //           const jsonString = preTag.textContent;
  //           if (jsonString) {
  //             const parsedData = JSON.parse(jsonString); // Parse JSON string
  //             debugger;
  //             setData(parsedData); // Update state with fetched data
  //           }
  //         }
  //       } catch (err) {
  //         console.error("Error while fetching API:", err);
  //         setError("Failed to fetch data."); // Set error state
  //       } finally {
  //         setLoading(false); // Ensure loading stops
  //       }
  //     };

  //     fetchData();
  //   }
  // }, []);
  console.log("Aks", data);
  // useEffect(() => {
  //   if (isBrowser) {
  //     const fetchData = async () => {
  //       try {
  //         const result = await linkapi(); // Await the API result
  //         const parser = new DOMParser();
  //         const doc = parser.parseFromString(result.data, "text/html");
  //         const preTag = doc.querySelector("pre");

  //         if (preTag) {
  //           const jsonString = preTag.textContent;
  //           if (jsonString) {
  //             const parsedData = JSON.parse(jsonString); // Parse JSON string
  //             setData(parsedData); // Update state with fetched data
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error while fetching API:", error);
  //         setError("Failed to fetch data."); // Set error state
  //       } finally {
  //         setLoading(false); // Ensure loading stops
  //       }
  //     };

  //     fetchData();
  //   }
  // }, []); // Empty dependency array means this runs only once

  // Normally this would happen on the server, but we can't
  // do that because we're using local storage as a database
  const [resolvedData, setResolvedData] = useState<Partial<UserData>>(data);

  useEffect(() => {
    if (data && !isEdit) {
      resolveAllData<Props, RootProps>(data, config).then(setResolvedData);
    }
  }, [data, isEdit]);

  useEffect(() => {
    if (!isEdit) {
      const title = data?.root?.props?.title || data?.root?.title;
      document.title = title || "";
    }
  }, [data, isEdit]);

  return { data, resolvedData, key };
};
