import ThemeSearch from '@renderer/components/theme/ThemeSearch'
import ThemeViewer from '@renderer/components/theme/ThemeViewer'

export default function ThemePage(): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 h-full overflow-hidden">
        <ThemeSearch />
      </div>
      <div className="flex-[2] h-full overflow-hidden">
        <ThemeViewer />
      </div>
    </div>
  )
}
