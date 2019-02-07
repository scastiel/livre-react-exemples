export const getContact = async id => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = await res.json()
  return { name: user.name }
}
