export default function VerifyEmailPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
                <p className="text-gray-600">
                    We&apos;ve sent you a verification link. Please check your email to sign in.
                </p>
                <div className="mt-6">
                    <a
                        href="/login"
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    )
}
