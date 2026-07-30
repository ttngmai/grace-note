import tw from 'twin.macro'
import NavigationBar from '../common/NavigationBar'
import LexicalCodeSearch from './LexicalCodeSearch'
import * as Separator from '@radix-ui/react-separator'
import LexicalCodeTextSizeSelector from './LexicalCodeTextSizeSelector'
import { useState } from 'react'
import ModalPortal from '@renderer/utils/ModalPortal'
import Button from '../common/Button2'
import { IconSettings } from '@tabler/icons-react'
import LexiconViewerStylesModal from './LexiconViewerStylesModal'

export default function LexiconPageNavigation(): JSX.Element {
  const [openStylesModal, setOpenStylesModal] = useState<boolean>(false)

  return (
    <>
      <NavigationBar sx={tw`h-90pxr`}>
        <LexicalCodeSearch />

        <Separator.Root
          className="shrink-0 inline-block data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-12pxr bg-gray-300"
          decorative
          orientation="vertical"
        />

        <div className="flex items-start h-full gap-8pxr">
          <LexicalCodeTextSizeSelector />

          <Button type="button" onClick={() => setOpenStylesModal(true)} size="icon">
            <IconSettings size={18} />
          </Button>
        </div>
      </NavigationBar>

      {openStylesModal && (
        <ModalPortal>
          <LexiconViewerStylesModal onClose={() => setOpenStylesModal(false)} />
        </ModalPortal>
      )}
    </>
  )
}
