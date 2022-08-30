export function emailConsistency(email: string) : boolean{
    return /\S+@\S+\.\S+/.test(email)
}

export function passwordConsistency(password: string) : boolean{
    return !(password.includes(" ") || password.length < 8)
}

export function usernameConsistency(username: string) : boolean{
    return !(username.length < 3)
}