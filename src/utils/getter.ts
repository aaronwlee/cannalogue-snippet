import path from 'path'

export function getType(componentPath: string): string {
  const splited = componentPath.split('/');
  return path.extname(splited[splited.length - 1]).toLowerCase()
}

export function getName(componentPath: string): string {
  const splited = componentPath.split('/');
  const name = splited[splited.length - 1].split(".")
  return name[0]
}

export function getFolderPath(componentPath: string): string {
  const splited = componentPath.split("/")
  const rejoinArray: any = []
  splited.forEach((e, i) => {
    if (i !== splited.length - 1) {
      rejoinArray.push(e)
    }
  })
  return rejoinArray.length !== 0 ? rejoinArray.join('/') : ".";
}