import { request } from '@/utils/request';
import { Result } from '@/types/axios';
import { MapItem } from './model/commonModel';

const Api = {
  solution: '/common/solution'
}

export function getSolutionMap(): Promise<Result<MapItem[]>> {
  return request.get({
    url: Api.solution,
  })
}