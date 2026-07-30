import MainPageNavigationBar from '../components/main/MainPageNavigationBar'
import PanelGrid from '../components/common/PanelGrid'

export default function MainPage(): JSX.Element {
  return (
    <div className="overflow-hidden">
      <MainPageNavigationBar />

      <div className="flex h-[calc(100vh-80px)]">
        <PanelGrid />
      </div>
    </div>
  )
}
