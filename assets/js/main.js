function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        contaRealizada: false,

        inicia() {
            this.clicaBotoes();
            this.pressionaEnter();
            this.pressionaBotoes();
        },

        clicaBotoes() {
            document.addEventListener('click', e => {
                const el = e.target;

                if (el.classList.contains('btn-num')) {
                    if (this.contaRealizada) {
                        this.contaRealizada = false
                        this.clearDisplay();
                    }
                    this.btnDisplay(el.innerText);
                }
                if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }
                if (el.classList.contains('btn-del')) {
                    this.deleteNum();
                }
                if (el.classList.contains('btn-eq')) {
                    this.realizaConta();
                }
            })
        },
        btnDisplay(valor) {
            this.display.value += valor
        },
        clearDisplay() {
            this.display.value = '';
        },
        deleteNum() {
            this.display.value = this.display.value.slice(0, -1);
        },
        realizaConta() {
            let conta = this.display.value;

            try {
                conta = eval(conta);
                this.display.value = conta;
                this.contaRealizada = true;
            } catch (e) {
                alert('Conta inválida');
                this.clearDisplay();
                console.log(e);
            }
        },

        pressionaEnter() {
            document.addEventListener('keyup', e => {
                if (e.key === 'Enter') this.realizaConta();
            })
        },

        pressionaBotoes() {
            document.addEventListener('keyup', e => {
                let key = e.key;

                if (key < 10) {
                    if (this.contaRealizada) {
                        this.contaRealizada = !this.contaRealizada
                        this.clearDisplay();
                    }
                    this.btnDisplay(key);
                }

                if (key === '+' || key === '-' || key === '*' || key === '/') this.btnDisplay(key);
                if (key === 'Escape') this.clearDisplay();
                if (key === 'Backspace') this.deleteNum();
            })
        }
    }
}

const calculadora = criaCalculadora();
calculadora.inicia();