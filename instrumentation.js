export async function register() {
  if (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== "nodejs") return;
  const argv = process.argv.join(" ");
  if (process.env.NEXT_PHASE === "phase-production-build" || argv.includes("build")) return;
  const { startPolling } = await import("./lib/telegram-bridge");
  startPolling();
}
