"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { toast } from "sonner"
import { MAX_RESUME_FILE_SIZE } from "@/constants/constants"

interface ResumeUploadProps {
  onUpload?: (file: File) => void
}

const FileCard = ({ file, setFile }: {
  file: File,
  setFile: (file: File | null) => void
}) => {
  return(
    <div className="bg-secondary/20 border border-secondary p-3 rounded-md flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-foreground">{file.name}</p>
        <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(2)} KB</p>
      </div>
      <Button
        onClick={()=>{
          setFile(null)
        }}
      >
        <X />
      </Button>
    </div>
  )
}

export const ResumeUpload = ({ onUpload }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    
    if(selectedFile?.type !== 'application/pdf'){
      toast.error('Only pdf format is accepted');
      return;
    }

    if (selectedFile.size > MAX_RESUME_FILE_SIZE) {
      toast.error("File must be under 10MB.");
      return;
    }

    if (selectedFile) {
      console.log(selectedFile.type)
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
      const rr = await res.json();
      console.log(rr)
      // onUpload?.(file)
      // setFile(null)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle>Resume Upload</CardTitle>
        <CardDescription>Upload or update your resume for AI analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Drag and drop your resume or click to browse</p>
            <p className="text-xs text-muted-foreground">Supported: PDF (Max 10MB)</p>
            <Input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-input" />
            <label htmlFor="resume-input" className="inline-block">
              <Button asChild variant="outline" size="sm">
                <span>Select File</span>
              </Button>
            </label>
          </div>
        </div>
        {file && (
          <FileCard file={file} setFile={setFile}/>
        )}
        <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Resume"}
        </Button>
      </CardContent>
    </Card>
  )
}
