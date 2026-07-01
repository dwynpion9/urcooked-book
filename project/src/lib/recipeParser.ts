---
*** Begin Patch
*** Update File: project/src/lib/recipeParser.ts
@@
-function parseQuantity(s: string): number {
-  s = s.trim();
-  // support mixed fractions like "1 1/2"
-  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
-  if (mixed) return parseInt(mixed[1], 10) + parseInt(mixed[2], 10) / parseInt(mixed[3], 10);
-  if (s.includes('/')) {
-    const f = s.match(/^(\d+)\/(\d+)$/);
-    if (f) return parseInt(f[1], 10) / parseInt(f[2], 10);
-  }
-  const n = parseFloat(s.replace(',', '.'));
-  return isNaN(n) ? 1 : n;
-}
+function parseQuantity(s: string): number {
+  s = s.trim();
+  // support mixed fractions like "1 1/2"
+  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
+  if (mixed) return parseInt(mixed[1], 10) + parseInt(mixed[2], 10) / parseInt(mixed[3], 10);
+  if (s.includes('/')) {
+    const f = s.match(/^(\d+)\/(\d+)$/);
+    if (f) return parseInt(f[1], 10) / parseInt(f[2], 10);
+  }
+  const n = parseFloat(s.replace(',', '.'));
+  return isNaN(n) ? 1 : n;
+}
*** End Patch
