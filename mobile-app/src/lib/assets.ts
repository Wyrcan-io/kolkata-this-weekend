/**
 * Asset path helper for Next.js GitHub Pages static export and local development.
 * Automatically prepends NEXT_PUBLIC_BASE_PATH (e.g. /kolkata-this-weekend)
 * when running on GitHub Pages, while preserving root paths on localhost.
 */
export function asset(path: string | undefined | null): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If already prefixed with basePath, don't duplicate
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
