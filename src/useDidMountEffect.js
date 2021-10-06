import React from "react";

export default function useDidMountEffect(func) {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    console.log("inside USEDIDMOUNTEFFECT 🧐 ", didMount.current);
    if (didMount.current) {
      func();
    } else didMount.current = true;
  }, [func]);
}
