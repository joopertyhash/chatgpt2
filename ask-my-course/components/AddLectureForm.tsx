import { Label, TextInput, Button} from "flowbite-react";
import LoadingDots from "./LoadingDots";
import { useCookies } from 'react-cookie'
import React, { useEffect, useState } from "react";
import { PackageCoordinates, COOKIE_NAMES } from "../pages/index";

export default function AddLectureForm({ ownerEmail, setOwnerEmail, packageCoordinates, setBaseUrl, setPackageCoordinates}: any) { 
  const [lecture, setLecture] = useState('')
  const [email, setEmail] = useState(ownerEmail||'')
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies(COOKIE_NAMES)

  const setPackageCoordinatesInCookie = (packageCoordinates: PackageCoordinates) => {
    setCookie("packageCoordinates", packageCoordinates)
  }


  const getAndSetPublicBaseUrl = async (workspaceHandle: string) => {
    const response = await fetch('/api/get_public_base', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspaceHandle: workspaceHandle
        }),
      });

      if (!response.ok){
        console.log("Error when adding Lecture")
      }
      const {invocationURL, instanceHandle} = await response.json()
      const packageCoordinates = {
        userHandle: email,
        workspaceHandle: workspaceHandle,
        instanceHandle: instanceHandle
      }
      setBaseUrl(invocationURL.substring(0, invocationURL.length - 1))
      setPackageCoordinates(packageCoordinates)
      setPackageCoordinatesInCookie(packageCoordinates)
  };

  const addLecture = async (youtube_url, workspaceHandle?) => {
    const response = await fetch('/api/add_lecture', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            youtube_url: youtube_url,
            workspaceHandle: workspaceHandle || packageCoordinates.workspaceHandle
          }),
  
      });
      if (!response.ok){
        console.log("Error when adding Lecture")
      }
  
      setLoading(false)
  };



  const submitForm = async () => {
    if(!packageCoordinates) {
      const workspaceHandle = cookie["id"]
      await getAndSetPublicBaseUrl(workspaceHandle)
      addLecture(lecture, workspaceHandle)
    } else {
      addLecture(lecture)
    }
    setOwnerEmail(email)
    setCookie("ownerEmail", email)
    setLecture('')

  };

  return (
    <div>
<div className="mb-10">
    <div className="mt-6 flex flex-col gap-3 w-full">

    <input
      id="email"
      type="email"
      placeholder="your email address"
      required={true}
      hidden={ownerEmail !== undefined}
      value={email}
      className="min-w-0 flex-auto appearance-none rounded-md bg-white placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      onChange={(e) => {
        setEmail(e.target.value)
      }}
    />
      
    <input
      id="lecture"
      type="text"
      placeholder="https://www.youtube.com/watch?v=iLS_YP1uEK8"
      required={true}
      value={lecture}
      className="min-w-0 flex-auto appearance-none rounded-md bg-white placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          submitForm()
        }
      }}
      onChange={(e) => {
        setLecture(e.target.value)
      }}
    />
  {!loading && (<div><Button 
  gradientDuoTone="greenToBlue"
  type="submit" 
  onClick={(e) => {
    submitForm()
    }}>
    Add Lecture
  </Button></div>) }

  {loading && (
                  <Button
                  gradientDuoTone="greenToBlue"
                  disabled
                  >
                    <LoadingDots color="white" style="large" />
                  </Button>
                )}

  </div>
</div>
</div>


    )
}

