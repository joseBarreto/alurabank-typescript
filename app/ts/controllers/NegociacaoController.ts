import { Negociacoes } from "../models/Negociacoes";
import { MensagemView } from "../views/MensagemView";
import { NegociacoesView } from "../views/NegociacoesView";
import { Negociacao } from "../models/Negociacao";

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

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
        // this._negociacoes.paraArray().forEach(negociacao => {
        //     console.log(negociacao);
        // });

    }
}