interface HTMLElement {
    _: (...children: (Node | string | undefined)[]) => this;
    on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLegendElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;
    on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;

}