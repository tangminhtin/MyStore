const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <svg width="300" height="400">
        <polygon 
          strokeWidth="5"
          stroke="#fff"
          fill="none"
          points="150,268 40,160 40,105 95,77 150,132 205,77 260,105 260,160 150,268"
        ></polygon>

        
        <text id="wait" fill="#fff" x="80" y="180">
          Chờ chút
        </text>
        <text className="tin" fill="#ff8474" x="75" y="300">
          Lâm Vĩnh Phát
        </text>
      </svg>
    </div>
  );
  // return (
  //   <div
  //     className="position-fixed w-100 h-100 text-center loading"
  //     style={{
  //       background: "#0008",
  //       color: "white",
  //       top: 0,
  //       left: 0,
  //       zIndex: 9,
  //     }}
  //   >
  //     <svg width="205" height="250" viewBox="0 0 40 50">
  //       <polygon
  //         strokeWidth="1"
  //         stroke="#fff"
  //         fill="none"
  //         points="20,1 40,40 1,40"
  //       ></polygon>
  //       <text fill="#fff" x="5" y="47">
  //         Chờ chút
  //       </text>
  //     </svg>
  //   </div>
  // );
};

export default Loading;
