import {GET_BOP} from '../types'

const initialState = {
    bop:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_BOP:
        return {
            ...state,
            users:action.payload,
            loading:false
        }
        default: return state
    }

}