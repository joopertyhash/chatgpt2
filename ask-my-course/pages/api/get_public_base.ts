import type { NextApiRequest, NextApiResponse } from 'next'
import getPackageInstance from './utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try{
    const { workspaceHandle } = req.body as any;

    const pkg = await getPackageInstance(workspaceHandle)
    const {invocationURL, handle: instanceHandle} = pkg
    return res.json({ invocationURL, instanceHandle, workspaceHandle })
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
