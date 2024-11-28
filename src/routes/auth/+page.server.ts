import * as auth from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export async function load(event) {
	if (!event.locals.user) {
		return redirect(302, '/auth/login')
	}
	return { user: event.locals.user }
}

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401)
		}

		await auth.invalidateSession(event.locals.session.id)
		auth.deleteSessionTokenCookie(event)

		return redirect(302, '/auth/login')
	},
}