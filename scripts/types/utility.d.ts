type AppendItem = Node | string | undefined;
interface HTMLElement {
    _: (...children: AppendItem[]) => this;
    __: (...children: AppendItem[]) => this;
    on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLLegendElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;
    on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;

}