const valid = (name, email, password, confirm) => {
  if (!name || !email || !password || !confirm) return "Vui lòng điền đầy đủ thông tin.";
  if (!validateEmail(email)) return "Địa chỉ email không hợp lệ.";
  if (password.length < 6) return "Mật khẩu phải chứa ít nhất 6 kí tự";
  if (password !== confirm) return "Mật khẩu không khớp.";
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
