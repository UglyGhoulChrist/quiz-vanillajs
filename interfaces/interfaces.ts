interface IQuestion {
    id: number,
    title: string,
    variants: [string, string, string]
    correct: 0 | 1 | 2,
    image: string,
    background: string,
}

export type { IQuestion }