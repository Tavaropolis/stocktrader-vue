<template>
    <div class="portfolio-card">
        <b-card
            class="ms-4 mb-2 cartao-portfolio"
            :header="`${acao.nome} (Pago: ${ this.$options.filters.dinheiro(acao.preco) }| Atual: ${this.$options.filters.dinheiro(precoAtual)}| Qtde: ${ acao.quantidade })`"
            header-text-variant="white"
            header-class="text-center"
            header-tag="header"> 
              <b-card-text class="portfolio-subtitulo">Quantidade</b-card-text>
              <div class="cartao-actions">
                  <input
                  class="form-control me-1"
                  v-model.number="quantidade"
                  @input="ativarBotao(index)"
                  type="number"
                  min="0"
                  :max="acao.quantidade"
                  />
              <b-btn class="botao-vender" :disabled="!botaoAtivo" @click="calcularLucro(index)">Vender</b-btn>
              </div>
        </b-card>
    </div>
</template>

<script>
import mixin from '@/mixins/mixin'
import { mapActions, mapMutations } from 'vuex';

export default {
    mixins: [mixin],
    props: {
      acao: {type: Object, required: true},
      index: {type: Number, required: true},
    },
    data() {
      return {
        lucro: 0,
        precoAtual: this.acao.preco,
        acaoVendida: {}
      }
    },
    created() {
      setInterval(this.atualizarPrecos, 5000)
    },
    methods: {
      ...mapActions(['verificarAcaoVendida', 'venderAcao']),
      ...mapMutations(['retirarQuantidadePossuida']),
      ativarBotao() {
        if (this.quantidade > 0 && this.botaoAtivo == false) {
          this.botaoAtivo = !this.botaoAtivo;
        } else if (this.quantidade == 0 && this.botaoAtivo == true) {
          this.botaoAtivo = !this.botaoAtivo;
        }
      },
      calcularLucro(index) {
        this.lucro = this.quantidade * this.precoAtual;
        this.montarAcao(index);
      },
      montarAcao(index) {
        this.acaoVendida.id = `${this.$store.state.acoes[index].nome}_vendida`
        this.acaoVendida.nome = this.$store.state.acoesCompradas[index].nome;
        this.acaoVendida.preco = this.$store.state.acoesCompradas[index].preco;
        this.acaoVendida.quantidade = this.quantidade;

        this.retirarQuantidadePossuida(this.acaoVendida);
        this.verificarAcaoVendida(this.acaoVendida);
        this.venderAcao(this.lucro);
        this.$forceUpdate();
        this.acaoVendida= {};
      },
      atualizarPrecos() {
        for(let i = 0; i < this.$store.state.acoes.length; i++) {
          if(this.acao.nome == this.$store.state.acoes[i].nome) {
            this.precoAtual = this.$store.state.acoes[i].preco
          }
        }
        this.$forceUpdate()
      },
      computed: {
        acoes() {
          return this.$store.state.acoes
        }
      }
    },
  };

</script>

<style>
.container-portifolio {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.cartao-portfolio {
  width: 27vw;
  height: 50px
}

.cartao-portfolio header{
  font-size: 0.85rem;
  height: 45px;
  background-color: #0F4CB8;
}

.portfolio-subtitulo {
  font-size: 0.75rem;
  margin: 0
}

.cartao-actions {
  display: flex;
  justify-content: space-evenly;
  white-space: nowrap;
}

input {
  border: none !important;
  border-bottom: 1px solid grey !important;
}

.botao-vender:enabled {
  background-color: #0F4CB8 
}
</style>