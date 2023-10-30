import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { products } from "./products"


export interface Leg {
    id: string;
    product: string;
    strike: number;
    premium: number;
    quantity: number;
    long: boolean;
  }

export interface Products {
    [key: string]: Leg[]
}

export interface LegsState {
    legs: Leg[],
    products: Products,
  }
  

const initialState: LegsState = {
    legs: [],
    products: products,
  }

  export const legsSlice = createSlice({
    name: "legs",
    initialState,
    reducers: {
      addLeg: (state, action: PayloadAction<Leg>) => {
        state.legs.push({
          ...action.payload,
          id: self.crypto.randomUUID()
         })
      },      
      removeLeg: (state, action: PayloadAction<string>) => {
        state.legs = state.legs.filter((leg) => leg.id !== action.payload)
      },
      updateLeg: (state, action: PayloadAction<Leg>) => {
        state.legs = state.legs.map((leg) => {
          if (leg.id === action.payload.id) {
            return {
              ...leg,
              ...action.payload,
            }
          }
          return leg
        })
      },
      updateProduct: (state, action: PayloadAction<string>) => {
        state.legs = state.products[action.payload]
      },
      clearLegs: (state) => {
        state.legs = []
      }
    }
})

export const { addLeg, removeLeg, updateLeg, clearLegs, updateProduct } = legsSlice.actions


export const selectLegs = (state: RootState) => state.legs.legs

export const selectProducts = (state: RootState) => Object.keys(state.legs.products)

export default legsSlice.reducer

  