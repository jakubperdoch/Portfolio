// Languages offered in the admin, shared with the highlighter so the select
// can never hand shiki a grammar it does not know.
export const codeLanguages = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'TSX', value: 'tsx' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSX', value: 'jsx' },
  { label: 'JSON', value: 'json' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'SCSS', value: 'scss' },
  { label: 'Shell', value: 'bash' },
  { label: 'SQL', value: 'sql' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'PHP', value: 'php' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Diff', value: 'diff' },
  { label: 'Plain text', value: 'text' },
] as const

export type CodeLanguage = (typeof codeLanguages)[number]['value']

const values = new Set<string>(codeLanguages.map((l) => l.value))

export const isCodeLanguage = (value: string | undefined | null): value is CodeLanguage =>
  !!value && values.has(value)

export const codeLanguageLabel = (value: string | undefined | null): string =>
  codeLanguages.find((l) => l.value === value)?.label ?? 'Plain text'
