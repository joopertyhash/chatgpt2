import React, { useState } from "react";
import { Modal,Button } from "flowbite-react";
import {Icons} from "../components/Icons"

export function ClaimModal({ show, setShow }: any) {
  return (
    typeof document !== 'undefined'  && <Modal
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
  </Modal>
  )
}
