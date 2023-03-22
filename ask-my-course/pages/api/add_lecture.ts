import type { NextApiRequest, NextApiResponse } from 'next'
import getPackageInstance from './utils';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try {
    const { youtube_url, workspaceHandle } = req.body as any;

    const pkg = await getPackageInstance(workspaceHandle)
    const resp = await pkg.invoke('add_lecture',{"youtube_url": youtube_url}, "POST")
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
