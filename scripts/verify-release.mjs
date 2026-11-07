import { verifyRelease } from "./release-policy.mjs";
const sha = verifyRelease({
  event: process.env.GITHUB_EVENT_NAME,
  ref: process.env.GITHUB_REF,
  approved: process.env.APPROVE_RELEASE,
  expectedSha: process.env.EXPECTED_SHA,
  actualSha: process.env.GITHUB_SHA,
});
console.log(`Release gate passed for approved main commit ${sha}.`);
