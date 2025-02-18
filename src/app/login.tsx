export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen p-8">
            <form className="flex flex-col gap-4 bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <label htmlFor="email" className="flex flex-col">
                    Email:
                    <input type="email" id="email" name="email" required className="border p-2 rounded" />
                </label>
                <label htmlFor="password" className="flex flex-col">
                    Password:
                    <input type="password" id="password" name="password" required className="border p-2 rounded" />
                </label>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
}