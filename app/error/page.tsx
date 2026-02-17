export default function ErrorPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Error</h1>
                <p className="mt-4 text-lg">Sorry, something went wrong.</p>
                <a href="/login" className="mt-4 inline-block text-blue-500 hover:underline">
                    Go back to Login
                </a>
            </div>
        </div>
    )
}
