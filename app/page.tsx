import { Button } from "@/components/ui/button";
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    name: "Store your PDF Documents",
    description:
      "Keep all your important pdf file securely stored and easily accessable anytime, anywhere",
    icon: GlobeIcon,
  },
  {
    name: "Blazing fast responses",
    description:
      "Keep all your important pdf file securely stored and easily accessable anytime, anywhere",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description:
      "Keep all your important pdf file securely stored and easily accessable anytime, anywhere",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF Viewer",
    description:
      "Keep all your important pdf file securely stored and easily accessable anytime, anywhere",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description:
      "Keep all your important pdf file securely stored and easily accessable anytime, anywhere",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive accross devices",
    description:
      "Keep all your important pdf file securely stored and easily accessable anytime, anywhere",
    icon: MonitorSmartphoneIcon,
  },
];

export default function Home() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-lg">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          {/********* banner item***************    */}

          <div className=" mx-auto max-w-3xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 ">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Trasform Your PDFs into Interactive Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-indigo-600 ">Chat With PDF</span>
              <br />
              <br />
              Upload your document and our chatbot will answer
              questions,summarizw content, and answer all your Qs, Ideal for
              everyone <span className="font-bold">dynamic conversations</span>,
              enhancing productivity 10x fold effortlessly
            </p>
          </div>

          <Button className="mt-10">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        {/* second section ******* image ss niya image bb te host kore then link boshate hobe then noxt config e image er h0st name dite hobe , er por design kaj dekhte hbe video te 50 min theke start */}
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image alt="App Screenshot" src="https://i.ibb.co/ncjGN9j/VciRSTI.jpg" width={2432} height={1442} className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10" />
          </div>
        </div>

        <div className="  mt-16 max-w-7xl mx-auto px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-2xl gap-x-6 gap-y-10 text-base leading-7 lg:mx-0 lg:max-w-none lg:gap-x-8 lg:gap-y-16">
            {
              features.map((feature,index) =>(
                <div key={index} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      aria-hidden = 'true'
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                    />
                  </dt>
                  <dd>
                    {feature.description}
                  </dd>
                </div>
              ))
            }
          </dl>
        </div>
      </div>
    </main>
  );
}
