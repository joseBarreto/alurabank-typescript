import { MensagemView, NegociacoesView } from "../views/index";
import { Negociacoes, Negociacao, Negociacaoparcial } from "../models/index";
import { domInject, logarTempoDeExecucao } from "../helpers/decorators/index";

export class NegociacaoController {

    private readonly _urlAPI: string = 'http://localhost:8080/dados';
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes: Negociacoes;
    private _negociacoesView: NegociacoesView;
    private _mensagemView: MensagemView;

    constructor() {

        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView("#mensagemView");

        this._negociacoesView.update(this._negociacoes);

    }

    @logarTempoDeExecucao()
    adiciona(event: Event) {


        event.preventDefault();
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtils(data)) {
            this._mensagemView.update("Somente negociações em dias úteis.");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");

    }

    private _ehDiaUtils(data: Date): boolean {
        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }

    @logarTempoDeExecucao()
    importaDados() {
        function isOk(res: Response) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }

        }

        fetch(this._urlAPI)
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados: Negociacaoparcial[]) => {
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))

                this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => console.log('errooo: ' + err.message));
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}