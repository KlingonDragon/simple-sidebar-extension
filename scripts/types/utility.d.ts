type AppendItem = Node | string | undefined;
interface HTMLElement {
    _: (...children: AppendItem[]) => this;
    __: (...children: AppendItem[]) => this;
    on<K extends keyof HTMLElementEventMap, T extends this>(type: K, listener: (this: T, ev: HTMLElementEventMap[K] & { currentTarget: T; }) => any, options?: boolean | AddEventListenerOptions): this;
    on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;

}
interface ElementProps {
    dataset?: DOMStringMap;
    style?: Partial<CSSStyleDeclaration>;
    classList?: (string | undefined)[];
    attributeList?: { [attribute: string]: string; };
    [key: string]: any;
}