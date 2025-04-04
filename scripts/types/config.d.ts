interface LinkConfigBase {
    innerText: string;
    imgSrc?: string;
}
type LinkConfig = LinkConfigBase & { href: string; };
type LinkFunctionConfig = LinkConfigBase & { hrefFunction: ((inputValue: string) => string); };
type BadgeConfig = { href?: string, src: string; };
interface GroupConfig {
    legendText: string;
    staticLinks?: LinkConfig[];
    inputLinks?: LinkConfig[];
    badgeGallery?: BadgeConfig[];
    defaultShrink?: boolean;
}
interface PageFlags {
    colourScheme?: string;
    hideOpenLinkButtons: boolean;
    hideToggleCheckboxes: boolean;
}
interface Config extends PageFlags {
    groups: GroupConfig[];
    useTZ: boolean;
    tzList: string[];
    defaultTZList: string[];
}