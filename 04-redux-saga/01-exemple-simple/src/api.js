export const getUserFromApi = async userId => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  )
  const user = await res.json()
  return user
}
