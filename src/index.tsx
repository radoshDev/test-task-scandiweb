import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import App from "./components/App"
import { store } from "./app/store"
import theme from "./styles/theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</BrowserRouter>
)
