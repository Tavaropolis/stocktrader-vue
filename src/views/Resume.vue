<template>
  <div class="resume">
    <h1 class="mb-3">Resumo do dia</h1>
    <p class="h4">Ações que você possui: </p>
      <ul v-for="acaoPossuida in acoesPossuidas" :key="acaoPossuida.id">
        <BIconWallet/><li>{{ acaoPossuida.nome }} | Quantidade: <span class="fw-bold">{{ acaoPossuida.quantidade }}</span></li>
      </ul>
    <p class="h4">Ações compradas: </p>
      <ul v-for="acaoComprada in acoesCompradas" :key="acaoComprada.id">
        <BIconWallet/><li>{{ acaoComprada.nome }} | Quantidade: <span class="fw-bold">{{ acaoComprada.quantidade }}</span></li>
      </ul>
    <p class="h4">Ações vendidas: </p>
      <ul v-for="acaoVendida in acoesVendidas" :key="acaoVendida.id">
        <BIconWallet/><li>{{ acaoVendida.nome }} | Quantidade: <span class="fw-bold">{{ acaoVendida.quantidade }}</span></li>
      </ul>
      <v-divider></v-divider>
      <router-link class="container-botao" to="/"><b-btn class="botao-dia btn-dark" @click="iniciarDia">Iniciar novo dia</b-btn></router-link>
  </div>
</template>

<script>
import { BIcon, BIconWallet} from 'bootstrap-vue'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line
  components: {BIcon, BIconWallet},
  methods: {
    ...mapMutations(['resetarSaldo', 'limparAcoes', 'incrementarDia']),
    ...mapActions(['verificarMes']),
    iniciarDia() {
      this.limparAcoes()
      this.resetarSaldo()
      this.incrementarDia()
      this.verificarMes(this.$store.state.diasAplicados)
    }
  }, 
  computed: {
    diasAplicados() {
      return this.$store.state.diasAplicados
    },
    acoesPossuidas() {
      return this.$store.state.acoesPossuidas
    },
    acoesCompradas() {
      return this.$store.state.acoesCompradas
    },
    acoesVendidas() {
      return this.$store.state.acoesVendidas
    }
  } 
}
</script>

<style>
ul li {
  list-style: none;
  margin-left: 10px; 
  display: inline;
}

.container-botao {
  display: flex;
  justify-content: center;
}

a, a:visited, a:hover, a:active {
  color: inherit !important;
  text-decoration: none !important;
}

.botao-dia {
  width: 35vw;
  height: 35px;
}
</style>