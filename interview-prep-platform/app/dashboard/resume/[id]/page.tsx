import Page from "@/components/resume/page";

const page = async ({ params } : {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;

  return (
    <Page id={id}/>
  )
}

export default page