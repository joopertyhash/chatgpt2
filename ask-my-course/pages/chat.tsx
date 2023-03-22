import { useRouter } from 'next/router'
import {Chat} from "../components/Chat"
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import type { ReactElement } from 'react'
import EmptyLayout from '../components/EmptyLayout'

export const COOKIE_NAMES = ["userHandle", "workspaceHandle", "instanceHandle", "ownerEmail"]

export type PackageCoordinates = {
  userHandle?: string
  workspaceHandle?: string
  instanceHandle?: string
}


function ChatHome() {
  const [baseUrl, setBaseUrl] = useState<string|undefined>(undefined)
  const {query, isReady} = useRouter()

  const makeBaseUrl = (userHandle?: string, instanceHandle?: string, workspaceHandle?: string) => {
    if (workspaceHandle && instanceHandle){
      return `https://enias.steamship.run/${workspaceHandle}/${instanceHandle}`
    }
    return undefined
  }

  if (isReady && baseUrl === undefined){
    let {userHandle, instanceHandle, workspaceHandle} = query
    let baseUrl = makeBaseUrl(userHandle as string, instanceHandle as string, workspaceHandle as string) || process.env.NEXT_PUBLIC_BASE_URL as string;
    setBaseUrl(baseUrl)
  }
  const errorMessage = (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p>Front-end not connected.</p>
                <br/>
                <p>If this issue persists, please ping us on <a href="https://steamship.com/discord" className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500">Discord</a>. We&apos;re happy to help. </p>
              </div>
            </div>
          </div>
          )
  return (
    <div className="w-full w-screen flex flex-col gap-12 ">
            { typeof baseUrl == "undefined" && errorMessage}
             <Chat className="min-h-screen " baseUrl={baseUrl as string}/>
    </div>
  )
}

ChatHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <EmptyLayout path="">
      {page}
    </EmptyLayout>
  )
}

export default ChatHome
