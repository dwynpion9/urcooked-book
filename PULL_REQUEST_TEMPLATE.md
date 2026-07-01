---
*** Begin Patch
*** Add File: PULL_REQUEST_TEMPLATE.md
+<!--
+  This PR was created by Copilot to implement deterministic serving scaling.
+  Reviewers: run the checklist in the PR description and test in StackBlitz/local.
+-->
+
+Summary
+- Adds recipe.baseServings and step.tokens to preserve authored baseline and structured numeric tokens.
+- Tokenizes mixed fractions, simple fractions, and decimals (with units) at parse time for deterministic scaling.
+- Rebuilds step text from tokens on render and uses the same scaleQty formatting as ingredient lines.
+
+Testing checklist
+- Servings baseline: UI servings should equal baseServings (if parser detected one) or fall back to the recipe.servings/default.
+- Click + / -: ingredient quantities and numbers inside steps update identically (test mixed fractions: "1 1/2", "1/2", and decimals like "1.5").
+- Confirm scaled values are not written back to stored recipe objects (reload and verify canonical values unchanged).
+- Verify existing features: PIN/lock modal, Add Photo / Set Wallpaper, timers, TTS, Back & navigation buttons still work.
+- Export a recipe JSON and re-import: new fields (baseServings, tokens) are optional; importer tolerates them.
+
+Notes
+- Translation: scaled text is constructed from tokens then translated for UI display; consider translation-aware tokenization in a follow-up.
*** End Patch
