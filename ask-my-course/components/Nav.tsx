import { Icons } from "../components/Icons"
import {Navbar, Button} from "flowbite-react"
import ShareButton from "../components/ShareButton"
import {ClaimModal} from "./ClaimModal"
import React, { useState } from "react";
import { ConfirmResetModal } from "./ConfirmResetModal";

export interface NavProps {
  path: string
}

export default function Nav({ path }: NavProps) {
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false)
  const [showResetModal, setShowResetModal] = useState<boolean>(false)


  return (
    <div className="border-b border-b-slate-200 dark:border-b-slate-700 ">
      <Navbar
  fluid={true}
  rounded={true}
  className="sticky top-z-40 mx-auto max-w-7xl   bg-white dark:bg-slate-900"
>
  <Navbar.Brand >
    <Icons.logo className="mr-3 h-6 sm:h-9" />
    <a href="/" className="self-center whitespace-nowrap text-xl font-semibold dark:text-white mr-1">
      CourseGPT
    </a>  <a href="https://steamship.com">by Steamship</a>
    
    
  </Navbar.Brand>
  <div className="flex md:order-2">

    <ShareButton/>
    <Button onClick={() => setShowClaimModal(true)} gradientDuoTone="purpleToBlue" className="mr-1" >
  <div className="flex flex-row items-center">
          <Icons.claim className="mr-2 h-5 w-5" /> Claim your chatbot
          </div>
    </Button>
    <ClaimModal show={showClaimModal} setShow={setShowClaimModal}/>

    <Button gradientDuoTone="pinkToOrange" onClick={() => setShowResetModal(true)}>
  <div className="flex flex-row items-center">
  <Icons.plus className="mr-2 h-5 w-5" /> Create another Chatbot
          </div>
    </Button>
    <ConfirmResetModal show={showResetModal} setShow={setShowResetModal} />
    <Navbar.Toggle />
  </div>
    
</Navbar>
    </div>
  )
}