import { Get } from '@utils/request'
import { API } from '@utils/const'

export const getBannerList = () => Get(`${ API }/common/bannerList`)