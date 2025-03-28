type LinkConfigBase = ({ innerText: string; imgSrc?: never; } | { innerText?: never; imgSrc: string; });
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
interface Config {
    groups?: GroupConfig[];
    useTZ?: boolean;
    tzList?: string[];
}