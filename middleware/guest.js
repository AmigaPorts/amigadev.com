export default function({ store, route, redirect }) {
	if (!store.state.auth.loggedIn) {
		if (route.path !== '/') return redirect('/');
	} else {
		if (route.path === '/') return redirect('/search');
	}
}
