import { Helmet } from "react-helmet-async";

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ProCam Shop",
  description: "We sell best media products",
  keywords: "electronics, photography, audio, cameras, action",
};

export default Meta;
