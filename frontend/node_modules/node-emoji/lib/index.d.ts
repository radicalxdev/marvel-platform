type EmojifyFormat = (name: string, part?: string, input?: string) => string;
interface EmojifyOptions {
    fallback?: string | ((part: string) => string);
    format?: EmojifyFormat;
}
declare const emojify: (input: string, { fallback, format }?: EmojifyOptions) => string;

declare const find: (codeOrName: string) => {
    emoji: string;
    key: string;
} | undefined;

declare const get: (codeOrName: string) => string | undefined;

declare const has: (codeOrName: string) => boolean;

declare const random: () => {
    name: string;
    emoji: string;
};

interface Emoji {
    emoji: string;
    key: string;
}

type ReplaceReplacement = (emoji: Emoji, index: number, string: string) => string;
declare const replace: (input: string, replacement: string | ReplaceReplacement, { preserveSpaces }?: {
    preserveSpaces?: boolean | undefined;
}) => string;

declare const search: (keyword: string) => {
    name: string;
    emoji: string;
}[];

interface StripOptions {
    preserveSpaces?: boolean;
}
declare const strip: (input: string, { preserveSpaces }?: StripOptions) => string;

declare const unemojify: (input: string) => string;

interface WhichOptions {
    markdown?: boolean;
}
declare const which: (emoji: string, { markdown }?: WhichOptions) => string | undefined;

export { EmojifyFormat, EmojifyOptions, ReplaceReplacement, StripOptions, WhichOptions, emojify, find, get, has, random, replace, search, strip, unemojify, which };
