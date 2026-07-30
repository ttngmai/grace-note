import { scoreViewModeAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import Button from '../common/Button2'
import { ScoreViewMode } from '@shared/types'
import tw from 'twin.macro'
import { IconFileDescription, IconMusic } from '@tabler/icons-react'

export default function ScoreViewModeToggleButton(): JSX.Element {
  const [scoreViewMode, setScoreViewMode] = useAtom(scoreViewModeAtom)

  const handleToggleScoreViewMode = (mode: ScoreViewMode): void => {
    switch (mode) {
      case 'imageMode':
        setScoreViewMode('textMode')
        break
      case 'textMode':
        setScoreViewMode('imageMode')
        break
      default:
        return
    }
  }

  return scoreViewMode === 'imageMode' ? (
    <Button
      type="button"
      onClick={() => {
        handleToggleScoreViewMode(scoreViewMode)
      }}
      size="icon"
      color="red"
      title="가사"
      sx={tw`text-[14px]`}
    >
      <IconFileDescription size={18} />
    </Button>
  ) : (
    <Button
      type="button"
      onClick={() => {
        handleToggleScoreViewMode(scoreViewMode)
      }}
      size="icon"
      color="green"
      title="악보"
      sx={tw`text-[14px]`}
    >
      <IconMusic size={18} />
    </Button>
  )
}
