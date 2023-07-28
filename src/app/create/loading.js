import Image from "next/image";


export default function loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-bg-main">.</p>
      <Image className="animate-spin rounded-full" width={100} height={100} src='/assets/logo6.png'/>
    </div>
  )
}