// Site-wide settings

// Amazon Associates: entries with an `asin` in library.json get a link built from these.
// OneLink redirects visitors to their local Amazon store with the linked tracking IDs.
export const amazon = {
  store: 'https://www.amazon.com',
  tag: 'ossl-20',
}

export const amazonUrl = (asin: string) => `${amazon.store}/dp/${asin}?tag=${amazon.tag}`
