*** Begin Patch
*** Update File: project/src/lib/types.ts
@@
 export interface Recipe {
   id: string;
   title: string;
   description: string;
-  // baseServings is the canonical servings the recipe was authored for
-  // baseServings?: number;
+  // baseServings is the canonical servings the recipe was authored for
+  baseServings?: number;
   // servings is the current UI-adjustable servings value
   servings: number;
*** End Patch
