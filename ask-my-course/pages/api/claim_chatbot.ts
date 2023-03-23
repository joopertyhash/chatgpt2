import type { NextApiRequest, NextApiResponse } from 'next'
import getPackageInstance from './utils';

import { createClient } from '@supabase/supabase-js'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try {
    const { userHandle, workspaceHandle, instanceHandle } = req.body as any;
    
    const supabaseKey = process.env.SUPABASE_KEY as string;
    
    const supabase = createClient('https://hgzosttukbwgfyxzswmz.supabase.co',
    supabaseKey)
    
     const { error } = await supabase
    .from('claims')
    .insert({ userHandle: userHandle, workspaceHandle: workspaceHandle, instanceHandle: instanceHandle })

    console.log(error, "claim")
    return res.json({ error })
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
