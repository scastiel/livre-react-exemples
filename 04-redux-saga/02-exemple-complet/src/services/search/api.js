export const searchAddresses = async query => {
  const res = await fetch(
    'https://api-adresse.data.gouv.fr/search/?q=' + encodeURIComponent(query),
  )
  const { features } = await res.json()
  return features
}
