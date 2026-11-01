/** Reject all events except an explicitly confirmed dispatch of one exact main commit. */
export function verifyRelease({
  event,
  ref,
  approved,
  expectedSha,
  actualSha,
}) {
  if (event !== "workflow_dispatch")
    throw new Error("Release requires a manual workflow dispatch.");
  if (ref !== "refs/heads/main")
    throw new Error("Release is restricted to main.");
  if (approved !== "true")
    throw new Error("Explicit release approval is required.");
  if (!/^[0-9a-f]{40}$/.test(expectedSha ?? ""))
    throw new Error(
      "Expected commit must be a full lowercase 40-character SHA.",
    );
  if (expectedSha !== actualSha)
    throw new Error("Approved SHA differs from the dispatched main commit.");
  return actualSha;
}
