import { json } from "../_shared/json.ts";

Deno.serve(async (request) => {
  const body = await request.json().catch(() => ({}));
  const periodType = typeof body.periodType === "string" ? body.periodType : "week";

  return json({
    ok: true,
    message: "Timeline summary generation stub is ready for implementation.",
    received: {
      periodType,
    },
  });
});
