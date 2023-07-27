import { createMachine,assign } from "xstate";

export const myMachine = createMachine({
  id: 'userProfile',
  initial: 'idle',
  context: {
    user: [],
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      invoke: {
        id: 'getUser',
        src: 'FETCH_USER',
        onDone: {
          target: 'success',
        },
        onError: {
          target: 'failure',
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
},{
  services:{
    FETCH_USER: (context, event) => {
      return  fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(res => res.json())
      .then(data => (context.user = data))
    }
  } 
})