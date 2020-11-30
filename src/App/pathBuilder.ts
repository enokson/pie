import os from 'os'
import path from 'path'
export const getAppPath = () => path.join(os.homedir(), 'Pie')
export const getLibraryPath = (appPath: string) => (library: string) => path.join(appPath, library)
export const getLevelPath = (level: number) => (libraryPath: string) => path.join(libraryPath, `Level ${level}`)
export const getLevel1Path = getLevelPath(1)
export const getLevel1ActivityPath = (libraryPath: string) => (activity: string) => path.join(getLevel1Path(libraryPath), activity)
export const getLevel1SubActivityPath = (sub: string) => (activityPath: string) => path.join(activityPath, sub)
export const getLevel1ImgPath = getLevel1SubActivityPath("images")
export const getLevel1StatementsPath = getLevel1SubActivityPath('statements')
export const getLevel1TestPath = getLevel1SubActivityPath('test')
