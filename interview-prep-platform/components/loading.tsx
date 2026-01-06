"use client"


const LoadingPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-border" aria-hidden="true" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"
            role="status"
            aria-label="Checking authentication"
          />
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">InterviewPrep</h2>
          <p className="text-muted-foreground text-sm">Checking authentication...</p>
        </div>
      </div>
    </main>
  )
}

export default LoadingPage