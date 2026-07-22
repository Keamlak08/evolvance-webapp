/**
 * Calls `callback` once IntroSplash's scroll-lock (`document.body.style.overflow
 * === "hidden"`) has cleared — immediately, if it's already clear, or via a
 * MutationObserver watching for the lock to lift otherwise. Returns a cleanup
 * function that disconnects the observer if the caller unmounts first.
 *
 * WHY THIS EXISTS: IntroSplash.tsx locks body scroll while it plays, then
 * restores it when it finishes or is skipped. Several things elsewhere in
 * the app set themselves up on mount — before checking this — which means
 * they run while the real page is still hidden behind the splash's opaque
 * overlay. Anything that reads or reacts to scroll/layout state at that
 * moment (a ScrollTrigger computing its trigger range, a custom scrollbar
 * computing its thumb size, an entrance animation playing out) can end up
 * momentarily wrong, then visibly correct or reveal itself the instant the
 * splash's swipe-up exit uncovers the page — which reads as a flash or
 * glitch at exactly the one moment someone is actually looking.
 *
 * Waiting for the lock to clear — instead of guessing the splash's duration
 * with a fixed delay — is what actually fixes this: a fixed delay would only
 * happen to work for one exact splash duration, and would break the very
 * next time someone skips it early (Esc/Enter/click). This keeps every
 * consumer correct regardless of whether the splash plays fully or is
 * skipped, without any of them needing to know IntroSplash's internals.
 */
export function waitForSplashClear(callback: () => void): () => void {
  if (typeof document === "undefined" || document.body.style.overflow !== "hidden") {
    callback();
    return () => {};
  }

  const observer = new MutationObserver(() => {
    if (document.body.style.overflow !== "hidden") {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

  return () => observer.disconnect();
}
