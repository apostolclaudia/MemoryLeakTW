export const getJWT = () => localStorage.getItem('JWTToken') ?? ''

export const setJWT = (token: string) => localStorage.setItem('JWTToken', token)
