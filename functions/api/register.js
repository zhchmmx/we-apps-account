import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

/**
 * POST /api/register
 *
 * Validates the Cloudflare Turnstile token (sent as the
 * `cf-turnstile-response` form field) server-side via the official
 * Pages Plugin. The secret is read from the `TURNSTILE_SECRET` Pages
 * environment variable and is never hardcoded.
 *
 * On success the plugin populates `context.data.turnstile` with the
 * Siteverify response and the next handler runs. On failure the plugin's
 * `onError` returns a 403 JSON response.
 *
 * Note: this Function only validates the token (verdict-only). Account
 * creation itself is still performed client-side by the Appwrite Web SDK
 * after this endpoint returns `{ ok: true }`.
 */
export const onRequestPost = [
  (context) =>
    turnstilePlugin({
      secret: context.env.TURNSTILE_SECRET,
      onError: async () =>
        new Response(JSON.stringify({ error: "turnstile_failed" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }),
    })(context),
  async (context) => {
    // Token validated as coming from a human.
    // `context.data.turnstile` holds the full Siteverify response object.
    return Response.json({ ok: true });
  },
];
