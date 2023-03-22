import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi"
import { useCookies } from 'react-cookie'
import { COOKIE_NAMES } from "../pages/index";
import { useRouter } from 'next/router'



export function ConfirmResetModal({ show, setShow }: any) {

  const [cookie, setCookie, removeCookie] = useCookies(COOKIE_NAMES)
  const router = useRouter()

  const resetFunction = async () => {
    removeCookie("packageCoordinates")
    removeCookie("id")
    router.push("/")
    router.reload()
  }


  return (
    <div>
    {typeof document !== 'undefined'  && <Modal
      show={show}
      size="md"
      popup={true}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to reset your chatbot?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                  resetFunction()
                  setShow(false)
              }}
            >
              Yes, I'm sure
            </Button>
            <Button
              color="gray"
              onClick={() => {setShow(false)}}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>}
  </div>
  )
}
