export function isMobileDevice() {
  if (typeof navigator === "undefined") return false
  return /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent)
}

/**
 * Mobile: mailto: link, so the OS mail app / app chooser handles it.
 * Desktop: Gmail web compose, since desktop mailto: often has no client configured.
 */
export function buildMailLink(to: string, subject?: string, body?: string) {
  if (isMobileDevice()) {
    const params = new URLSearchParams()
    if (subject) params.set("subject", subject)
    if (body) params.set("body", body)
    const query = params.toString()
    return `mailto:${to}${query ? `?${query}` : ""}`
  }

  const params = new URLSearchParams({ view: "cm", fs: "1", to })
  if (subject) params.set("su", subject)
  if (body) params.set("body", body)
  return `https://mail.google.com/mail/?${params.toString()}`
}
