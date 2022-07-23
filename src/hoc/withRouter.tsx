import { ComponentType, FC } from "react"
import {
	Location,
	NavigateFunction,
	Params,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom"

export type RouterProps = {
	navigate: NavigateFunction
	location: Location
	params: Params
}
type EmptyObject = Record<string, unknown>

type WithRouterProps<P = EmptyObject> = RouterProps & P

export const withRouter = <Props = EmptyObject,>(
	Component: ComponentType<WithRouterProps<Props>>
): FC<Props> => {
	const Wrapper: FC<Props> = props => {
		const navigate = useNavigate()
		const location = useLocation()
		const params = useParams()
		return (
			<Component
				navigate={navigate}
				location={location}
				params={params}
				{...props}
			/>
		)
	}

	return Wrapper
}
