export function passwordConsistency(password: string) : boolean{
    return !(password.includes(" ") || password.length < 8)
}