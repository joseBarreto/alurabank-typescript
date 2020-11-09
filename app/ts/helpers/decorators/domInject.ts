export function domInject(selector: string) {

    return function (target: any, key: string) {
        let elemento: JQuery;

        const getter = function () {
            if (!elemento) {
                console.log(`buscando elemento do dom pelo seletor ${selector} para injetar no ${key}`)
                elemento = $(selector);
            }
            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });

    }
}