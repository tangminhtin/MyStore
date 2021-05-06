const Footer = () => {
  return (
    <div className="container bg-light p-3 mt-5">
      <div className="row">
        <div className="col-md-8">
          <div>
            <h3>LÂM VĨNH PHÁT</h3>
            <address>
              Địa chỉ: 390D/14B, Trần Nam Phú, phường An Khánh, quận Ninh Kiều,
              thành phố Cần Thơ <br />
              Số điện thoại: <a href="tel:+84913759572">0913759572</a>
              <br />
              Email:
              <a href="mailto:lamvinhphat7175@gmail.com">
                {" "}
                lamvinhphat7175@gmail.com
              </a>
            </address>
          </div>
        </div>
        <div className="col-md-4">
          <h4>Kết nối với chúng tôi</h4>
          <p className="text-info" style={{ fontSize: "30px" }}>
            <a
              href="https://www.facebook.com/L%C3%A2m-V%C4%A9nh-Ph%C3%A1t-100751332146603"
              title="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <i className="p-1 fab fa-facebook" aria-hidden></i>
            </a>
            <a
              href="https://www.youtube.com/channel/UCeb8P7US_3tvU9XeDIvVuig"
              title="Youtube"
              target="_blank"
              rel="noreferrer"
            >
              <i className="p-1 fab fa-youtube" aria-hidden></i>
            </a>
            <a
              href="https://zalo.me/tangminhtin"
              title="Zalo"
              target="_blank"
              rel="noreferrer"
            >
              <i className="p-1 fas fa-comment" aria-hidden></i>
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h5>© 2021 - Bản quyền của Công Ty Cổ Phần LÂM VĨNH PHÁT</h5>
          <small>
            Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và
            Đầu tư Thành phố Hồ Chí Minh cấp ngày 06/01/2010
          </small>
        </div>
        <div className="col-md-4">
          <a href="http://www.online.gov.vn/WebsiteDisplay.aspx?DocId=21399">
            <img
              src="/images/bocongthuong01.png"
              alt="Bộ Công Thương"
              height="30px"
            />
          </a>
          <a href="https://help.sendo.vn/hc/vi/articles/115001260091-Làm-thế-nào-để-trả-hàng">
            <img
              src="/images/bocongthuong02.png"
              alt="Bộ Công Thương - Nói không với hàng giả"
              height="30px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
