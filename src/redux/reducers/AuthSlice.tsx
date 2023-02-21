import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    userId: string,
    organisationId: string,
    organisationList : string[]
}

const initialState: AuthState = {
    userId: "",
    organisationId: "",
    organisationList: []
}

export const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserId: (state,action: PayloadAction<string>) => {
            state.userId = action.payload
        },
        setOrganisationList: (state,action: PayloadAction<string[]>) => {
            state.organisationList = action.payload
        },
        setOrganisationId: (state,action: PayloadAction<string>) => {
            state.organisationId = action.payload
        }
    }
})

export const {setUserId, setOrganisationId, setOrganisationList} = AuthSlice.actions

export default AuthSlice.reducer