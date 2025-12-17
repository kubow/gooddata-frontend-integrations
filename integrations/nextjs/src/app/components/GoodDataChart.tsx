"use client";

import {
  tigerFactory,
  TigerTokenAuthProvider,
} from "@gooddata/sdk-backend-tiger";
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import { InsightView } from "@gooddata/sdk-ui-ext";

export default function GoodDataChart() {
  const backend = tigerFactory()
    .onHostname(process.env.NEXT_PUBLIC_GD_HOSTNAME!)
    .withAuthentication(
      new TigerTokenAuthProvider(process.env.NEXT_PUBLIC_GD_API_TOKEN!)
    );

  return (
    <BackendProvider backend={backend}>
      <div className="gooddata-chart">
        <WorkspaceProvider workspace={process.env.NEXT_PUBLIC_GD_WORKSPACE_ID!}>
          <InsightView insight={process.env.NEXT_PUBLIC_GD_INSIGHT_ID!} />
        </WorkspaceProvider>
      </div>
    </BackendProvider>
  );
}

