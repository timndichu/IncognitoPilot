import React from "react";
import SessionManager from "@/app/session/session_manager";
import path from "path";
import * as fs from "fs";
import Authentication from "@/app/authentication";
import { ResponseProvider } from "./contexts/responseContext";

function getVersion(): Promise<string> {
  const versionDir = path.dirname(
    path.dirname(path.dirname(path.dirname(__dirname))),
  );
  const versionPath = path.join(versionDir, "VERSION");
  return new Promise((resolve, reject) => {
    fs.readFile(versionPath, "utf8", (err, data) => {
      if (err) {
        resolve("unknown");
      } else {
        resolve(data.trim());
      }
    });
  });
}

export default async function Home() {
  return (
    <Authentication>
      <ResponseProvider>
        <SessionManager version={await getVersion()} />
      </ResponseProvider>
    </Authentication>
  );
}
