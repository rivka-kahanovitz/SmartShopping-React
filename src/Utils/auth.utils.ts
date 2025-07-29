export const getCurrentUserFromToken = (): { id: number; role: string } | null => {
  const token = localStorage.getItem("token")
  if (!token) return null

  const payload = JSON.parse(atob(token.split('.')[1]))
  return {
    id: parseInt(payload.id),
    role: payload.role
  }
}
