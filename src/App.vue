<template>
	<div class="App">
		<NavBar/>
		<b-container>
			<router-view/>
		</b-container>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'

import NavBar from './components/NavBar.vue'

export default {
	components: { NavBar },
	created() {
		setInterval(this.atualizarPrecos,  5000)
	},
	methods: {
		...mapMutations(['aleatorizarPrecos']),
		atualizarPrecos() {
			this.aleatorizarPrecos()
			this.$forceUpdate()
		}
	}
}
</script>

<style>
	html {
		min-height: 100vh;
	}

	body {
		background-image: linear-gradient(white, lightgrey)
	}
</style>

