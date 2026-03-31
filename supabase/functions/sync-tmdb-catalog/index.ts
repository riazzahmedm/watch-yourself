import { json } from "../_shared/json.ts";

const tmdbApiKey = Deno.env.get("TMDB_API_KEY");

Deno.serve(async (request) => {
  if (!tmdbApiKey) {
    return json(
      {
        ok: false,
        error: "TMDB_API_KEY is not configured.",
      },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const query = typeof body.query === "string" ? body.query : null;
  const tmdbType = body.tmdbType === "tv" ? "tv" : "movie";

  return json({
    ok: true,
    message: "TMDb sync stub is ready for implementation.",
    received: {
      query,
      tmdbType,
    },
  });
});
