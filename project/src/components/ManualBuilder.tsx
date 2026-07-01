*** Begin Patch
*** Update File: project/src/components/ManualBuilder.tsx
@@
-import type { Ingredient, Step, HeatLevel, Recipe } from "../lib/types";
-import { UNITS, HEAT_LEVELS, HEAT_COLORS } from "../lib/types";
+import type { Ingredient, Step, HeatLevel, Recipe } from "../lib/types";
+import { UNITS, HEAT_LEVELS, HEAT_COLORS } from "../lib/types";
+import { normalizeUnit } from "../lib/units";
@@
-  const [servings, setServings] = useState(4);
+  const [servings, setServings] = useState(4);
+  const [baseServings, setBaseServings] = useState<number | ''>(''); // optional authoring baseline
@@
-        <div className="mt-4 flex items-center gap-3">
-          <label className="text-xs font-medium uppercase tracking-wider text-white/40">
-            {t("Servings")}
-          </label>
-          <div className="flex items-center gap-2">
-            <button
-              onClick={() => setServings(Math.max(1, servings - 1))}
-              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
-            >
-              −
-            </button>
-            <span className="w-10 text-center text-lg font-semibold text-white">{servings}</span>
-            <button
-              onClick={() => setServings(servings + 1)}
-              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
-            >
-              +
-            </button>
-          </div>
-        </div>
+        <div className="mt-4 flex flex-wrap items-start gap-6">
+          <div>
+            <label className="text-xs font-medium uppercase tracking-wider text-white/40">
+              {t("Servings")}
+            </label>
+            <div className="flex items-center gap-2">
+              <button
+                onClick={() => setServings(Math.max(1, servings - 1))}
+                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
+              >
+                −
+              </button>
+              <span className="w-10 text-center text-lg font-semibold text-white">{servings}</span>
+              <button
+                onClick={() => setServings(servings + 1)}
+                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
+              >
+                +
+              </button>
+            </div>
+            <p className="mt-2 text-xs text-white/40">
+              {t("Authoring baseline (optional)")}
+            </p>
+          </div>
+
+          <div>
+            <label className="text-xs font-medium uppercase tracking-wider text-white/40">
+              {t("Base Servings")}
+            </label>
+            <input
+              type="number"
+              min={1}
+              value={baseServings === '' ? '' : baseServings}
+              onChange={(e) => {
+                const v = parseInt(e.target.value, 10);
+                setBaseServings(isNaN(v) ? '' : Math.max(1, v));
+              }}
+              placeholder="e.g. 4"
+              className="w-28 rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white outline-none focus:border-amber-400/50"
+            />
+            <p className="text-xs text-white/40">{t("Optional — the original servings the recipe was authored for")}</p>
+          </div>
+        </div>
*** End Patch
