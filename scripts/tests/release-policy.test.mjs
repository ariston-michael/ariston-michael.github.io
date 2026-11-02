import test from "node:test";
import assert from "node:assert/strict";
import { verifyRelease } from "../release-policy.mjs";
const sha = "a".repeat(40);
const approved = {
  event: "workflow_dispatch",
  ref: "refs/heads/main",
  approved: "true",
  expectedSha: sha,
  actualSha: sha,
};
test("one exact approved main dispatch is accepted", () =>
  assert.equal(verifyRelease(approved), sha));
for (const [name, override] of [
  ["development", { ref: "refs/heads/development" }],
  ["push event", { event: "push" }],
  ["PR event", { event: "pull_request" }],
  ["absent approval", { approved: "false" }],
  ["missing SHA", { expectedSha: undefined }],
  ["short SHA", { expectedSha: "abcdef" }],
  ["different commit", { actualSha: "b".repeat(40) }],
  ["shell text as SHA", { expectedSha: "$(touch unauthorized)" }],
])
  test(`reject ${name}`, () =>
    assert.throws(() => verifyRelease({ ...approved, ...override })));
