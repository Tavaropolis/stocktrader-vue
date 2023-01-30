<template>
    <div class="stock-card">
        <b-card
            class="ms-4 mb-2 cartao-stocks"
            :header="`${acao.nome} (Preço: ${ this.$options.filters.dinheiro(acao.preco) })`"
            header-text-variant="white"
            header-class="text-center"
            header-tag="header"
            body-class="cartao-stocks-body">
                <b-card-text class="stocks-subtitulo">Quantidade</b-card-text>
                <div class="cartao-actions">
                    <input
                        class="form-control me-1"
                        v-model.number="quantidade"
                        @input="ativarBotao(index)"
                        type="number"
                        min="0"/>
                    <b-btn class="botao-comprar" :disabled="!botaoAtivo" @click="calcularCusto(index)">Comprar</b-btn>
                </div>
        </b-card>
    </div>
</template>

<script>
import mixin from '@/mixins/mixin'
import { mapActions } from 'vuex'

export default {
    mixins: [mixin],
    props: {
        acao: {type: Object, required: true},
        index: {type: Number, required: true}
    },
    data() {
        return {
            custo: 0,
            acaoPossuida: {},
            acaoComprada: {}
        }
    },
    methods: {
        ...mapActions(['comprarAcao', 'verificarAcaoPossuida', 'verificarAcaoComprada']),
        ativarBotao() {
            if(this.quantidade > 0 && this.botaoAtivo == false) {
                this.botaoAtivo = !this.botaoAtivo;
            } else if (this.quantidade == 0 && this.botaoAtivo == true) {
                this.botaoAtivo = !this.botaoAtivo;
            }
        },
        calcularCusto(index) {
            this.custo = this.quantidade * this.$store.state.acoes[index].preco
            this.montarAcaoPossuida(index)
            
        },
        montarAcaoPossuida(index) {
            this.acaoPossuida.id = `${this.$store.state.acoes[index].nome}_possuida`
            this.acaoPossuida.nome = this.$store.state.acoes[index].nome
            this.acaoPossuida.preco = this.$store.state.acoes[index].preco
            this.acaoPossuida.quantidade = this.quantidade
            this.verificarAcaoPossuida(this.acaoPossuida)
            this.montarAcaoComprada(index)
        },
        montarAcaoComprada(index) {
            this.acaoComprada.id = `${this.$store.state.acoes[index].nome}_comprada`
            this.acaoComprada.nome = this.$store.state.acoes[index].nome
            this.acaoComprada.preco = this.$store.state.acoes[index].preco
            this.acaoComprada.quantidade = this.quantidade
            this.verificarAcaoComprada(this.acaoComprada)

            this.comprarAcao(this.custo)

            this.acaoPossuida = {}
            this.acaoComprada = {}
        }
    }
};
</script>

<style>
.stock-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.cartao-stocks header{
    height: 45px;
    background-color: #197F50;
}

.cartao-stocks-body {
    width: 25vw;
    height: 12vh;
    background-color: white;
    border-radius: 15px;
}

.stocks-subtitulo {
    font-size: 0.75rem;
    margin: 0
}

.cartao-actions {
    display: flex;
    justify-content: space-evenly;
    white-space: nowrap;
}

input {
    border: none;
    border-bottom: 1px solid grey;
}

.botao-comprar:enabled {
    background-color: #197F50;
}
</style>