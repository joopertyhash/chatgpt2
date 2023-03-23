import React from "react";
import { Modal,Button } from "flowbite-react";
import {Icons} from "../components/Icons"
import { useRouter } from 'next/router'
import {COOKIE_NAMES, PackageCoordinates} from "../pages/index"
import { useCookies } from 'react-cookie'

export function ClaimModal({ show, setShow }: any) {
  const {query} = useRouter()
  const [cookie] = useCookies(COOKIE_NAMES)

  const addData = async () => {
    let {userHandle, instanceHandle, workspaceHandle} = query;
    let packageCoordinates:PackageCoordinates = cookie["packageCoordinates"]

    const response = await fetch('/api/claim_chatbot', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          userHandle: userHandle||packageCoordinates?.userHandle,
          workspaceHandle: workspaceHandle || packageCoordinates?.workspaceHandle,
          instanceHandle: instanceHandle || packageCoordinates?.instanceHandle
        }),

    });
    if (!response.ok){
      console.log("Error when adding Lecture")
    }

  }

  if (show) {
    addData()
  }
  return (
    <div>
    {typeof document !== 'undefined'  && <Modal
    show={show}
    onClose={() => setShow(false)}
    className="md"
    >
    <Modal.Header>
      You're instance is on the way 🚢
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p>
        We're currently onboarding ask-my-course clients manually as we're scaling up.
        </p>
        <p>

        We'll reach out to you by e-mail once your instance is ready. 
        </p>
        <p>

        In the meantime, come join us and 100s of other builders like you on our <a className="underline" href="https://steamship.com/discord">Discord</a>.

        <Button href="https://steamship.com/discord" gradientDuoTone="purpleToBlue" className="mt-5" >
  <div className="flex flex-row items-center">
          <Icons.discord fill="pink" color="pink" className="mr-2 h-5 w-5" /> Go to Discord
          </div>
    </Button>        </p>
      </div>
    </Modal.Body>
  </Modal>}
  </div>
  )
}
