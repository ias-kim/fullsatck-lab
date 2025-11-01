import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import visibilityFilterSlice from '../features/visibilityFilter/visibilityFilterSlice.ts';
import todosSlice from '../features/todos/todosSlice.ts';
import logger from 'redux-logger';
import { createLocalStorageMiddleware } from '../middleware/localStorageMiddleware.ts';

const { localStorageMiddleware, preloadedState } =
  createLocalStorageMiddleware('todo-redux');

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosSlice,
    visivisibilityFilter: visibilityFilterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware, logger),
  preloadedState,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
