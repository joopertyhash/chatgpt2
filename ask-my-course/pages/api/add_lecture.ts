import type { NextApiRequest, NextApiResponse } from 'next'
import getPackageInstance from './utils';
import { createClient } from '@supabase/supabase-js'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try {
    const { youtubeUrl, userHandle, workspaceHandle } = req.body as any;

    const pkg = await getPackageInstance(workspaceHandle)
    const resp = await pkg.invoke('add_lecture',{"youtube_url": youtubeUrl}, "POST")

    const supabaseKey = process.env.SUPABASE_KEY as string;
    
    const supabase = createClient('https://hgzosttukbwgfyxzswmz.supabase.co',
    supabaseKey)

    const { error } = await supabase
    .from('add_lecture')
    .insert({ userHandle: userHandle, youtubeUrl: youtubeUrl, workspaceHandle:workspaceHandle })

    const response = resp.data
    return res.json({ response })
  } catch (ex) {
    const awaitedEx = (await ex) as any;

    if (awaitedEx?.response?.data?.status?.statusMessage) {
      return res.json({ error: awaitedEx?.response?.data?.status?.statusMessage })
    }

    console.log(typeof awaitedEx)
    console.log(awaitedEx)

    return res.json({ error: `There was an error adding the lecture.` })
  }
}
