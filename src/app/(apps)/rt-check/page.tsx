import RichText from '@/components/RichText'

const text = (t: string) => ({
  type: 'text', text: t, format: 0, detail: 0, mode: 'normal', style: '', version: 1,
})

const li = (t: string, children?: any[]) => ({
  type: 'listitem', version: 1, checked: undefined, indent: 0, direction: null, format: '',
  value: 1, children: children ?? [text(t)],
})

const data: any = {
  root: {
    type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
    children: [
      { type: 'heading', tag: 'h2', version: 1, format: '', indent: 0, direction: 'ltr', children: [text('Nadpis')] },
      { type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', children: [text('Odsek s '), { ...text('inline code'), format: 16 }] },
      {
        type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, format: '', indent: 0, direction: 'ltr',
        children: [
          li('Prva'),
          li('', [text('Druha'), {
            type: 'list', listType: 'number', tag: 'ol', start: 1, version: 1, format: '', indent: 1, direction: 'ltr',
            children: [li('Vnorena A'), li('Vnorena B')],
          }]),
        ],
      },
      { type: 'quote', version: 1, format: '', indent: 0, direction: 'ltr', children: [text('Citat')] },
      { type: 'horizontalrule', version: 1 },
      {
        type: 'block', version: 2, format: '',
        fields: { blockType: 'code', language: 'typescript', filename: 'demo.ts', showLineNumbers: true, code: 'const a: number = 1\nconsole.log(a)' },
      },
    ],
  },
}

export default function Page() {
  return <RichText data={data} skipAnimation />
}
