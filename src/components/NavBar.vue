<template>
  <nav>
    <b-navbar class="bg-dark">
      <b-navbar-brand class="text-white text-uppercase">
        <span class="ms-3 fw-bold">Stock</span>
        <span class="fw-light">Trader</span>
      </b-navbar-brand>
      <div class="links">
        <v-toolbar-items class="ms-4 fw-bold"><router-link to="/">Início</router-link></v-toolbar-items>
        <v-toolbar-items class="ms-4 fw-bold"><router-link to="/portfolio">Portifólio</router-link></v-toolbar-items>
        <v-toolbar-items class="ms-4 fw-bold"><router-link to="/stocks">Ações</router-link></v-toolbar-items
        >
      </div>
      <v-spacer></v-spacer>
      <div class="opcoes">
        <v-toolbar-items
          class="ms-4 fw-light"
          v-b-modal.meu-modal>
          Finalizar dia</v-toolbar-items>
          <b-modal id="meu-modal">
            <p class="h3">Deseja encerrar o dia?</p>
            <p>Confirme se deseja finalizar o dia</p>
            <div slot="modal-footer">
              <b-btn class="me-2" @click="$bvModal.hide('meu-modal')">Cancelar</b-btn>
              <b-btn variant="primary" @click="encerrarDia">Confirmar</b-btn>
            </div>
          </b-modal>
          <v-toolbar-items
            class="ms-4 fw-light"
            @click="salvar"
            >Salvar</v-toolbar-items>
        <v-toolbar-items class="ms-4 fw-light"
            @click="carregar"
          >Carregar</v-toolbar-items
        >
        <v-toolbar-items class="ms-4 me-2 fw-bold" id="saldo-navbar"
          >Saldo: {{ saldo | dinheiro }}</v-toolbar-items
        >
      </div>
    </b-navbar>
  </nav>
</template>

<script>
import mixin from "@/mixins/mixin.js";

export default {
  mixins: [mixin],
  data() {
    return {
      minhasAcoes: [],
      popUpAtivo: true
    };
  },
  created() {
    this.minhasAcoes = this.$store.state.acoesPossuidas;
  },
  methods: {
    salvar() {
      localStorage.setItem("minhasAcoes", JSON.stringify(this.minhasAcoes));
    },
    carregar() {
      this.minhasAcoes = JSON.parse(localStorage.getItem("minhasAcoes"))
      this.$store.state.acoesPossuidas = this.minhasAcoes
    },
    encerrarDia() {
      this.$bvModal.hide('meu-modal')
      this.$router.push('/resume')
    }
  },
  computed: {
    acoesCompradas() {
      return this.$store.state.acoesCompradas;
    },
  },
};
</script>

<style>
.links, .opcoes {
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  color: white;
}

.links a, .links a:visited, .links a:hover, .links a:active {
  color: inherit;
  text-decoration: none;

}

.opcoes {
  font-size: 0.95rem;
}

.opcoes a, .opcoes a:visited, .opcoes a:hover, .opcoes a:active {
  color: inherit;
  text-decoration: none;
}

.links a:hover {
  font-size: 1.3rem;
}

.opcoes {
  cursor: pointer;
}

#saldo-navbar {
  cursor: auto;
}
</style>