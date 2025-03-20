import './styles/global.scss'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const rootDOM = document.getElementById('root')!
const root = createRoot(rootDOM)

root.render(
    <App />
)
