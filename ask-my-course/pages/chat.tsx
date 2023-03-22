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
  const [ownerEmail, setOwnerEmail] = useState<string|undefined>(undefined)
  const [packageCoordinates, setPackageCoordinates] = useState<PackageCoordinates|undefined>(undefined)
  const [cookie, setCookie] = useCookies(COOKIE_NAMES)
  const {query, isReady} = useRouter()


  useEffect(() => {
    const workspaceHandle = Math.random().toString(36).substring(7) 
    if (cookie["ownerEmail"]) {
      setOwnerEmail(cookie["ownerEmail"])
    }
  }, [cookie, setCookie])

  const setPackageCoordinatesInCookie = ({ userHandle, workspaceHandle, instanceHandle}: PackageCoordinates) => {
    console.log("setPackageCoordinatesInCookie", userHandle)
    setCookie("userHandle", userHandle)
    setCookie("workspaceHandle", workspaceHandle)
    setCookie("instanceHandle", instanceHandle)
  }

  const getPublicBaseUrl = async () => {
    const response = await fetch('/api/get_public_base', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspaceHandle: cookie["workspaceHandle"]
        }),
      });

      if (!response.ok){
        console.log("Error when adding Lecture")
      }
      const {invocationURL, instanceHandle} = await response.json()
      console.log("invocationUrl", invocationURL, instanceHandle)
      setBaseUrl(invocationURL.substring(0, invocationURL.length - 1))
      const packageCoordinates = {
        userHandle: 'enias',
        workspaceHandle: cookie["workspaceHandle"],
        instanceHandle: instanceHandle
      }
      setPackageCoordinates(packageCoordinates)
      setPackageCoordinatesInCookie(packageCoordinates)
  };


  const makeBaseUrl = (userHandle?: string, instanceHandle?: string, workspaceHandle?: string, isStaging?: boolean) => {
    if (userHandle && instanceHandle){
      if (isStaging){
        return `https://${userHandle}.apps.staging.steamship.com/${workspaceHandle}/${instanceHandle}`
    } else {
      return `https://${userHandle}.steamship.run/${workspaceHandle}/${instanceHandle}`
    }
  }
    return null
  }

  let {userHandle} = query


  if (isReady && baseUrl === undefined){
    let {userHandle, instanceHandle, workspaceHandle, isStaging} = query
    let baseUrl = makeBaseUrl(userHandle as string, instanceHandle as string, workspaceHandle as string, isStaging === 'true') || process.env.NEXT_PUBLIC_BASE_URL as string;
    if (baseUrl === undefined){
      getPublicBaseUrl()
    } else {
      setBaseUrl(baseUrl)
    }
  

  }
  const errorMessage = (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p>Front-end not connected. Make sure to add Lectures.</p>
                <br/>
                <p>If this issue persists, please ping us on <a href="https://steamship.com/discord" className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500">Discord</a>. We&apos;re happy to help. </p>
              </div>
            </div>
          </div>
          )
  return (
    <div className="w-full w-screen flex flex-col gap-12 ">
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
