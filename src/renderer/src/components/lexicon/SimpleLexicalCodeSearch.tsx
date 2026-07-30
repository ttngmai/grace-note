import Button from '../common/Button2'
import { IconChevronLeft, IconChevronRight, IconSearch } from '@tabler/icons-react'
import { lexicalCodeAtom, lexicalCodeSearchParamsAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import * as Label from '@radix-ui/react-label'
import tw from 'twin.macro'

export default function SimpleLexicalCodeSearch(): JSX.Element {
  const [lexicalCode, setLexicalCode] = useAtom(lexicalCodeAtom)
  const [searchParams, setSearchParams] = useAtom(lexicalCodeSearchParamsAtom)

  const [keyword, setKeyword] = useState<string>(lexicalCode)

  const openInLexiconPage = (keyword: string): void => {
    setSearchParams({ ...searchParams, codes: [keyword] })
    window.context.openLexiconWindow(keyword)
  }

  const updateLexicalCode = (direction: 'prev' | 'next'): void => {
    const match = keyword
      .trim()
      .toUpperCase()
      .match(/^([HG])(\d+)$/)
    if (!match) return

    const [_, prefix, numStr] = match
    const num = parseInt(numStr, 10)
    const newNum = direction === 'prev' ? num - 1 : num + 1

    if (newNum < 0) return

    setLexicalCode(`${prefix}${newNum}`)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setLexicalCode(keyword ? keyword.trim().toUpperCase() : '')
    }
  }

  useEffect(() => {
    setKeyword(lexicalCode)
  }, [lexicalCode])

  return (
    <div className="flex items-center shrink-0 w-fit gap-6pxr">
      <Label.Root className="flex gap-3pxr font-bold" htmlFor="lexical-code">
        <span style={{ fontFamily: 'Noto Serif Hebrew', fontSize: '17px' }}>א</span>
        <span style={{ fontFamily: 'Noto Serif' }}>Ω</span>
      </Label.Root>
      <div className="flex items-center">
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleEnterKey}
          value={keyword}
          id="lexical-code"
          className="inline-flex justify-center items-center w-80pxr h-32pxr p-4pxr border-2 border-blue-500 rounded-md rounded-r-none text-center"
        ></input>
        <Button
          type="button"
          onClick={() => {
            setLexicalCode(keyword ? keyword.trim().toUpperCase() : '')
            if (keyword) {
              openInLexiconPage(keyword)
            }
          }}
          size="icon"
          sx={tw`rounded-l-none`}
        >
          <IconSearch size={18} />
        </Button>
      </div>

      <div className="flex items-center gap-1pxr">
        <Button
          type="button"
          onClick={() => updateLexicalCode('prev')}
          sx={tw`rounded-r-none w-20pxr`}
          size="icon"
        >
          <IconChevronLeft size={16} />
        </Button>
        <Button
          type="button"
          onClick={() => updateLexicalCode('next')}
          sx={tw`rounded-l-none w-20pxr`}
          size="icon"
        >
          <IconChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
