<template>
  <div class="inicio">
    <h1 class="mb-3">Negocie e Consulte suas Ações</h1>
    <p>{{ dataAtual }}</p>
    <b-alert show variant="warning" class="infos">
        <BIconInfoCircle/> 
        Você pode Salvar e Carregar os Dados 
    </b-alert>
    <b-alert show variant="warning" class="infos"> 
        <BIconInfoCircle/>
        Clique em 'Finalizar Dia' para iniciar um novo dia!
    </b-alert>
    <b-toast ref="example" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
    <div class="divisa"></div>
    <p class="mt-2 display-6 fw-bold">Seu Saldo: {{ saldo | dinheiro }}</p>
  </div>
</template>

<script>
import { BIcon, BIconInfoCircle} from 'bootstrap-vue'
import mixin from '@/mixins/mixin'

export default {
    mixins: [ mixin ],
    // eslint-disable-next-line
    components: { BIcon, BIconInfoCircle},
    data() {
      return {
        dataAtual: new Date()
      }
    },
    created() {
      this.dataAtual = `${this.dayName[this.$store.state.diaSemana]}, ${this.$store.state.diaInicial+this.$store.state.diasAplicados} de ${this.monName[this.dataAtual.getMonth() + this.$store.state.mesesAplicados]}`
    }, 
    computed: {
      diaInicial() {
        return this.$store.state.diaInicial
      },
      diaSemana() {
        return this.$store.state.diaSemana
      },
      diasAplicados() {
        return this.$store.state.diasAplicados
      },
      mesesAplicados() {
        return this.$store.state.mesesAplicados
      }
    }
};
</script>

<style>
.infos:hover {
  cursor: pointer;
}

.divisa {
  width: 100%;
  border-bottom: solid 1px grey;
}

</style>