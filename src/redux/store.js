import {combineReducers,createStore ,applyMiddleware} from "redux";
import IndexStore from "../redux/index/index.store";
import thunk from "redux-thunk";
const BigStore = combineReducers({
    IndexStore
})
export default createStore(BigStore,applyMiddleware(thunk));
// import {combineReducers,createStore ,applyMiddleware} from "redux";
// import IndexStore from "../redux/index/index.store";
// import * as dataOperation from './dataOperation/reducer';
// import thunk from "redux-thunk";
//
// let store = createStore(
//   combineReducers({...dataOperation, ...IndexStore}),
//   applyMiddleware(thunk)
// );
//
// export default store;
