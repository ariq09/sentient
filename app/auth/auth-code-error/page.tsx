export default function AuthCodeError() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Authentication Error</h1>
                <p className="mt-4 text-lg">There was an error verifying your authentication code.</p>
                <a href="/login" className="mt-4 inline-block text-blue-500 hover:underline">
                    Go back to Login
                </a>
            </div>
        </div>
    )
}
