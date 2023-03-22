// @ts-nocheck
import { getSteamshipPackage } from '@steamship/steamship-nextjs'

export default async function getPackageInstance(workspaceHandle) {

  const packageHandle = process.env.STEAMSHIP_PACKAGE_HANDLE as string;

    if (!process.env.STEAMSHIP_API_KEY) {
      return res.json({ error: "Please set the STEAMSHIP_API_KEY env variable." })
    }
    if (!packageHandle) {
      return res.json({ error: "Please set the STEAMSHIP_PACKAGE_HANDLE env variable." })
    }

    const pkg = await getSteamshipPackage({
      workspace: workspaceHandle,
      pkg: packageHandle,
      config: {index_name: `${packageHandle}-db`} as Map<string, any>
    })
    return pkg
}