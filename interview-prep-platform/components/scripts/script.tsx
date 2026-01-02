import Script from "next/script"

export const Scripts = () => {
    return(
        <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/ort.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.29/dist/bundle.min.js"
          strategy="beforeInteractive"
        />
      </head>
    )
}