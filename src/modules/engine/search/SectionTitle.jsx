import PropTypes from "prop-types";
import { memo } from "react";

const SectionTitleComponent = ({text, children}) => {
  return <section id="title-wrapper">
    <div className="title">{text}</div>
    <div className="line"></div>
  </section>;
}

export const SectionTitle = memo(SectionTitleComponent);

SectionTitle.propTypes = {
  text: PropTypes.string,
};
