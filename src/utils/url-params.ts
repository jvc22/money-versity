export function createUrlWithParams(
  basePath: string,
  params: { [key: string]: string | null },
) {
  const url = new URL(`/api${basePath}`, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value)
    }
  })

  return url.toString()
}
