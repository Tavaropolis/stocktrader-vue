import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        saldo: 2000,
        diaInicial: new Date().getDate(),
        diasAplicados: 0,
        diaSemana: new Date().getDay(),
        mesesAplicados: 0,
        acoes: [
            {nome: "BMW", preco: 110},
            {nome: "Google", preco: 200},
            {nome: "Apple", preco: 250},
            {nome: "Twitter", preco: 12}
        ],
        acoesPossuidas: [],
        acoesCompradas: [],
        acoesVendidas: [],
    },
    mutations: {
        diminuirSaldo(state, payload) {
            state.saldo -= payload
        },
        aumentarSaldo(state, payload) {
            state.saldo += payload
        },
        resetarSaldo(state) {
            state.saldo += 2000
        },
        incrementarDia(state) {
            state.diasAplicados++
            state.diaSemana++ 
            if (state.diaSemana >= 7) {
                state.diaSemana = 0
            }
        },
        resetarDia(state) {
            state.diaInicial = 1
            state.diasAplicados = 0
        },
        incrementarMes(state) {
            state.mesesAplicados++
        },
        adicionarAcaoPossuida(state, payload) {
            state.acoesPossuidas.push(payload)
        },
        adicionarAcaoComprada(state, payload) {
            state.acoesCompradas.push(payload)
        },
        adicionarAcaoVendida(state, payload) {
            state.acoesVendidas.push(payload)
        },
        adicionarQuantidadePossuida(state, payload) {
            for(let acaoPossuida of this.state.acoesPossuidas) {
                if(acaoPossuida.nome == payload.nome) {
                    acaoPossuida.quantidade += payload.quantidade
                }
            }
        },
        adicionarQuantidadeComprada(state, payload) {
            for(let acaoComprada of this.state.acoesCompradas) {
                if(acaoComprada.nome == payload.nome) {
                    acaoComprada.quantidade += payload.quantidade
                }
            }
        },
        adicionarQuantidadeVendida(state, payload) {
            for(let acaoVendida of this.state.acoesVendidas) {
                if(acaoVendida.nome == payload.nome) {
                    acaoVendida.quantidade += payload.quantidade
                }
            }
        },
        retirarQuantidadePossuida(state, payload) {
            for(let acaoPossuida of this.state.acoesPossuidas) {
                if(acaoPossuida.nome == payload.nome) {
                    acaoPossuida.quantidade -= payload.quantidade
                    if(acaoPossuida.quantidade == 0) {
                        this.state.acoesPossuidas.splice(this.state.acoesPossuidas.indexOf(acaoPossuida), 1)
                    }
                }
            }
        },
        limparAcoes(state) {
            state.acoesCompradas = []
            state.acoesVendidas = []
        },
        aleatorizarPrecos(state) {
            state.acoes[0].preco = ((Math.random() * (110 - 80)) + 80).toFixed(2)
            state.acoes[1].preco = ((Math.random() * (200 - 180)) + 180).toFixed(2)
            state.acoes[2].preco = ((Math.random() * (250 - 230)) + 230).toFixed(2)
            state.acoes[3].preco = ((Math.random() * (12 - 2)) + 2).toFixed(2)
        }
    },
    actions: {
        verificarMes(context, payload) {
            switch(this.state.mesesAplicados) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 7:
                case 9:
                case 11:
                    if (payload + this.state.diaInicial > 31) {
                        context.commit('resetarDia', payload)
                        context.commit('incrementarMes', payload)
                    }
                    break
                case 3:
                case 5:
                case 8:
                case 10: 
                    if (payload + this.state.diaInicial > 30) {
                        context.commit('resetarDia', payload)
                        context.commit('incrementarMes', payload)
                    }
                    break
                case 1:
                    if (payload + this.state.diaInicial > 28) {
                        context.commit('resetarDia')
                        context.commit('incrementarMes')
                    }
                    break
            }
        },
        comprarAcao(context, payload) {
            if (this.state.saldo - payload >= 0) {
                context.commit('diminuirSaldo', payload)
            } else {
                window.alert("Você não possui saldo suficiente para essa operação")
            }
        },
        verificarAcaoPossuida(context, payload) {
            let existeAcao = false;
            for(let i = 0; i < this.state.acoesPossuidas.length; i++) {
                if(this.state.acoesPossuidas[i].nome == payload.nome) {
                    context.commit('adicionarQuantidadePossuida', payload)
                    existeAcao = true
                }
            }
            if(existeAcao == false) {
                context.commit('adicionarAcaoPossuida', payload)
            }
        },
        verificarAcaoComprada(context, payload) {
            let existeAcao = false;
            for(let i = 0; i < this.state.acoesCompradas.length; i++) {
                if(this.state.acoesCompradas[i].nome == payload.nome) {
                    context.commit('adicionarQuantidadeComprada', payload)
                    existeAcao = true
                }
            }
            if(existeAcao == false) {
                context.commit('adicionarAcaoComprada', payload)
            }
        },
        verificarAcaoVendida(context, payload) {
            let existeAcao = false;
            for(let i = 0; i < this.state.acoesVendidas.length; i++) {
                if(this.state.acoesVendidas[i].nome == payload.nome) {
                    context.commit('adicionarQuantidadeVendida', payload)
                    existeAcao = true
                }
            }
            if(existeAcao == false) {
                context.commit('adicionarAcaoVendida', payload)
            }
        },
        venderAcao(context, payload) {
            context.commit('aumentarSaldo', payload)
        }
    }
})