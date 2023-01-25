<template>
    <div class="stock">
        <h1 class="mb-3">Página de Stock</h1>
        <div class="container-stocks">
            <StocksCard v-for="(acao, index) in acoes" :key="acao.id" :acao="acao" :index="index"/>
        </div>
    </div>
</template>

<script>
import StocksCard from '../components/StocksCard'

export default {
    components: { StocksCard },
    computed: {
        acoes() {
            return this.$store.state.acoes
        }
    }
}
</script>

<style>
.container-stocks {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

</style>