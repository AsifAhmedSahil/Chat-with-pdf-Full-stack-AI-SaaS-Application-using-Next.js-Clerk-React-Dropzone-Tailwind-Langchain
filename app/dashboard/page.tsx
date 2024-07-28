import Document from "@/components/Document"

export const dynamic = 'force-dynamic'

function Dashboard() {
  return (
    <div className="h-full max-w-7xl mx-auto">
        <h1 className="bg-gray-100 font-extralight text-indigo-600 text-3xl p-5">
            My Documents
        </h1>
      
      <Document/>
    </div>
  )
}

export default Dashboard
