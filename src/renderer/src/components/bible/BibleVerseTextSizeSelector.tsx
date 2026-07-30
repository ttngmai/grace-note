import { bibleVerseTextSizeAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import CustomSelect from '../common/CustomSelect'

export default function BibleVerseTextSizeSelector(): JSX.Element {
  const [textSize, setTextSize] = useAtom(bibleVerseTextSizeAtom)

  return (
    <div className="flex items-center shrink-0 w-fit gap-8pxr">
      <CustomSelect
        value={String(textSize)}
        itemList={Array.from({ length: 21 }, (_, idx) => idx + 10).map((el) => ({
          key: String(el),
          value: String(el),
          text: `${el} pt`
        }))}
        setValue={(value) => setTextSize(Number(value))}
      />
    </div>
  )
}
