import { ReactPortal } from 'react'
import ReactDOM from 'react-dom'

export default function ModalPortal({ children }): ReactPortal {
  const el = document.getElementById('modal') as HTMLElement
  return ReactDOM.createPortal(children, el)
}
