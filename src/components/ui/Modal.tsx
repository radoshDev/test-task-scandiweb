import { Component, ReactNode, ReactPortal } from "react"
import { createPortal } from "react-dom"

const modalRoot = document.getElementById("modal-root")

type Props = {
	children: ReactNode
}

class Modal extends Component<Props> {
	containerElement: HTMLDivElement

	constructor(props: Props) {
		super(props)
		this.containerElement = document.createElement("div")
	}

	componentDidMount(): void {
		if (!modalRoot) throw new Error("#modal-root is not defined")
		modalRoot.append(this.containerElement)
	}

	componentWillUnmount(): void {
		if (!modalRoot) throw new Error("#modal-root is not defined")
		this.containerElement.remove()
	}

	render(): ReactPortal {
		const { children } = this.props
		return createPortal(children, this.containerElement)
	}
}

export default Modal
