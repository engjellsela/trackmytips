import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <div>
            <h1>Error Page 404</h1>
            <Link to="/">Go back</Link>
        </div>
    )
}