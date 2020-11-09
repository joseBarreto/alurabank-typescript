import { MensagemView, NegociacoesView } from "../views/index";
import { Negociacoes, Negociacao } from "../models/index";
import { domInject, logarTempoDeExecucao } from "../helpers/decorators/index";

export class NegociacaoController {

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