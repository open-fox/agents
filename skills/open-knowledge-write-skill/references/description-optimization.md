# Optimizing a skill's `description`

The `description` is the **entire** signal the agent uses to decide whether to
load a skill. The body doesn't exist until the description fires. Optimize it
last, deliberately.

## Rules

1. **Triggers, not a summary.** Describe WHEN to reach for the skill, in the
   user's words. Do NOT recap what the body does — empirically, summarizing the
   workflow in the description makes the model follow the description and skip
   the body (the classic "did one review instead of the two the body required").
2. **Be concrete and slightly pushy.** Under-triggering (the skill never loads)
   is the common failure. Name the situations, the verbs, and the actual
   phrasings a user would type. List several; don't rely on one abstract clause.
3. **Stay inside the contract.** ≤1024 characters, no XML/angle-bracket tags, no
   `version` field. A tag like `<thing>` breaks the loader.
4. **Disambiguate from neighbors.** If a sibling skill is close, add a line on
   when to use THIS one vs the other.

## A lightweight near-miss check

1. Write ~10 phrasings that SHOULD trigger the skill and ~5 adjacent ones that
   should NOT (they belong to a different skill or no skill).
2. Read the description cold and predict, for each phrasing, whether it would
   fire. Every should-fire that you'd miss is a gap; every should-not that fires
   is over-reach.
3. Edit the description to close the gaps without grabbing the should-nots.
   Prefer adding concrete trigger phrasings over broadening vague ones.

## Shape

Lead with the dominant trigger ("Use when the user wants to…"), then enumerate
concrete situations and phrasings, then any disambiguation. Keep it scannable.
