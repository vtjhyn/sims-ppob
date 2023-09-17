import { Toaster as ReactHotToaster, resolveValue } from "react-hot-toast";

const Toaster = () => {
  return (
    <ReactHotToaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    >
      {(t) => (
        <div
          style={{
            opacity: t.visible ? 1 : 0,
            background: "white",
            padding: 8,
          }}
        >
          {resolveValue(t.message, t)}
        </div>
      )}
    </ReactHotToaster>
  );
};

export default Toaster;
