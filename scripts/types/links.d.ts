type LinkConfig = ({ innerText: string; imgSrc?: never; } | { innerText?: never; imgSrc: string; }) & { href: string; };
interface LinkGroupConfig {
    legendText: string;
    staticLinks?: LinkConfig[];
    inputLinks?: LinkConfig[];
    defaultShrink?: boolean;
}