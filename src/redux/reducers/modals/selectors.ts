import { RootState } from "../../store"

export const isLoginModalDisplay = (state: RootState) => state.modals.loginModal
export const isSignupModalDisplay = (state: RootState) => state.modals.signUpModal


