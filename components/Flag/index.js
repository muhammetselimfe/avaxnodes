import React from "react";

const Flag = ({ code, height, className }) => {
  const [flag, setFlag] = React.useState();

  React.useEffect(() => {
    const loadSvg = async () => {
      const preparedCode = code.toLowerCase()
      const result = await import(`svg-country-flags/svg/${preparedCode}.svg`);
      const { default: response } = result
      console.log(result)
      setFlag(response);
    };
    loadSvg();
  }, [code]);

  // return <img src={flag} height={height} className={className} />;
  return flag || null
};

export default Flag;