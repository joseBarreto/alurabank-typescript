class MensagemView extends View {
    template(model) {
        return `<p class="alert alert-info" role="alert">${model}</p>`;
    }
}
