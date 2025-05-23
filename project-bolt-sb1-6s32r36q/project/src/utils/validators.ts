/**
 * 验证用户名
 * @param username 用户名
 * @returns 错误信息，如果没有错误则返回空字符串
 */
export const validateUsername = (username: string): string => {
  if (!username.trim()) {
    return '用户名不能为空';
  }
  
  if (username.length < 3) {
    return '用户名长度不能少于3个字符';
  }
  
  if (username.length > 20) {
    return '用户名长度不能超过20个字符';
  }
  
  if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
    return '用户名只能包含字母、数字、下划线和中文';
  }
  
  return '';
};

/**
 * 验证密码
 * @param password 密码
 * @returns 错误信息，如果没有错误则返回空字符串
 */
export const validatePassword = (password: string): string => {
  if (!password) {
    return '密码不能为空';
  }
  
  if (password.length < 6) {
    return '密码长度不能少于6个字符';
  }
  
  if (password.length > 20) {
    return '密码长度不能超过20个字符';
  }
  
  // 密码强度验证（可选，根据需求调整）
  // const hasLetter = /[a-zA-Z]/.test(password);
  // const hasNumber = /\d/.test(password);
  // if (!hasLetter || !hasNumber) {
  //   return '密码必须包含字母和数字';
  // }
  
  return '';
};