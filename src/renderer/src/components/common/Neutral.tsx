export const Neutral: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
    {children}
  </span>
)
