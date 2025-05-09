import myAxios from '@/plugins/myAxios.ts'
import type { TeamType } from '@/model/team'

export const addTeam = (teamInfo : TeamType) => {
  return myAxios.post('/team/add', {
    ...teamInfo
  })
}
