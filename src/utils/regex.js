/* eslint-disable */
export default {
  MOBILE:      /^(13|14|15|16|17|18|19)\d{9}$/,
  EMAIL:       /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  PASSWORD:    /^[a-zA-Z\d_]{8,20}$/,
  VCODE:       /^\d{4,6}$/,
  PHOTO_TYPES: /(gif|jpe?g|png|GIF|JPG|PNG)$/,
  CREDIT_NUM:  /^[0-9A-Z]{18}$/,
  CAR_NUM:     /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/,
}