import { Button, Modal } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie'
import {COOKIE_NAMES, PackageCoordinates} from "../pages/index"
import {Icons} from "../components/Icons"
import { useRouter } from 'next/router'

export default function ShareButton() {
  const [cookie] = useCookies(COOKIE_NAMES)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [sharableUrl, setSharableUrl] = useState<string|undefined>(undefined)
  const {query} = useRouter()



  useEffect(() => {
    let {userHandle, instanceHandle, workspaceHandle} = query;
    let packageCoordinates:PackageCoordinates = cookie["packageCoordinates"]
    setSharableUrl(`?userHandle=${userHandle||packageCoordinates?.userHandle}&workspaceHandle=${workspaceHandle||packageCoordinates?.workspaceHandle}&instanceHandle=${instanceHandle||packageCoordinates?.instanceHandle}`)
  })


  return (
    <React.Fragment>
      {
    typeof document !== 'undefined'  && <React.Fragment>

    <Button onClick={() => setShowModal(true)} gradientDuoTone="purpleToBlue" className="mr-1">
    <div className="flex flex-row items-center">
            <Icons.share className="mr-2 h-5 w-5" /> Share
            </div>
      </Button>
      <Modal
    show={showModal}
    onClose={() => setShowModal(false)}
  >
    <Modal.Header>
      Share your your chatbot 
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Share this page</h3>
        <div className="sm:flex sm:flex-row-reverse"><pre className=" overflow-auto text-xs bg-slate-100 rounded p-2"><code>
        https://ask-my-course.vercel.app{sharableUrl}
</code></pre>

      </div>

        <hr/>

        <div className="mt-3">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Embed chat on website</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">To add the chatbot any where on your website, add this iframe to your html code</p>
        </div>
      </div>


        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"><pre className=" overflow-auto text-xs bg-slate-100 rounded p-2"><code>&lt;iframe
src="https://ask-my-course.vercel.app/chat{sharableUrl}" {"\n"}
width="100%" {"\n"}
height="700" {"\n"}
frameborder="0" {"\n"}
&gt;&lt;/iframe&gt;
</code></pre></div>
<hr/>


<div className="mt-3">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Embed chat bubble on website</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">To add a chat bubble to the bottom right of your website add this script tag to your html</p>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"><pre className=" overflow-auto text-xs bg-slate-100 rounded p-2">
      <code>&lt;script
  src="https://cdn.jsdelivr.net/gh/EniasCailliau/chatbot@main/index.js"
  id="https://ask-my-course.vercel.app/chat{sharableUrl}"
&gt;&lt;/script&gt;</code>
</pre></div>

        
        
      </div>
    </Modal.Body>
  </Modal>

      </React.Fragment>
      }
      </React.Fragment>




    )
}

