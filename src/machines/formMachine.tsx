import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { createMachine,assign, EventObject } from "xstate";

export enum States {
  editing = 'editing',
  submitting = 'submitting',
  success = 'success',
}

export enum Events {
  CHANGE = 'CHANGE',
  SUBMIT = 'SUBMIT',
  AGAIN = 'AGAIN',
}

export type Ivalue = {
  name:string
  company:string
}

export type Ierror = {
  name:string
  company:string
}

export type Iservices = {
  onSubmit: {
    // The data that gets returned from the service
    data: { id: string };
  };
}

export const formMachine = createMachine({
    initial: "editing",
    context: {
      values: {} as Ivalue,
      errors: {} as Ierror
    },
    schema: {
      services: {} as Iservices,
    },
    states: {
      [States.editing]: {
        initial: "pristine",
        on: {
          [Events.CHANGE]: {
            actions: ["onChange"]
          },
          [Events.SUBMIT]: "submitting"
        },
        states: {
          pristine: {
            entry: ["clearForm"]
          },
          error: {}
        }
      },
      [States.submitting]: {
        invoke: {
          src: "onSubmit",
          onDone: "success",
          onError: {
            target: "editing.error",
            actions: ["onError"]
          }
        }
      },
      [States.success]: {
        id: "success",
        on: {
          [Events.AGAIN]: "editing"
        }
      }
    }
  },
  {
    actions: {
      onChange: assign({
        values: (ctx, e:any) => ({
          ...ctx.values,
          [e.key]: e.value
        })
      }),
      clearForm: assign({
        values: {} as Ivalue,
        errors: {} as Ierror
      }),
      onError: assign({
        errors: (_ctx, e:any) => e.data
      })
    },
    services:{
      onSubmit: (context, event):any => {
        if (context.values?.name?.length<3) {
          context.errors.name = "Слишком коротко";
        }
        if (context.values?.company?.length<3) {
          context.errors.company = "Слишком коротко";
        }
        console.log(context.errors)
        if (Object.keys(context.errors).length > 0) {
          return Promise.reject(context.errors);
        }
        return true;
      }
    } 
  })