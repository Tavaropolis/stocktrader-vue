<template>
  <div class="portfolio">
    <h1 class="mb-3">Página de Portifólio</h1>
    <div class="container-portifolio">
      <PortfolioCard v-for="(acao, index) in acoesPossuidas" :key="acao.id" :acao="acao" :index="index"/>
    </div>
  </div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'

export default {
  components: { PortfolioCard },
  computed: {
    acoesPossuidas() {
      return this.$store.state.acoesPossuidas;
    },
  },
};
</script>

<style>
.container-portifolio {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>