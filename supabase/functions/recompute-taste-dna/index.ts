import { json } from "../_shared/json.ts";

Deno.serve(async (request) => {
  const body = await request.json().catch(() => ({}));
  const userId = typeof body.userId === "string" ? body.userId : null;

  return json({
    ok: true,
    message: "Taste DNA recomputation stub is ready for implementation.",
    received: {
      userId,
    },
  });
});
