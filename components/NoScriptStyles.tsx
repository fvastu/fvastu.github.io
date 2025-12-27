/**
 * NoScriptStyles - Critical fallback styles for no-JS environments
 * Ensures content remains accessible and readable without JavaScript
 */

export default function NoScriptStyles() {
  return (
    <noscript>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Ensure loader doesn't block content when JS is disabled */
          [data-loader-wrapper] {
            display: none !important;
          }
          
          /* Show all content immediately */
          body {
            opacity: 1 !important;
            transform: none !important;
          }
          
          /* Remove transforms that rely on JS */
          [style*="transform"],
          [style*="opacity"] {
            opacity: 1 !important;
            transform: none !important;
          }
          
          /* Ensure hero content is visible */
          #hero-content {
            opacity: 1 !important;
          }
          
          /* Make sure sections are visible */
          section {
            opacity: 1 !important;
            transform: none !important;
          }
        `,
        }}
      />
    </noscript>
  );
}
