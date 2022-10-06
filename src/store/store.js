import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  data: [],
  Auth: "",
  isLoggedIng: false,
};

const reducerFn = (state = initialState, { type, payload }) => {
  if (type === "LOGIN") {
    return {
      ...state,
      Auth: payload,
      isLoggedIng: true,
    };
  }
  if (type === "LOGOUT") {
    return {
      ...state,
      Auth: "",
      isLoggedIng: false,
    };
  }
  if (type === "GETDATA") {
    return {
      ...state,
      data: state.data + payload,
    };
  }

  return state;
};

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducerFn);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
