import { createListenerMiddleware } from "@reduxjs/toolkit"
import loginUser from '../reducers/auth/ActionCreators';

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: loginUser as any,
    effect: (action) => (
        console.log('WORKING!!!', action)
    )
})