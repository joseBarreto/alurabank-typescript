import { MensagemView, NegociacoesView } from "../views/index";
import { Negociacoes, Negociacao } from "../models/index";

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes: Negociacoes;
    private _negociacoesView: NegociacoesView;
    private _mensagemView: MensagemView;

    constructor() {
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView("#mensagemView");

        this._negociacoesView.update(this._negociacoes);

    }

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