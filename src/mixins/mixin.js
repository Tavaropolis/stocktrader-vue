export default {
    data() {
        return {
            quantidade: 0,
            botaoAtivo: false,
            dayName : new Array ("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"),
            monName : new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Agosto", "Outubro", "Novembro", "Dezembro")
        }
    },
    computed: {
        saldo() {
            return this.$store.state.saldo;
        },
    },
    filters: {
        dinheiro(valor) {
            return `R$ ${parseFloat(valor).toFixed(2)}`.replace('.', ',')
        } 
    }
}