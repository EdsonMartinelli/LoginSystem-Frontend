export type typeTextfieldRef = HTMLInputElement & {
    isValid: boolean,
    isDirty: boolean
}

export type typeOrientationAuthAnimation = "LeftToRight" | "RightToLeft"

export type typeState = { orientation : typeOrientationAuthAnimation} | undefined