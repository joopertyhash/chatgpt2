import React from "react";
import Link from '@vercel/examples-ui/link'
import { Icons } from "./Icons"


export default function Footer() {

  return (
    <footer className="py-10 w-full mt-auto border-t flex items-center justify-center bg-accents-1 z-20">
    <span className="text-primary">Built with</span>
    <a
      href="https://steamship.com"
      aria-label="Steamship.com Link"
      target="_blank"
      rel="noreferrer"
      className="text-black "
    >
      <Icons.steamship
        className="inline-block h-6 ml-2 text-primary"
      /> <span className='text-blue-800'>Steamship</span>
    </a>. Come say hi {"->"}
    <div className="flex md:order-2 ml-2 gap-2">
<Link
          href="https://github.com/steamship-core/vercel-examples/tree/main/ask-my-book-chatbot"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className="text-slate-700 dark:text-slate-400"
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <Link
          href="https://twitter.com/GetSteamship"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className="text-slate-700 dark:text-slate-400"
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
            <span className="sr-only">Twitter</span>
          </div>
        </Link>
        <Link
          href="https://steamship.com/discord"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className="text-slate-700 dark:text-slate-400"
          >
            <Icons.discord className="h-5 w-5 fill-current" />
            <span className="sr-only">Discord</span>
          </div>
        </Link>
</div>
  </footer>


    )
}

