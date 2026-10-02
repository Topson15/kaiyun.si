export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  const argv = process.argv.join(" ");
  if (argv.includes("build")) return;
  const { startPolling } = await import(/* webpackIgnore: true */ "./lib/telegram-bridge.js");
  startPolling();
}

